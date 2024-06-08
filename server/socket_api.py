import base64
import cv2
import numpy as np
import socketio
import os
import random
from io import BytesIO
import threading
import datetime
import json

from utils.predict import predict_image
from utils.roi import roi_image

sio = socketio.Server(cors_allowed_origins='*')
app = socketio.WSGIApp(sio)

prev_config = {}
timestamp = [datetime.datetime.now().strftime('%H:%M:%S')]
current_timestamp = [datetime.datetime.now().strftime('%H:%M:%S')]
last_state = None

# 更改週期（每幾秒更新一次）
PERIOD = 2

data = {
        'cat': [0],
        'ball': [0],
        'person': [0],
    }

current_data = {
        'cat': [0],
        'ball': [0],
        'person': [0],
    }

@sio.event
def connect(sid, environ):
    global data, timestamp
    timestamp = [datetime.datetime.now().strftime('%H:%M:%S')]
    data = {
            'cat': [0],
            'ball': [0],
            'person': [0],
        }
    with open('./config.json', 'w', encoding='utf-8') as f:
        json.dump({}, f, ensure_ascii=False, indent=4)
    print('connect ', sid)
    

def update_data(obj, value):
    global data, timestamp, current_data, current_timestamp
    for key in data.keys():
        if obj != key:
            data[key].append(0)
        else:
            data[key].append(value)
    current_data['cat'] = data['cat'][-10:]
    current_data['ball'] = data['ball'][-10:]
    current_data['person'] = data['person'][-10:]
    
    current_time = datetime.datetime.now().strftime('%H:%M:%S')
    timestamp.append(current_time)
    current_timestamp = timestamp[-10:]

        
def capture_and_send():
    # ----------換成深度相機的設定----------
    img_list = os.listdir('./tmp_img')
    # -----------------------------------
    global prev_config, data, timestamp, current_timestamp, current_data, last_state
    while True:
        with open('config.json', 'r') as f:
            config = json.load(f)
            if config != prev_config:
                prev_config = config
                timestamp = [datetime.datetime.now().strftime('%H:%M:%S')]
                current_timestamp = [datetime.datetime.now().strftime('%H:%M:%S')]

                data = {
                        'cat': [0],
                        'ball': [0],
                        'person': [0],
                    }

                current_data = {
                        'cat': [0],
                        'ball': [0],
                        'person': [0],
                    }
        # ----------換成讀入深度相機的影像----------
        img_path = f'./tmp_img/{random.choice(img_list)}'
        image = cv2.imread(img_path, 0)
        # ---------------------------------------
        # TODO: 進行影像處理
        # 目標：得到與原圖相減的灰階圖片（如./tmp_img的圖片）
        # 輸出：`image`
        # ---------------------------------------
        
        target_img = False
        image_type = None
        if config != {}:
            if config['startX'] == 0 and config['startY'] == 0 and config['width'] == 0 and config['height'] == 0:
                predict_img = image
            else:
                predict_img = roi_image(image, config)
            image_type, processed_image = predict_image(predict_img)
            if image_type is not None:
                update_data(image_type, 1)
                if last_state != image_type:
                    _, buffer = cv2.imencode('.jpg', processed_image)
                    byte_arr = BytesIO(buffer)
                    target_img = 'data:image/jpeg;base64,' + base64.b64encode(byte_arr.getvalue()).decode('utf-8')
                else:
                    target_img = False
                print("image_type:", image_type)
            else:
                update_data("", 0)
                target_img = False
            last_state = image_type
        _, buffer = cv2.imencode('.jpg', image)
        byte_arr = BytesIO(buffer)
        encoded_image = base64.b64encode(byte_arr.getvalue()).decode('utf-8')
        sio.emit('video_frame', {'image': 'data:image/jpeg;base64,' + encoded_image, 'imageType': image_type, 'processedImage': target_img})
        sio.sleep(PERIOD)
        
def find_current_data():
    global data, timestamp
    current_time = datetime.datetime.now()
    fixed_date = current_time.date()
    idx = 0
    if len(timestamp) > 1:
        for i in range(len(timestamp) - 2, -1, -1):
            past_time = datetime.datetime.strptime(f"{fixed_date} {timestamp[i]}", '%Y-%m-%d %H:%M:%S')
            if (current_time - past_time).total_seconds() > 600:
                idx = i + 1
                break
    if idx == len(timestamp):
        return {
            'current': {
                'cat': 0,
                'ball': 0,
                'person': 0,
                'total': 0
            },
            'pastTen': {
                'cat': 0,
                'ball': 0,
                'person': 0,
                'total': 0
            },
            "pastDay": {
                'cat': 0,
                'ball': 0,
                'person': 0,
                'total': 0
            }
        }
    return {
        'current': {
            'cat': data['cat'][-1],
            'ball': data['ball'][-1],
            'person': data['person'][-1],
            'total': data['cat'][-1] + data['ball'][-1] + data['person'][-1]
        },
        'pastTen': {
            'cat': sum(data['cat'][idx:]),
            'ball': sum(data['ball'][idx:]),
            'person': sum(data['person'][idx:]),
            'total': sum(data['cat'][idx:]) + sum(data['ball'][idx:]) + sum(data['person'][idx:]),
        },
        "pastDay": {
            'cat': sum(data['cat'][idx:]),
            'ball': sum(data['ball'][idx:]),
            'person': sum(data['person'][idx:]),
            'total': sum(data['cat'][idx:]) + sum(data['ball'][idx:]) + sum(data['person'][idx:]),
        }
    }
        
def send_data_per_seconds():
    global current_data, current_timestamp
    while True:
        sio.emit('historical_data_update', {'timestamp': current_timestamp, 'data': current_data, 'tableData': find_current_data()})
        sio.sleep(PERIOD)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)

if __name__ == '__main__':
    from eventlet import wsgi
    import eventlet

    eventlet.monkey_patch()
    
    thread = threading.Thread(target=capture_and_send)
    thread.start()
    
    thread2 = threading.Thread(target=send_data_per_seconds)
    thread2.start()
    
    wsgi.server(eventlet.listen(('', 5000)), app)
