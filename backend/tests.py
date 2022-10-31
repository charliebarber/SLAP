from typing import List
import util
from question import QuestionCategory
from datetime import datetime
import question_getter
import database

current_tests = {}

def no_test(test_id: str):
    return test_id not in current_tests

NO_TEST_RESPONSE = util.error("no test exists with that id")

class Test:

    def __init__(self, user: str, question_types: List[QuestionCategory], difficulties: List[int], no_questions: int) -> None:
        self.id = util.random_id()
        self.username = user
        self.categories = question_types
        self.difficulties = difficulties
        self.no_questions = no_questions

        self.start_time = datetime.now()
        self.time_taken = None

        self.questions_generated = 0
        self.questions_answered = 0
        self.questions_correct = 0

        self.questions = {}

    def get_question(self) -> dict:
        if self.questions_generated == self.no_questions:
            return util.error(f"maximum number of questions for this test ({self.no_questions}) have been requested")
        
        question = question_getter.get_question(self.categories, self.difficulties)
        self.questions_generated += 1
        self.questions[question.id] = question

        return question_getter.question_to_response_form(question)

    def submit_answer(self, question_id: str, inp: str | List[List[int]]):
        if question_id not in self.questions:
            return util.error("no question with that id exists for that test")

        question = self.questions[question_id]
        correct = question.verify(inp)

        self.questions_answered += 1
        if correct:
            self.questions_correct += 1

        del self.questions[question_id]
        question_getter.delete(question_id)

        return {"correct": "true" if correct else "false"}

    def end(self):
        self.time_taken = datetime.now() - self.start_time

def create_test(username: str, question_types: List[str], difficulties: List[int], no_questions: int) -> dict:
    if error := util.valid_categories(question_types):
        return error

    for num in difficulties:
        if num < 1 or num > 4:
            return util.error(f"invalid difficulty level '{num}' (must be in range 1–4)")

    if no_questions < 5 or no_questions > 20:
        return util.error("no_questions must be in range 5–20")

    if not question_getter.verify_compatible_qs(question_types, difficulties):
        return util.error("no questions exist with those categories and difficulties")
    
    test = Test(username, question_types, difficulties, no_questions)
    current_tests[test.id] = test

    return {"test_id": test.id}
    
def get_question(test_id: str) -> dict:
    if no_test(test_id):
        return NO_TEST_RESPONSE

    return current_tests[test_id].get_question()

def submit_answer(test_id: str, question_id: str, inp: str | List[List[int]]):
    if no_test(test_id):
        return NO_TEST_RESPONSE

    return current_tests[test_id].submit_answer(question_id, inp)

db = database.Database()

def end_test(test_id: str):
    if no_test(test_id):
        return NO_TEST_RESPONSE

    test = current_tests[test_id]
    test.end()

    response = {
        "no_questions_answered": test.questions_answered,
        "no_questions_correct": test.questions_correct,
        "no_seconds": test.time_taken.seconds
    }

    db.addToHistory(
        test.username,
        test.start_time.isoformat(),
        -1,
        test.no_questions,
        test.questions_correct,
        test.time_taken.seconds
    )

    del current_tests[test_id]
    return response

def get_test_history(username: str):
    histories = []

    for row in db.getUserHistory(username):
        histories.append({
            "date": row[1],
            "time_taken": row[5],
            "no_questions": row[3],
            "no_correct": row[4]
        })

    return {"history": histories}

