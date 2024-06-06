import json

def read_json_file(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    
    return data

def write_json_file(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)


if __name__ == "__main__":
    # 測試函數
    data = {
        "name": "John",
        "age": 30,
        "city": "New York"
    }
    file_path = "data.json"

    # 寫入JSON文件
    write_json_file(data, file_path)

    # 讀取JSON文件
    data = read_json_file(file_path)
    print(data)