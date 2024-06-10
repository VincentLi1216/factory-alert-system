import cv2
import numpy as np

def subtract_img(img, orig_img):

    
    # convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    orig_gray = cv2.cvtColor(orig_img, cv2.COLOR_BGR2GRAY)

    # 檢查兩張圖片是否大小相同
    if gray.shape != orig_gray.shape:
        raise ValueError("兩張圖片大小不相同")

    # subtract the images
    diff = cv2.subtract(gray, orig_gray)
    return diff
    

