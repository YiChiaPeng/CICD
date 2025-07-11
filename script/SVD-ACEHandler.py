import requests
import logging
import urllib3
from time import sleep
import argparse
import os
import json
from collections import defaultdict
from datetime import datetime
import websocket

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
# 設定 logging 同時輸出到 terminal 和 log 檔案
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.StreamHandler(),  # 輸出到 terminal
        logging.FileHandler("svd_ace_handler.log", encoding="utf-8")  # 輸出到檔案
    ]
)


URL_API_BASE_option = {
            "RDLAB1":"http://10.8.117.241/ACE_NO1",
            #"RDLAB2":"http://10.10.139.207/ACE_NO2/rest/v1.0/",
            "RDLAB3":"https://aceno3.siliconmotion.com.tw",
            "VCT1":"https://svdno1.siliconmotion.com.tw",
            "VCT2":"https://svdno2.siliconmotion.com.tw",
            "VCT3":"https://svdno3.siliconmotion.com.tw",
            "VCT4":"https://svdno4.siliconmotion.com.tw",
            "VCT5":"https://svdno5.siliconmotion.com.tw",
            "VCT6":"https://svdno6.siliconmotion.com.tw",
            "VCT10":"https://svdno10.siliconmotion.com.tw",
            "VCT11":"https://svdno11.siliconmotion.com.tw",
        }

URL_REPORT_SERVER = "http://ace-report.siliconmotion.com.tw:8080//dev_micky"
        
