from typing import List
import util
import random
from question import QuestionCategory
import difficulty
import question_getter

current_sessions = {}

def no_session(session_id: str):
    return session_id not in current_sessions

NO_SESSION = util.error("no infinite practice session with that id")

class Session:

    def __init__(self, question_types: List[QuestionCategory]) -> None:
        self.id = util.random_id()
        self.categories = question_types
        self.difficulty_gen = difficulty.Difficulty()
        self.possible_diffs = question_getter.get_possible_diffs(question_types)

    def get_question(self) -> dict:
        diff = self.difficulty_gen.getDifficulty()
        if diff not in self.possible_diffs:
            diff = random.choice(self.possible_diffs)

        question = question_getter.get_question_diff(diff, self.categories)
        return question_getter.question_to_response_form(question)

    def submit_answer(self, question_id: str, inp: str | List[List[int]]):
        if not question_getter.exists(question_id):
            return util.error("no question with that id exists for that test")

        question = question_getter.current_questions[question_id]
        correct = question.verify(inp)

        self.difficulty_gen.changeRow(correct)
        self.difficulty_gen.adjust()

        question_getter.delete(question_id)
        return {"correct": "true" if correct else "false"}

def create_infinite(question_types: List[str]) -> dict:
    if error := util.valid_categories(question_types):
        return error

    session = Session(question_types)
    current_sessions[session.id] = session

    return {"infinite_id": session.id}

def get_question(infinite_id: str) -> dict:
    if no_session(infinite_id):
        return NO_SESSION

    return current_sessions[infinite_id].get_question()

def submit_answer(infinite_id: str, question_id: str, inp: str | List[List[int]]):
    if no_session(infinite_id):
        return NO_SESSION

    return current_sessions[infinite_id].submit_answer(question_id, inp)

