from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import time
from pydantic import BaseModel

import random

import time
import os
import json

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"Hello": "World"}

class ROI(BaseModel):
    startX: float
    startY: float
    width: float
    height: float

@app.post("/roi")
async def update_roi(payload: ROI):
    print(payload)
    

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("api:app", reload=True, host="0.0.0.0", port=8282)