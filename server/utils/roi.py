def roi_image(image, roi):
    height, width = image.shape[:2]
    start_x = int(width * roi['startX']*0.01)
    start_y = int(height * roi['startY']*0.01)
    end_x = start_x + int(width * roi['width']*0.01)
    end_y = start_y + int(height * roi['height']*0.01)
    cropped_image = image[start_y:end_y, start_x:end_x]
    return cropped_image