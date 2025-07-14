import websocket
import random
import string
import logging

logging.basicConfig(level=logging.INFO)

def send_stomp_frame(ws, command, headers=None, body=""):
    frame = command + "\n"
    if headers:
        for k, v in headers.items():
            frame += f"{k}:{v}\n"
    frame += "\n" + body + "\x00"
    ws.send(frame)

def on_message(ws, message):
    if message.startswith("CONNECTED"):
        logging.info("🟢 STOMP connected, subscribing...")
        send_stomp_frame(ws, "SUBSCRIBE", {
            "id": "sub-26",
            "destination": "/exchange/ace2.exchange.state/ace2.group.26",
            "ack": "auto"
        })
    elif message.startswith("MESSAGE"):
        body = message.split("\n\n", 1)[1].rstrip("\x00")
        logging.info("📨 Message received:\n%s", body)
    else:
        logging.debug("Other message:\n%s", message)

def on_open(ws):
    logging.info("✅ WebSocket opened")
    send_stomp_frame(ws, "CONNECT", {
        "accept-version": "1.1,1.0",
        "heart-beat": "0,0"
    })

def on_error(ws, error):
    logging.error("❌ Error: %s", error)

def on_close(ws, code, msg):
    logging.warning("🔒 WebSocket closed: %s", msg)

def random_number_string(max_num=1000):
    return str(random.randint(0, max_num - 1))

def random_string(length=8):
    chars = string.ascii_lowercase + string.digits + "_"
    return ''.join(random.choices(chars, k=length))

if __name__ == "__main__":
    server_id = random_number_string()
    session_id = random_string()
    ws_url = f"wss://svdno6.siliconmotion.com.tw/stomp/{server_id}/{session_id}/websocket"

    ws = websocket.WebSocketApp(
        ws_url,
        header=[
            "Origin: https://svdno6.siliconmotion.com.tw",
            "User-Agent: Mozilla/5.0",
            "Sec-WebSocket-Protocol: v10.stomp"
            "Cookie: ace_keyword=; JSESSIONID=68BBD48552358934A67985685386C558"
        ],
        on_open=on_open,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close
    )

    ws.run_forever(sslopt={"cert_reqs": 0})
