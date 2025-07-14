import websocket
import random
import string
import logging
import json

SUBSCRIBE_DESTINATION = "/exchange/ace2.exchange.state/ace2.group.26"

def send_stomp_frame(ws, command, headers=None, body=""):
    frame = command + "\n"
    if headers:
        for k, v in headers.items():
            frame += f"{k}:{v}\n"
    frame += "\n" + body + "\x00"
    ws.send(frame)

def on_open(ws):
    logging.info("✅ WebSocket 連線成功，發送 STOMP CONNECT")
    send_stomp_frame(ws, "CONNECT", {
        "accept-version": "1.1,1.0",
        "heart-beat": "0,0"
    })

def on_message(ws, message):
    if message.startswith("CONNECTED"):
        logging.info("🔗 STOMP 已連線，準備訂閱目標...")
        send_stomp_frame(ws, "SUBSCRIBE", {
            "id": "sub-2",
            "destination": SUBSCRIBE_DESTINATION,
            "ack": "auto"
        })
        logging.info("📡 已訂閱: %s", SUBSCRIBE_DESTINATION)

    elif message.startswith("MESSAGE"):
        try:
            parts = message.split("\n\n", 1)
            if len(parts) != 2:
                return
            body = parts[1].rstrip("\x00")
            data = json.loads(body)
            print("📨 收到訊息：")
            print(json.dumps(data, indent=2, ensure_ascii=False))
        except Exception as e:
            logging.error("❌ JSON 解碼錯誤: %s", e)

    elif message.startswith("ERROR"):
        logging.error("❗ STOMP 錯誤: %s", message)

def on_error(ws, error):
    logging.error("⚠️ WebSocket 錯誤: %s", error)

def on_close(ws, close_status_code, close_msg):
    logging.warning("🔒 WebSocket 關閉: %s", close_msg)

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
            "Cookie: ace_keyword=; JSESSIONID=68BBD48552358934A67985685386C558"
        ]
    )
    ws.run_forever(sslopt={"cert_reqs": 0})  # 跳過 SSL 驗證