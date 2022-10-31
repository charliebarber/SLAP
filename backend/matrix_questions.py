from abc import ABC

from numpy import ndarray

import util
from typing import List, Tuple
import numpy as np
import random
from question import Question, QuestionCategory

class MatrixQuestion(Question, ABC):

    def __init__(self, category: QuestionCategory, difficulty: int,
                 answer: np.ndarray
                 ) -> None:
        super().__init__(category, difficulty)
        self.answer = answer

    def verify(self, inp: List[List[int]]) -> bool:
        return np.array_equal(np.matrix(inp), self.answer)

class TwoMatrixQuestion(MatrixQuestion):

    def __init__(self, category: QuestionCategory, difficulty: int,
                 matrix_a: np.ndarray, matrix_b: np.ndarray, answer: np.ndarray
                 ) -> None:
        super().__init__(category, difficulty, answer)
        self.matrix_a = matrix_a
        self.matrix_b = matrix_b

    def display_info(self) -> Tuple[Tuple[int, int], List[np.ndarray]]:
        return self.answer.shape, [self.matrix_a, self.matrix_b]
    
class MatrixAddQuestion(TwoMatrixQuestion):

    def __init__(self, difficulty: int) -> None:
        assert 1 <= difficulty <= 2
        rows, columns = (2, 2) if difficulty == 1 else (3, 3)
        a = util.random_matrix(rows, columns)
        b = util.random_matrix(rows, columns)
        super().__init__(QuestionCategory.matrix_add, difficulty, a, b, a + b)

class MatrixSubQuestion(TwoMatrixQuestion):

    def __init__(self, difficulty: int) -> None:
        assert 1 <= difficulty <= 2
        rows, columns = (2, 2) if difficulty == 1 else (3, 3)
        a = util.random_matrix(rows, columns)
        b = util.random_matrix(rows, columns)
        super().__init__(QuestionCategory.matrix_add, difficulty, a, b, a - b)
    
class MatrixMultiplyQuestion(TwoMatrixQuestion):

    def __init__(self) -> None:
        a = util.random_matrix(2, 2, -5, 5)
        b = util.random_matrix(2, 2, -5, 5)
        super().__init__(QuestionCategory.matrix_mul, 2, a, b, a * b)

class OneMatrixQuestion(MatrixQuestion):

    def __init__(self, category: QuestionCategory, difficulty: int,
                 mat: np.ndarray, answer: np.ndarray
                ) -> None:
        super().__init__(category, difficulty, answer)
        self.mat = mat

    def display_info(self) -> Tuple[Tuple[int, int], List[np.ndarray]]:
        return self.answer.shape, [self.mat]

class MatrixTransposeQuestion(OneMatrixQuestion):

    def __init__(self) -> None:
        mat = util.random_matrix(random.randint(1, 3), random.randint(1, 3))
        super().__init__(QuestionCategory.matrix_transpose, 2, mat, np.matrix.transpose(mat))

class MatrixDetQuestion(Question):

    def __init__(self):
        super().__init__(QuestionCategory.matrix_det, 2)
        self.mat = util.random_matrix(2, 2)
        self.answer = int(round(np.linalg.det(self.mat)))

    def display_info(self) -> Tuple[None, List[ndarray]]:
        return None, [self.mat]
        
    def verify(self, inp: str) -> bool:
        try:
            return int(inp) == self.answer
        except ValueError:
            return False

class MatrixGaussianElimQuestion(OneMatrixQuestion):

    def __init__(self):
        ans, mat = util.rref_matrix()
        super().__init__(QuestionCategory.matrix_elim, 4, mat, ans)

class MatrixEigQuestion(Question):

    def __init__(self):
        super().__init__(QuestionCategory.matrix_eig, 4)
        size = 2 if bool(random.getrandbits(1)) else 3
        self.mat, self.answer = util.nice_eigenvalues_matrix(size)

    def display_info(self) -> Tuple[None, List[ndarray]]:
        return None, [self.mat]

    def verify(self, inp):
        return util.is_valid_set(inp) and util.set_from_str(inp) == self.answer


