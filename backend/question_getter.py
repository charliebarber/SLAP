import random
import os
from typing import List

from matrix_questions import MatrixAddQuestion, MatrixSubQuestion, MatrixMultiplyQuestion, MatrixTransposeQuestion, \
    MatrixDetQuestion, MatrixEigQuestion, MatrixGaussianElimQuestion
from question import Question, QuestionCategory
from set_questions import SetQuestion, SetUnionQuestion, SetIntersectionQuestion, SetDifferenceQuestion, \
    SetSymmetricDifferenceQuestion, SetPowerSetQuestion

cat_to_q = {
    QuestionCategory.set_union:        (SetUnionQuestion, [1], False),
    QuestionCategory.set_intersection: (SetIntersectionQuestion, [1], False),
    QuestionCategory.set_diff:         (SetDifferenceQuestion, [1], False),
    QuestionCategory.matrix_add:       (MatrixAddQuestion, [1, 2], True),
    QuestionCategory.matrix_sub:       (MatrixSubQuestion, [1, 2], True),
    QuestionCategory.matrix_mul:       (MatrixMultiplyQuestion, [2], False),
    QuestionCategory.matrix_transpose: (MatrixTransposeQuestion, [2], False),
    QuestionCategory.matrix_det:       (MatrixDetQuestion, [2], False),
    QuestionCategory.set_power_set:    (SetPowerSetQuestion, [3], False),
    QuestionCategory.set_symm_diff:    (SetSymmetricDifferenceQuestion, [3], False),
    QuestionCategory.matrix_eig:       (MatrixEigQuestion, [4], False),
    QuestionCategory.matrix_elim:      (MatrixGaussianElimQuestion, [4], False)
}

def verify_compatible_qs(categories: List[QuestionCategory], difficulties: List[int]):
    for category in categories:
        q_class, q_diffs, _ = cat_to_q[category]
        for diff in difficulties:
            if diff in q_diffs:
                return True

    # No question types with the user's selected categories and difficulties
    return False

current_questions = {}

def exists(question_id: str) -> bool:
    return question_id in current_questions

def delete(question_id: str) -> None:
    del current_questions[question_id]

def get_question(categories: List[QuestionCategory], difficulties: List[int]) -> Question:
    if TEST_RIGGED and ACTIVE:
        return TEST_RIGGED.pop()

    category = random.choice(categories)
    q_class, q_diffs, diff_constructor = cat_to_q[category]

    applicable_diffs = list(filter(lambda d: d in difficulties, q_diffs))
    if not applicable_diffs:
        return get_question(categories, difficulties)

    difficulty = random.choice(applicable_diffs)

    question = q_class(difficulty) if diff_constructor else q_class()
    current_questions[question.id] = question
    
    return question

def get_possible_diffs(categories: List[QuestionCategory]) -> List[int]:
    diffs = set()
    for category in categories:
        _, cat_diffs, _ = cat_to_q[category]
        diffs |= set(cat_diffs)

    return list(diffs)

def get_question_diff(difficulty: int, categories: List[QuestionCategory]) -> Question:
    if INFINITE_RIGGED and ACTIVE:
        return INFINITE_RIGGED.pop()

    q_class, q_diffs, diff_constructor = cat_to_q[random.choice(categories)]

    while difficulty not in q_diffs:
        q_class, q_diffs, diff_constructor = cat_to_q[random.choice(categories)]

    question = q_class(difficulty) if diff_constructor else q_class()
    current_questions[question.id] = question

    return question
    
def question_to_response_form(question) -> dict:
    response = {
        "id": question.id,
        "type": question.category.name
    }

    if isinstance(question, SetQuestion):
        response["display"] = question.display_info()
        response["input_type"] = "string"
    else:
        answer_dims, matrices = question.display_info()
        response["display"] = [matrix.tolist() for matrix in matrices]

        if isinstance(question, MatrixDetQuestion) or isinstance(question, MatrixEigQuestion):
            response["input_type"] = "string"
        else:
            response["input_type"] = "matrix"
            response["matrix_rows"] = answer_dims[0]
            response["matrix_columns"] = answer_dims[1]

    return response

INFINITE_RIGGED = []
TEST_RIGGED = []
ACTIVE = False

if os.getenv("RIGGED") == "YES":
    print("RIGGED mode is activate\n")

    for _ in range(5):
        INFINITE_RIGGED.append(
            get_question_diff(
                random.choice([1, 2, 3, 4]),
                list(cat_to_q.keys()))
        )

        TEST_RIGGED.append(
            get_question(
                list(cat_to_q.keys()),
                [1, 2, 3, 4]
            )
        )

    print("INFINITE questions")
    for q in INFINITE_RIGGED[::-1]:
        print(q.category)
        print(q.display_info())
        print()

    print("TEST questions")
    for q in TEST_RIGGED[::-1]:
        print(q.category)
        print(q.display_info())
        print()

    ACTIVE = True

