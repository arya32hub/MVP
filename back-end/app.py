from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sys
sys.path.append('..')
from PeopleSearch import PeopleSearch
from tiering import tiering
import os
from elasticsearch import Elasticsearch
from openai import OpenAI
import asyncio 

app = FastAPI()
ps = PeopleSearch()
es = Elasticsearch(
                os.getenv("ELASTICSEARCH_URL"),
                api_key=os.getenv("ELASTICSEARCH_API_KEY")
            )
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins. Change to specific domains in production.
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all HTTP headers
)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai_client = OpenAI(api_key=OPENAI_API_KEY)

class InputText(BaseModel):
    text: str

@app.post("/get_user_data")
def retrieve_user_cv(input: InputText):
    return es.get(index='candidates-dev', id=input.text).get('_source')

@app.post("/process_input")
async def process_input(input: InputText):
    results = ps.search_with_prompt(input.text)
    results = results[:50]
    return {"query": input.text, "results": results}

@app.post("/get_tier")
def get_tier(input: InputText):
    user = retrieve_user_cv(input)
    tier = tiering(user, openai_client)
    return {'tiering' : tier}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
