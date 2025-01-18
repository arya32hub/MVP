from fastapi import FastAPI
from pydantic import BaseModel
import sys
import os  # Import os to access environment variables

sys.path.append('..')
from PeopleSearch import PeopleSearch
from tiering import tiering

app = FastAPI()
ps = PeopleSearch()

class InputText(BaseModel):
    text: str

@app.post("/process_input")
async def process_input(input: InputText):
    results = ps.search_with_prompt(input.text)  # Perform the search
    # for user in results:
    #     user["tiering"] = tiering(user)

    return {"query": input.text, "results": results}


if __name__ == "__main__":
    import uvicorn
    # Get the port from the environment variable or default to 8000
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)

