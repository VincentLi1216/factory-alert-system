# Lidar Anomaly Detection System

## Installation (Back-end)

```bash
cd ./server
```

#### Create virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

#### PIP packge installation

```bash
pip install -r requirements.txt
```

#### Launch the API (requires two terminals)

- Socket IO (For streaming and realtime data updating)

```bash
python socket_api.py
```

- Fast API (For ROI)

```bash
python api.py
```

## Installation (Front-end)

```bash
cd ./client
```

#### Package Installation (yarn)

```bash
yarn install
```

#### Launch the front-end webpage

```
yarn dev
```

It is recommended to refresh the webpage before use.
