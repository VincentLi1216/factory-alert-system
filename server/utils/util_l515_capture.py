import pyrealsense2 as rs

def l515_connection_test(full_info=False):
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

if __name__ == "__main__":
    list_supported_streams()
