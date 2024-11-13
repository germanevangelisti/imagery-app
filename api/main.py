import yaml
import random

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from datetime import datetime, timedelta

with open("imagery_api.yml", "r") as file:
    api_spec = yaml.safe_load(file)

app = FastAPI(
    title=api_spec["info"]["title"],
    description=api_spec["info"]["description"],
    version=api_spec["info"]["version"],
)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Capture(BaseModel):
    captureId: str
    location: dict
    captureDate: datetime
    resolution: str


class Opportunity(BaseModel):
    opportunityId: str
    estimatedCaptureDate: datetime
    confidence: str


@app.get("/search", response_model=List[Capture])
async def search(lat: float, lon: float):
    mock_captures = [
        {
            "captureId": f"CAP12345-{i}",
            "location": {"lat": lat, "lon": lon},
            "captureDate": datetime.now() - timedelta(days=i * 30),
            "resolution": random.choice(["10m", "20m", "30m"]),
        }
        for i in range(1, 6)
    ]
    return mock_captures


@app.get("/archive")
async def archive(lat: float, lon: float):
    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {"type": "Point", "coordinates": [lon, lat]},
                "properties": {
                    "captureId": "",
                    "captureDate": "",
                    "resolution": "",
                },
            }
        ],
    }


@app.get("/opportunities", response_model=List[Opportunity])
async def opportunities(lat: float, lon: float):
    num_opportunities = random.randint(1, 5)

    mock_opportunities = [
        {
            "opportunityId": f"OP12345-{i}",
            "estimatedCaptureDate": datetime.now() + timedelta(days=i * 30),
            "confidence": random.choice(["High", "Medium", "Low"]),
        }
        for i in range(num_opportunities)
    ]

    return mock_opportunities
