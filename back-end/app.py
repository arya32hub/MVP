from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fmv import get_fmv_score, get_data, clean_geographic_area
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
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai_client = OpenAI(api_key=OPENAI_API_KEY)
file = 'fmv.csv'
data = get_data(file)

tier_criteria = {
    1 : [1, 2, 3, 4],
    2 : [5, 6, 7, 8],
    3 : [12, 11, 10, 9],
    4 : [1, 2, 3, 4]
}


class InputText(BaseModel):
    text: str

class FmvInput(BaseModel):
    country: str
    position: str
    tier: str

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/get_user_data")
def retrieve_user_cv(input: InputText):
    return es.get(index='candidates-dev', id=input.text).get('_source')

@app.post("/process_input")
async def process_input(input: InputText):
    print("/process_input: params: "+input.text)
    results = ps.search_with_prompt(input.text)
    results = results[:50]
    return {"query": input.text, "results": results}

@app.post("/calculate_fmv")
def calculate_fmv(fmv: FmvInput):
    country = fmv.country
    position = fmv.position
    tier = int(fmv.tier)
    inflation = 3/100
    hour_average = 40 * 4 * 12
    bonus = 10000

    fmv = get_fmv_score(data, country, position, tier, inflation, hour_average, bonus)
    return {'fmv' : fmv}

@app.post("/get_tier")
def get_tier(input: InputText):
    user = retrieve_user_cv(input)
    score = tiering(user, openai_client)

    for t in tier_criteria:
        if int(score['total_score']) in tier_criteria[t]:
            tier = t
            break

    tier = '1'

    country = user.get('level_two_data', {}).get('location', [""])[0]
    position = user.get('level_two_data', {}).get('career_item', [{}])[0].get('career_role', "")


    fmv = calculate_fmv(FmvInput(country=country, position=position, tier=tier))['fmv']
    return {'tiering': score, 'fmv' : str(fmv)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
