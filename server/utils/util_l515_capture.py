# import pyrealsense2 as rs

def l515_connection_test(full_info=False):
    return
    ctx = rs.context()
    devices = ctx.query_devices()
    if not devices:
        print("未檢測到任何設備")
        return False
    
    if full_info:
        for dev in devices:
            print(f"設備：{dev.get_info(rs.camera_info.name)}")
            sensors = dev.query_sensors()
            for sensor in sensors:
                print(f"傳感器：{sensor.get_info(rs.camera_info.name)}")
                for profile in sensor.get_stream_profiles():
                    print(f"    流類型：{profile.stream_type()}")
                    print(f"    格式：{profile.format()}")
                    print(f"    分辨率：{profile.as_video_stream_profile().width()}x{profile.as_video_stream_profile().height()}")
                    print(f"    幀率：{profile.fps()}")
    return True

def capture_depth_img():
    return
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

        frames = pipeline.wait_for_frames()

        # 獲取各種幀數據
        depth_frame = frames.get_depth_frame()
        confidence_frame = frames.first(rs.stream.confidence)
        infrared_frame = frames.first(rs.stream.infrared)
        color_frame = frames.get_color_frame()
        return depth_frame, confidence_frame, infrared_frame, color_frame
    except Exception as e:
        print(e)
        return None

if __name__ == "__main__":
    list_supported_streams()
