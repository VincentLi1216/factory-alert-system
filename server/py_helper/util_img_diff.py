import cv2
import numpy as np

def subtract_images(image1_path, image2_path, output_path):
    # 讀取圖片
    img1 = cv2.imread(image1_path, 0)
    img2 = cv2.imread(image2_path, 0)
    
    # 檢查兩張圖片是否大小相同
    if img1.shape != img2.shape:
        raise ValueError("兩張圖片大小不相同")

    # 計算圖片相減
    result = cv2.subtract(img1, img2)

    # 將結果保存到指定路徑
    cv2.imwrite(output_path, result)
    
    return result

if __name__ == "__main__":

    # image1_path = 'imgs\depth_frame_0.png'
    # image2_path = 'imgs\depth_frame_102.png'
    # output_path = 'diff_imgs/diff_0.png'

    # result = subtract_images(image1_path, image2_path, output_path)

    # cv2.imshow('Result', result)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    def get_img_name(i, height=1):
        if i < 10:
            return f'/Users/vincent/Desktop/cat_depth/height_{height}_000{i}.png'
        elif i < 100:
            return f'/Users/vincent/Desktop/cat_depth/height_{height}_00{i}.png'
        else:
            return f'/Users/vincent/Desktop/cat_depth/height_{height}_0{i}.png'


    for j in range(1, 4):

        for i in range(1,101):
        # 測試函數
            image2_path = get_img_name(i, j)
            # print(image2_path)
            image1_path = '/Users/vincent/Desktop/cat_depth/base.png'
            output_path = f'cat_diff/cat_diff_height{j}_{i}.png'

            result = subtract_images(image1_path, image2_path, output_path)

            # # 顯示輸出圖片
            # cv2.imshow('Result', result)
            # cv2.waitKey(0)
            # cv2.destroyAllWindows()

            # cv2.imwrite(output_path, result)