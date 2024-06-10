import os
import cv2
import random
import numpy as np
import tensorflow as tf 
import matplotlib.pyplot as plt

def process_image(img, cutting=True):
    _, thresh = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if len(contours) == 0:
        return False, None, None
    largest_contour = max(contours, key=cv2.contourArea)

    mask = np.zeros_like(img)
    cv2.drawContours(mask, [largest_contour], -1, (255), thickness=cv2.FILLED)

    img_final = cv2.bitwise_and(img, img, mask=mask)
    
    if cutting == False:
        return img_final

    x, y, w, h = cv2.boundingRect(largest_contour)
    

    size = max(w, h)

    x1 = x + (w - size) // 2
    y1 = y + (h - size) // 2
    x2 = x1 + size
    y2 = y1 + size

    cropped_img = img_final[y1:y2, x1:x2]
    
    # Binary image
    _, binary_img = cv2.threshold(cropped_img, 20, 255, cv2.THRESH_BINARY)
    white_area = np.sum(binary_img == 255)
    
    if white_area <= 620:
        return False, None, None
    
    # Resize image
    reshaped_img = cv2.resize(binary_img, (64, 64))
    reshaped_img = np.array(reshaped_img).reshape(-1, 64, 64, 1)
    
    target_img = img[y1:y2, x1:x2]
    
    return True, reshaped_img, target_img

label_dict = {'person': 0, 'ball': 1, 'block': 2}
label_dict = {v: k for k, v in label_dict.items()}
    
model = tf.keras.models.load_model('./utils/model_weights.keras')
print("模型載入成功")

def predict_image(img):
    state, processed_image, target_img = process_image(img, cutting=True)
    if not state:
        print("No object detected")
        return None, None
    predictions = model.predict(processed_image)
    predicted_class = np.argmax(predictions, axis=1)[0]
    
    return label_dict[predicted_class], cv2.resize(target_img, (64, 64))

    # plt.imshow(img, cmap='gray')
    # plt.axis('off')

    # plt.title(f"Predicted class: {label_dict[predicted_class]}")
    # plt.show()