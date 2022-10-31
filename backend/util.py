from typing import Set, List, Tuple
from question import QuestionCategory
import random
import regex
import itertools
import functools
import numpy as np
import copy

current_ids = set()
ID_LENGTH = 20
ID_CHARS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

# API
def error(msg: str):
    return {"error": msg}

# IDs
def generate_id_internal() -> str:
    new_id = ""
    for i in range(ID_LENGTH):
        new_id += random.choice(ID_CHARS)
    return new_id

def random_id() -> str:
    new_id = generate_id_internal()
    while new_id in current_ids:
        new_id = generate_id_internal()
    return new_id

def valid_categories(question_types: List[str]):
    for i, category in enumerate(question_types):
        try:
            question_types[i] = QuestionCategory[category]
        except ValueError:
            return error(f"invalid question type {category}")

# Sets
###############################
SET_MIN_SIZE = 1
SET_MAX_SIZE = 6

SET_MIN_VAL = -20
SET_MAX_VAL = 20

def random_set(
    min_size: int = SET_MIN_SIZE, max_size: int = SET_MAX_SIZE,
    min_val: int = SET_MIN_VAL, max_val: int = SET_MAX_VAL
) -> Set[int]:
    size = random.randint(min_size, max_size)
    return set([random.randint(min_val, max_val) for _ in range(size)])

def random_overlapping_sets(
    min_size: int = SET_MIN_SIZE, max_size: int = SET_MAX_SIZE,
    min_val: int = SET_MIN_VAL, max_val: int = SET_MAX_VAL
) -> (Set[int], Set[int]):
    a = list(random_set(min_size, max_size, min_val, max_val))
    b = set()

    common = random.randint(0, int(len(a) * 0.7))
    i = 0
    for _ in a:
        b.add(random.choice(a))
        i += 1
        if i == common:
            break

    for i in range(random.randint(0, max_size - len(b))):
        b.add(random.randint(min_val, max_val))

    return set(a), b


# unused
def set_to_latex(nums: Set[int]) -> str:
    return "\\{" + "" + ",\ ".join([str(x) for x in nums]) + "\\}"

SET_REGEX = regex.compile("^( *{ *((-?[0-9]+|(?1)) *, *)*(-?([0-9]+|(?1)) *)?} *)$")

def is_valid_set(inp: str) -> bool:
    return SET_REGEX.match(inp) is not None

def set_from_str(inp: str) -> Set[int]:
    assert is_valid_set(inp)

    if inp == "{}":
        return set()
    try:
        nums_list = [int(x) for x in inp[1:-1].split(",")]
    except ValueError:
        return set()

    nums_set = set(nums_list)

    if len(nums_set) != len(nums_list):
        return None
    
    return nums_set

def power_set(nums: List[int]) -> List[List[int]]:
    ps = list(itertools.chain.from_iterable(
        itertools.combinations(nums, i) for i in range(len(nums) + 1)
    ))

    for i, elem in enumerate(ps):
        ps[i] = list(elem)

    return ps

def length_key(a, b):
    if type(a) == int:
        return a - b
    
    if len(a) < len(b):
        return -1
    if len(b) < len(a):
        return 1

    return -1 if a < b else 1
    
def recursive_sort(nums):
    if type(nums) == int:
        return nums

    if not nums:
        return []

    for i, elem in enumerate(nums):
        nums[i] = recursive_sort(elem)

    return list(sorted(nums, key = functools.cmp_to_key(length_key)))

# Matrices
###############################
MATRIX_MIN_VAL = -12
MATRIX_MAX_VAL = 12

def random_matrix(rows: int, columns: int,
                  min_val = MATRIX_MIN_VAL, max_val = MATRIX_MAX_VAL
) -> np.ndarray:
    rows = [random_row(columns, min_val, max_val) for _ in range(rows)]
    return np.matrix(rows)

def random_row(columns: int, min_val: int, max_val: int) -> List[int]:
    return [random.randint(min_val, max_val) for _ in range(columns)]

def distinct_integers(n: int, minimum: int, maximum: int) -> List[int]:
    nums = []

    while len(nums) < n:
        num = random.randint(minimum, maximum)
        if num not in nums:
            nums.append(num)

    return nums

def scramble_preserve_charpol(matrix: List[List[int]]):
    n = len(matrix)

    i = random.randint(0, n - 1)
    j = random.randint(0, n - 1)

    while j == i:
        j = random.randint(0, n - 1)

    k = random.randint(-2, 2)

    for idx in range(n):
        matrix[i][idx] += k * matrix[j][idx]

    for idx in range(n):
        matrix[idx][j] += -k * matrix[idx][i]
    
def nice_eigenvalues_matrix(size: int) -> Tuple[np.ndarray, Set[int]]:
    eigenvalues = distinct_integers(size, -8, 8)
    matrix = None

    if size == 2:
        matrix = [[eigenvalues[0], 0], [0, eigenvalues[1]]]
    if size == 3:
        matrix = [[eigenvalues[0], 0, 0], [0, eigenvalues[1], 0], [0, 0, eigenvalues[2]]]

    for i in range(4):
        scramble_preserve_charpol(matrix)

    return np.matrix(matrix), set(eigenvalues)


RREF_MAGIC = 7777

RREF_TEMPLATES = (
    [ # 2x3
        [1, 0, RREF_MAGIC],
        [0, 1, RREF_MAGIC]
    ],
    [ # 2x3 (other)
        [1, RREF_MAGIC, 0],
        [0, 0,          1]
    ],
    [ # 3x4
        [1, 0, 0, RREF_MAGIC],
        [0, 1, 0, RREF_MAGIC],
        [0, 0, 1, RREF_MAGIC]
    ],
    [ # 3x4 (other)
        [1, 0, RREF_MAGIC, 0],
        [0, 1, RREF_MAGIC, 0],
        [0, 0, 0,          1]
    ]
)

def blank_rref_mat() -> List[List[int]]:
    return copy.deepcopy(random.choice(RREF_TEMPLATES))

def distinct_rows(matrix: List[List[int]]) -> Tuple[int, int]:
    if len(matrix) == 2:
        return 0, 1

    a = random.randint(0, len(matrix) - 1)
    b = None

    while not b or b == a:
        b = random.randint(0, len(matrix) - 1)

    return a,b

def switch_row(matrix: List[List[int]]) -> None:
    a, b = distinct_rows(matrix)
    matrix[a], matrix[b] = matrix[b], matrix[a]

def add_mortar(matrix: List[List[int]]) -> None:
    a, b = distinct_rows(matrix)
    k = random.randint(-2, 2)

    for i in range(len(matrix[0])):
        matrix[b][i] += k * matrix[a][i]

def rref_matrix() -> Tuple[np.ndarray, np.ndarray]:
    original = blank_rref_mat()

    for row in original:
        for i, element in enumerate(row):
            if element == RREF_MAGIC:
                row[i] = random.randint(-9, 9)

    modified = copy.deepcopy(original)

    for _ in range(3):
        switch_row(modified)
        add_mortar(modified)

    return np.matrix(original) , np.matrix(modified)


