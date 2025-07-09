import websocket
import random
import string

def on_message(ws, message):
    print("收到訊息:", message)

def on_error(ws, error):
    print("錯誤:", error)

def on_close(ws, close_status_code, close_msg):
    print("連線關閉")

def on_open(ws):
    print("WebSocket 連線成功")

def random_number_string(max_num=1000):
    # 產生 1~3 位數字字串
    return str(random.randint(0, max_num - 1))

def random_string(length=8):
    chars = string.ascii_lowercase + string.digits + "_"
    return ''.join(random.choices(chars, k=length))

if __name__ == "__main__":

    server_id = random_number_string()
    session_id = random_string()
    ws_url = f"wss://svdno6.siliconmotion.com.tw/stomp/{server_id}/{session_id}/websocket"
    print(ws_url)
    
    ws = websocket.WebSocketApp(
        ws_url,
        on_open=on_open,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close,
        header=[
            "Origin: https://svdno6.siliconmotion.com.tw",
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0",
            # 你可以加上 Cookie 等 header
            "Cookie: ace_keyword=; JSESSIONID=7F32D84F7F199B0EAD944B938FFAB1FF"
        ]
    )
    ws.run_forever(sslopt={"cert_reqs": 0})  # 跳過 SSL 驗證