class SVDACEHandler:

    def __init__(self,system_id: str,account: str = "kent.peng", password: str = "Ff113065532",**kwargs):

        global URL_API_BASE_option
        self.session = requests.Session()
        self.system_id = system_id
        self.account = account
        self.url_api_base = URL_API_BASE_option.get(self.system_id, "https://svdno6.siliconmotion.com.tw")
        
        
        self.headers = {
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer": f"{self.url_api_base}/index.html",
            "Origin": self.url_api_base,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0",
            "sec-ch-ua": '"Microsoft Edge";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"'
        }
        self._reflash_cookies(account,password)
        # if you pass project_name it will translate to  project_id from micky report server
        self.project_id = kwargs.get('project_id', next((item['projectId'] for item in self.get_projects() if item['projectName'] == kwargs.get('project_name') and item['systemid'] == system_id), None))  # 預設專案 ID 為 26
        
        
        # #websocket 

        # self.ws_url = f"wss://{self.url_api_base}/stomp/459/uy2oozuv/websocket"
        # self.ws = websocket.WebSocketApp(
        #     self.ws_url,
        #     on_open=on_open,
        #     on_message=on_message,
        #     on_error=on_error,
        #     on_close=on_close,
        #     header=[
        #         "Origin: https://svdno6.siliconmotion.com.tw",
        #         "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0",
        #         # 你可以加上 Cookie 等 header
        #         f"Cookie: {"; ".join(["{k}={v}" for k, v in self.session.cookies.get_dict().items()])}"
        #     ]
        # )


    def _reflash_cookies(self,account,password)-> None:
        """
        follow the web SVD ACE login process and let the session object have vaild cookies
        Args:
            account (str): SSO account
            password (str): SSO password
        """

        payload = {
            "account": account,
            "password": password,
            "redirectTo": "",
            "submitted": "true"
        }

        self.headers["Content-Type"] = "application/x-www-form-urlencoded"
        

        try:

            login_response = self.session.post(
                f"{self.url_api_base}/login",
                data=payload,
                headers=self.headers,
                allow_redirects=True,
                verify=False
            )
            # print(login_response.text)
        except requests.exceptions.RequestException as e:
            logging.error(f"An error occurred during login: {e}")
            return



    def node_command(self, node_id: int, command: str) -> bool:
        '''
        order node to execute command
        Args:   
            node_id (int): node id
            command (str): shell command for example "init" , "interrupt" or any other command which could be executed on the node terminal
        Returns:
            bool: True if command executed successfully, False otherwise
        '''
    
        # do reboot
       
        if self.query_nodes_state(node_id) == "IDLE":
            payload = {
                'command': command + "\n",
            }
            try: 
                command_response = self.session.post(
                    f"{self.url_api_base}/home/nodes/{node_id}/commands",
                    json=payload,
                    headers=self.headers,
                    verify=False
                )
                print(command_response.json())
                if command_response.json().get("success") != True:
                    raise Exception(f"Failed to execute {command} on node {node_id}")
                else :
                    logging.info(f"Node {node_id} command executed successfully: {command}")

            except requests.exceptions.RequestException as e:
                logging.error(f"An error occurred while execute node command: {e}")
                return False
            except Exception as e:
                logging.error(f"An error occurred while executing command on node {node_id}: {e}")
                return False
            finally:
                while self.query_nodes_state(node_id) == "RUNNING":
                    logging.info(f"Node {node_id} is still running, waiting for it to become IDLE...")
                    sleep(1)
                if self.get_nodes_info(node_id).get("failCount") == 0 :
                    print(self.get_nodes_info(node_id))
                    logging.info(f"Node {node_id} is now IDLE, command {command} executed successfully.")
                else:
                    logging.error(f"Node {node_id} is now IDLE, but it has failed {self.get_nodes_info(node_id).get('failCount')} times, please check the node status.")
        
        elif self.query_nodes_state(node_id) == "RUNNING" and command == "interrupt":
            self.headers["Content-Type"] = "application/json"
            self.headers["Accept"] = "application/json, text/javascript, */*; q=0.01"
            logging.info(f"Node {node_id} is in RUNNING state, trying to interrupt it...")
            try: 
                # do reboot
                payload = {
                    'action': "FORCE_99", 
                    'code': ""
                }
                
                # 登入後存取首頁
                
                reboot_response = self.session.post(
                    f"{self.url_api_base}/home/nodes/{node_id}/actions",
                    json=payload,
                    headers=self.headers,
                    verify=False
                )

                sleep(20)

                # do reset controller
                payload = {
                    'RESET': "FORCE_99", 
                    'code': ""
                }
                reset_controller = self.session.post(
                    f"{self.url_api_base}/home/nodes/{node_id}/actions",
                    json=payload,
                    headers=self.headers,
                    verify=False
                )
            except requests.exceptions.RequestException as e:
                logging.error(f"An error occurred while fetching nodes: {e}")
   

    def get_nodes_info(self,node_id:int=-1) -> list:
       
        '''獲取指定專案中所有空閒的 ACE
        Args:
            project_id (int): 專案 ID'''
        
        try: 
            # 登入後存取首頁
            jqgrid_response = self.session.post(
                f"{self.url_api_base}/home/groups/{str(self.project_id)}/jqgrid.json",
                headers=self.headers,
                verify=False
            )
            nodes_info = jqgrid_response.json()['rows']
        except requests.exceptions.RequestException as e:
            logging.error(f"An error occurred while fetching nodes: {e}")
            return []
        
        finally:
            
            if node_id != -1:
                node_info = [node_info for node_info in nodes_info if str(node_info.get("id")) == str(node_id)][0]
                return node_info
            else:
                return nodes_info
    
    def query_nodes_state(self, node_id: int) -> str:
        '''獲取指定專案中所有空閒的 ACE
        Args:
            project_id (int): 專案 ID'''
        
        nodes_info = self.get_nodes_info()
        if nodes_info:
            # 篩選出指定專案的節點
            node_state = [node_info for node_info in nodes_info if str(node_info.get("id")) == str(node_id)][0]['state']
            return node_state

    def query_nodes_ids(self,state:str) -> list:
        '''
        query all nodes ids with specific state

        Args:
            state (str): IDLE RUNNING INIT
        '''
        nodes_ids = [node['id'] for node in self.get_nodes_info() if node.get('state') == state]
        return nodes_ids


    ###


    def test_parallel(self,test_list: list) -> None:
        '''執行指定專案中指定測試類別的測試
        Args:
            test_class_ids (list): 測試類別 ID 列表
        '''
        print(len(test_list))
        
        for test_item  in test_list:
            
            idle_nodes_ids = self.query_nodes_ids("IDLE")
            while not idle_nodes_ids:
                logging.info("No idle nodes found, waiting for 5 seconds...")
                sleep(5)  # 等待 5 秒後再次檢查
                idle_nodes_ids = self.query_nodes_ids("IDLE")

            self.node_command(idle_nodes_ids[0],"init\n")  # 強制重啟節點
            self.execute_task([idle_nodes_ids[0]], [test_item['test_class_ids']], test_item['stop_on_failure'], test_item['times'])

            logging.info(f"Executed task on node {idle_nodes_ids[0]} for test class {test_item['test_class_ids']} with stop_on_failure={test_item['stop_on_failure']} and times={test_item['times']}")

    def execute_task(self,node_ids:list, test_class_ids: list,stop_on_failure:bool=False,times:int=1) -> None:
        '''
        node_ids: list of node ids to execute task
        test_class_ids: list of test class ids to execute task
        stop_on_failure: if True, stop the task on failure      
        times: number of times to execute the task
        '''
        
        payload = {
            "nodeIds": ",".join(str(node_id) for node_id in node_ids),
            "recurrenceType": "1",
            "stopOnFailure":stop_on_failure,
            "testClassIds": ",".join(str(test_class_id) for test_class_id in test_class_ids),
            "times": times
        }
        self.headers["Content-Type"] = "application/json"
        self.headers["Referer"] = f"{self.url_api_base}/home/groups/{self.project_id}"
        self.headers["X-Requested-With"] = "XMLHttpRequest"
       
        try:
            response = self.session.post(
                f"{self.url_api_base}/home/tasks",
                json=payload,
                headers=self.headers,
                allow_redirects=True,
                verify=False  # <--- 加這一行
            )
        except requests.exceptions.RequestException as e:
            logging.error(f"An error occurred while executing task: {e}")
            return

    def smi_upload(self, project_name: str, ufs_firmware_file_path: str,ufs_firmware_verison:str) -> bool:
        '''上傳 bin file to corressponding SMI NAS server'''
    
        
        url = f"{URL_REPORT_SERVER}/smiupload"
        
        
        
        self.headers['Content-Type'] = "multipart/form-data"

        data = {
            'systemid': self.system_id,
            'projectname': project_name,
            'user': self.account,
            'version': ufs_firmware_verison,
            'filetype': 'firmware'
        }

        try :
            files = {
                'file': open(ufs_firmware_file_path, 'rb')
            }
            response = self.session.post(url, files=files, data=data)
        except FileNotFoundError:
            logging.error(f"File not found: {ufs_firmware_file_path}")
            return False
        except requests.exceptions.RequestException as e:
            logging.error(f"An error occurred while uploading file: {e}")
            return False
        finally:
            logging.info(response.text)


    
    def get_projects(self) -> list:
        '''獲取所有專案
        <option value = "RDLAB3"selected>RDLAB_ACE5</option>
                        <option value = "RDLAB1">RDLAB_ACE3</option>
                        <option value = "VCT1">VCT_01</option>
                        <option value = "VCT2">VCT_02</option>
                        <option value = "VCT3">VCT_03</option>
                        <option value = "VCT4">VCT_04</option>
                        <option value = "VCT5">VCT_05</option>
                        <option value = "VCT6">VCT_06</option>
                        <option value = "VCT7">VCT_07</option>
                        <option value = "VCT10">VCT_10</option>
                        <option value = "VCT11">VCT_11</option>
        '''

        
        global URL_REPORT_SERVER
        url = f"{URL_REPORT_SERVER}/smimongodb"
        params = {
            "collection": "ProjectManagementDataBase",
            #"json":str({'enable':'YES','systemid':system_id}),  # 換成你要查的 systemid
            "json":str({'enable':'YES'}),
            "field": "{'systemid':1, 'projectId':1,'projectName':1, '_id':0}"
        }

        self.headers['Content-Type'] = "application/json;charset=UTF-8"
        
        response = self.session.get(url, params=params, headers=self.headers)
        return response.json()

    

