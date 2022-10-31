from enum import Enum
from abc import ABC, abstractmethod
import util

QuestionCategory = Enum("QuestionCategory", """"
    set_union set_intersection set_diff matrix_add matrix_sub set_cartesian
    matrix_mul matrix_transpose matrix_det matrix_inv set_power_set
    set_symm_diff matrix_inj_surj matrix_eig matrix_elim"""
)

class Question(ABC):

    def __init__(self, category: QuestionCategory, difficulty: int) -> None:
        self.id = util.random_id()
        self.category = category
        assert 1 <= difficulty <= 4
        self.difficulty = difficulty

    @abstractmethod
    def display_info(self):
        pass

    @abstractmethod
    def verify(self, inp) -> bool:
        pass


