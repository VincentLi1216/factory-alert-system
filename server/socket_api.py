import base64
import cv2
import numpy as np
import socketio
from io import BytesIO
from PIL import Image
import threading
import datetime

sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio)

@sio.event
def connect(sid, environ):
    print('connect ', sid)

def capture_and_send():
    cap = cv2.VideoCapture(0)  # 从摄像头捕获视频
    while True:
        ret, frame = cap.read()
        if ret:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame = cv2.flip(frame, 1)  # 水平翻转
            pil_img = Image.fromarray(frame)
            byte_arr = BytesIO()
            pil_img.save(byte_arr, format='JPEG')  # 将图像转换为JPEG格式
            encoded_image = base64.b64encode(byte_arr.getvalue()).decode('utf-8')  # 编码为base64
            sio.emit('video_frame', {'image': 'data:image/jpeg;base64,' + encoded_image})
        sio.sleep(0.05)  # 稍微延时以减少CPU使用率
        
def send_data_per_seconds():
    timestamp = [datetime.datetime.now().strftime('%H:%M:%S')]
    
    data = {
        'cat': [0],
        'ball': [0],
        'person': [0],
    }
    while True:
        sio.emit('historical_data_update', {'timestamp': timestamp, 'data': data})
        sio.sleep(5)
        current_time = datetime.datetime.now().strftime('%H:%M:%S')
        timestamp.append(current_time)
        timestamp = timestamp[-10:]
        data['cat'].append(np.random.randint(0, 10))
        data['cat'] = data['cat'][-10:]
        data['ball'].append(np.random.randint(0, 10))
        data['ball'] = data['ball'][-10:]
        data['person'].append(np.random.randint(0, 10))
        data['person'] = data['person'][-10:]
        
def send_current_data():
    data = {
        'cat': np.random.randint(0, 10),
        'ball': np.random.randint(0, 10),
        'person': np.random.randint(0, 10),
    }
    sio.emit('current_data_update', data)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    from eventlet import wsgi
    import eventlet

    eventlet.monkey_patch()
    
    # 创建并启动捕捉视频的线程
    thread = threading.Thread(target=capture_and_send)
    thread.start()
    
    thread2 = threading.Thread(target=send_data_per_seconds)
    thread2.start()
    
    # 启动 SocketIO 服务
    wsgi.server(eventlet.listen(('', 5000)), app)