def main():
    parser = argparse.ArgumentParser(description="SVD ACE Handler CLI")
    
    parser.add_argument("-sys", "--system", required=True, help="System ID (e.g., VCT6)")

    
    project_group = parser.add_mutually_exclusive_group(required=True)
    project_group.add_argument("-pjn", "--project_name", help="Project Name (e.g., RT_ACE6600_DVT_Web_Test)")
    project_group.add_argument("-pjb", "--project_number", help="Project Number (e.g., 26)")
    
    # login related
    parser.add_argument("-c", "--config", default="./.config", help="Config file path (default: ./.config)")
    parser.add_argument("-a", "--account", help="Account name")
    parser.add_argument("-p", "--password", help="Password")
    # firmware uplaod related
    parser.add_argument("-pth", "--firmware_path", help="Firmware bin file path (e.g., ../ace.bin)")
    parser.add_argument("-v", "--version", help="Firmware version (optional)")
    
    # start testing
    parser.add_argument("-tv", "--test_level", help="Firmware version (optional)")

    # node command
    parser.add_argument("-nn", "--node_number", help="Node number (optional, for node command)")
    parser.add_argument("-cmd", "--node_command", help="Node command (e.g., init, reboot, etc.)")
    
    args = parser.parse_args()

    # 讀取 config
    config = {}
    if os.path.exists(args.config):
        with open(args.config, "r", encoding="utf-8") as f:
            config = json.load(f)

    # 優先使用命令列參數，否則用 config
    account = args.account or config.get("account", "kent.peng")
    password = args.password or config.get("password", "Ff113065532")
    system_id = args.system

    project_name = args.project_name
    project_number = args.project_number

    svd_ace_handler = SVDACEHandler(system_id=system_id, account=account, password=password,project_name=args.project_name,project_number=args.project_number)
    
    if args.firmware_path:
        firmware_version = args.version or project_name + datetime.now().strftime("%Y%m%d%H%M%S")
        svd_ace_handler.smi_upload(project_name, args.firmware_path, firmware_version)
    elif args.node_number and args.node_command:
        # 執行節點命令
        node_number = int(args.node_number)
        command = args.node_command
        svd_ace_handler.node_command(node_number, command)
    elif args.test_level:

        # test_level 決定 test_list
        svd_ace_handler.test_parallel(
            test_list = [
                {
                    'test_class_ids':8546,
                    'times':1,
                    'stop_on_failure':False,
                },
                {
                    'test_class_ids':8548,
                    'times':1,
                    'stop_on_failure':False,
                },
                {
                    'test_class_ids':8542,
                    'times':1,
                    'stop_on_failure':False,
                }
            ]
        )
if __name__ == "__main__":
    
    main()
    