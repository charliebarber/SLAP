export const formatTime = (t) => {
    const mins = Math.floor(t / 60)
    const secs = (t - 60 * mins)        
    if (mins < 10 && secs < 10) {
        return`${0 + mins.toString()}:${0 + secs.toString()}` 
    }
    if (secs < 10) {
        return`${mins}:${0 + secs.toString()}`
    }
    if (mins < 10) {
        return`${0 + mins.toString()}:${secs}` 
    }
    return `${mins}:${secs}`
}

export const generateQuestionText = (type) => {
    switch (type) {
        case 'set_union':
            return "What is the union of these sets?";
        case 'set_intersection':
            return "What is the intersection of these sets?";
        case 'set_diff':
            return "What is the difference of these sets?";
        case 'set_cartesian':
            return "What is the cartesian product of these sets?";
        case 'set_power_set':
            return "What is the power set of this set?"
        case 'set_symm_diff':
            return "What is the symmetric difference of these sets?";
        case 'matrix_add':
            return "What is the sum of the matrices?";
        case 'matrix_sub':
            return "What is the first matrix subtract the second?";
        case 'matrix_mul':
            return "What is the product of the matrices?";
        case 'matrix_det':
            return "What is the determinant of the matrix?";
        case 'matrix_inv':
            return "What is the inverse of the matrix?";
        case 'matrix_transpose':
            return "What is the transpose of the matrix?";
        case 'matrix_inj_surj':
            return "Is the below matrix injective or surjective?";
        case 'matrix_eig':
            return "What are the eigenvalues of the matrix as a set?";
        case 'matrix_elim':
            return "Use Gaussian elimination to reduce the matrix to reduced row echelon form";
        default:
            return type;
    }
}