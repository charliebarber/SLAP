import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from pydantic import BaseModel
import util

import tests
import infinite

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

PORT = 12345

def invalid_id_combo(req):
   return (req.test_id and req.infinite_id) or (req.test_id is None and req.infinite_id is None)

INVALID_ID_COMBO_RESPONSE = util.error("must provide one of test_id or infinite_id")


# Requests
######################################

class StartTestReq(BaseModel):
    username: str
    question_types: List[str]
    difficulties: List[int]
    no_questions: int

@app.post("/api/start_test")
def start_test(req: StartTestReq):
    return tests.create_test(
        req.username, req.question_types, req.difficulties, req.no_questions
    )


class StartInfiniteReq(BaseModel):
    question_types: List[str]

@app.post("/api/start_infinite")
def start_infinite(req: StartInfiniteReq):
    return infinite.create_infinite(req.question_types)


class GetQuestionReq(BaseModel):
    test_id: Optional[str]
    infinite_id: Optional[str]

@app.post("/api/get_question")
def get_question(req: GetQuestionReq):
    if invalid_id_combo(req):
        return INVALID_ID_COMBO_RESPONSE

    if req.test_id:
        return tests.get_question(req.test_id)

    return infinite.get_question(req.infinite_id)


class SubmitAnswerReq(BaseModel):
    test_id: Optional[str]
    infinite_id: Optional[str]
    question_id: str
    input: str | List[List[int]]

@app.post("/api/submit_answer")
def submit_answer(req: SubmitAnswerReq):
    if invalid_id_combo(req):
        return INVALID_ID_COMBO_RESPONSE

    if req.test_id:
        return tests.submit_answer(req.test_id, req.question_id, req.input)

    return infinite.submit_answer(req.infinite_id, req.question_id, req.input)


class EndTestReq(BaseModel):
    test_id: str

@app.post("/api/end_test")
def end_test(req: EndTestReq):
    return tests.end_test(req.test_id)


class TestHistoryReq(BaseModel):
    username: str

@app.post("/api/test_history")
def test_history(req: TestHistoryReq):
    return tests.get_test_history(req.username)

######################################

if __name__ == "__main__":
    uvicorn.run(app, host="", port=PORT)


