from fastapi import FastAPI
import uvicorn

app = FastAPI()


@app.get("/")
async def root():
    return {
        "message": "Hello World",
        "status" : "OK"
    }

if __name__ == '__main__':
    uvicorn.run(app, port=5000)