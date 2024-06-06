import pyrealsense2 as rs
import numpy as np
import cv2

import os
import time

from util_json import read_json_file, write_json_file

# 創建存儲圖像的資料夾
os.makedirs("imgs", exist_ok=True)



def save_image(image, frame_number, image_type):
    # 保存圖像

    filename = f"imgs/{image_type}_frame_{frame_number}.png"
    cv2.imwrite(filename, image)
    print(f"{image_type}幀已保存：{filename}")

def save_depth_frame(depth_frame, frame_number):
    # 將深度幀轉換為NumPy數組
    depth_image = np.asanyarray(depth_frame.get_data())
    
    # 將深度數據映射到8位灰度圖像
    depth_image_8bit = cv2.convertScaleAbs(depth_image, frame_number, alpha=0.03)
    
    # 保存深度圖像
    save_image(depth_image_8bit, frame_number, "depth")

def save_confidence_frame(confidence_frame, frame_number):
    # 將信心幀轉換為NumPy數組
    confidence_image = np.asanyarray(confidence_frame.get_data())
    
    # 保存信心圖像
    save_image(confidence_image, frame_number, "confidence")

def save_infrared_frame(infrared_frame, frame_number):
    # 將紅外幀轉換為NumPy數組
    infrared_image = np.asanyarray(infrared_frame.get_data())
    
    # 保存紅外圖像
    save_image(infrared_image, frame_number, "infrared")

def save_color_frame(color_frame, frame_number):
    # 將彩色幀轉換為NumPy數組
    color_image = np.asanyarray(color_frame.get_data())
    
    # 將RGB圖像轉換為BGR格式以供保存
    color_image_bgr = cv2.cvtColor(color_image, cv2.COLOR_RGB2BGR)
    
    # 保存彩色圖像
    save_image(color_image_bgr, frame_number, "color")

def test_realsense_l515(init_number=0, total_shots=5, sleep_time=0):
    try:
        # 創建管道
        pipeline = rs.pipeline()

        # 配置流
        config = rs.config()
        config.enable_stream(rs.stream.depth, 320, 240, rs.format.z16, 30)
        config.enable_stream(rs.stream.confidence, 320, 240, rs.format.raw8, 30)
        config.enable_stream(rs.stream.infrared, 320, 240, rs.format.y8, 30)
        config.enable_stream(rs.stream.color, 640, 480, rs.format.rgb8, 30)

        # 啟動管道
        profile = pipeline.start(config)

        print("L515啟動成功，開始接收數據...")


        # 捕獲5幀數據
        for index in range(total_shots):
            frame_number = index + init_number
            frames = pipeline.wait_for_frames()

            # 獲取各種幀數據
            depth_frame = frames.get_depth_frame()
            confidence_frame = frames.first(rs.stream.confidence)
            infrared_frame = frames.first(rs.stream.infrared)
            color_frame = frames.get_color_frame()

            if not depth_frame or not confidence_frame or not infrared_frame or not color_frame:
                print("未能接收到完整幀")
                continue

            # 打印深度幀的一些信息
            width= depth_frame.get_width()
            height = depth_frame.get_height()
            print(f"深度幀大小：{width}x{height}")
            print(f"深度幀距離中心點的距離：{depth_frame.get_distance(width//2, height//2)}米")

            # 保存深度幀、信心幀、紅外幀和彩色幀
            save_depth_frame(depth_frame, frame_number)
            save_confidence_frame(confidence_frame, frame_number)
            save_infrared_frame(infrared_frame, frame_number)
            save_color_frame(color_frame, frame_number)

            time.sleep(sleep_time)

        # 停止管道
        pipeline.stop()
        print("測試完成，管道已停止。")

    except Exception as e:
        print(f"發生錯誤: {e}")

if __name__ == "__main__":

    json_data = read_json_file("config.json")
    image_number = json_data["saved_index"]
    total_shots = 3
    test_realsense_l515(init_number=image_number, total_shots=total_shots, sleep_time=0)
    json_data["saved_index"] = image_number + total_shots
    write_json_file(json_data, "config.json")
