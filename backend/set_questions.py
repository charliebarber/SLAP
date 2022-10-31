from abc import ABC

import util
from typing import Set
from question import Question, QuestionCategory

class SetQuestion(Question, ABC):

    def __init__(self, category: QuestionCategory, difficulty: int):
        super().__init__(category, difficulty)

class TwoSetQuestion(SetQuestion):

    def __init__(self, category: QuestionCategory, difficulty: int,
                 set_a: Set[int], set_b: Set[int], symbol: str, answer: Set[int]
                 ) -> None:
        super().__init__(category, difficulty)
        self.set_a = set_a
        self.set_b = set_b
        self.symbol = symbol
        self.answer = answer

    def display_info(self) -> str:
        return f"{str(self.set_a)} {self.symbol} {str(self.set_b)}"

    def verify(self, inp: str) -> bool:
        return util.is_valid_set(inp) and util.set_from_str(inp) == self.answer

class SetUnionQuestion(TwoSetQuestion):

    def __init__(self) -> None:
        a = util.random_set()
        b = util.random_set()
        super().__init__(QuestionCategory.set_union, 1, a, b, "∪", a | b)

class SetIntersectionQuestion(TwoSetQuestion):

    def __init__(self) -> None:
        a, b = util.random_overlapping_sets()
        super().__init__(QuestionCategory.set_intersection, 1, a, b, "∩", a & b)

class SetDifferenceQuestion(TwoSetQuestion):

    def __init__(self) -> None:
        a, b = util.random_overlapping_sets()
        super().__init__(QuestionCategory.set_diff, 1, a, b, "\\", a - b)

class SetSymmetricDifferenceQuestion(TwoSetQuestion):
    
    def __init__(self) -> None:
        a, b = util.random_overlapping_sets()
        super().__init__(QuestionCategory.set_symm_diff, 3, a, b, "△", a.symmetric_difference(b))

class SetPowerSetQuestion(SetQuestion):

    def __init__(self) -> None:
        super().__init__(QuestionCategory.set_power_set, 3)
        self.set = util.random_set(1, 3, 1, 15)
        self.answer = util.power_set(list(sorted(list(self.set))))

    def display_info(self) -> str:
        return u"\U0001D4AB" + "(" + str(self.set) + ")"

    def verify(self, inp: str) -> bool:
        if not util.is_valid_set(inp):
            return False
        
        inp = eval(inp.replace("{", "[").replace("}", "]"))
        inp = util.recursive_sort(inp)
        return inp == self.answer

