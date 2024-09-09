from typing import Optional
from fastapi import FastAPI
import logging, requests
from fastapi.responses import RedirectResponse

app = FastAPI()

# Root redirects to UI
@app.get("/", include_in_schema=False)
async def docs_redirect():
    return RedirectResponse(url='/ui')

# UI
@app.get("/ui", summary="Fetch a password from the password-generator service")
async def fetch_generated_password(pass_length: Optional[int] = "20"):

    # logging:
    # logging.basicConfig(level=logging.DEBUG, format="%(message)s")

    # We could use str.format to insert the literal value of pass_length
    # base_url = "http://localhost:8080/generate?pass_length={}"
    # url = base_url.format(pass_length)

    # Call the password-generator API to generate a password.
    # Instantiate a session for connection re-use. Effectively doesn't do anything unless a client makes multiple requests in the same session which isn't implemented right now but
    # is nice to have 
    # We also wrap in the with block so the session is closed if there are unhandled exceptions: https://requests.readthedocs.io/en/latest/user/advanced/#session-objects
    with requests.Session() as session:
        # Use an f-string to insert the literal value of pass_length
        response = session.get(f"http://localhost:8080/generate?pass_length={pass_length}")
        if response.status_code == 200:
            returned_pwd = response.json()
            return returned_pwd
    
# Simple health endpoint
@app.get("/health", summary="Check health status", tags=['healthcheck'])
def health_check():
    return {"status": "OK"}