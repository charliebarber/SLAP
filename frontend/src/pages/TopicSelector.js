import styled from 'styled-components';
import Checkbox from '../components/Checkbox';
import {useState} from 'react';
import {motion} from 'framer-motion';

const TopicContainer = styled.div`
    margin: 2.5rem 2.5rem 2.5rem;
    padding: 2rem;
    background: #FFFFFF;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    height: 75vh;
    display: grid;
    grid-template-rows: auto auto auto auto;
    grid-gap: 1rem;
    align-items: stretch;
    align-content: stretch;
`

const Header = styled.span`
    text-align: center;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold; 
    font-size: 3rem;
    display: flex;
    place-self: center;
`

const TopicHeader = styled.div`
    display: flex;
    align-items: center;
    background: #22AED1;
    border-radius: 10px;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    text-align: center;
    color: #FFFFFF;

    align-self: left;
    justify-self: left;
    padding: 1rem 4rem 1rem 4rem;
`

const Topic = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 10% auto;
`

const StartButton = styled(motion.button)`
    background: #009F49;
    border-radius: 10px;
    border: white;

    color: white;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 3rem;
    align-self: center;
    justify-self: center;

    padding: 1rem 4rem;

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`

const TopicSelector = (props) => {
    const [unionIntersectionAndDifference, setUnionIntersectionAndDifference] = useState(false)
    const [symmetricDiff, setSymmetricDiff] = useState(false)
    const [powerset, setPowerset] = useState(false)
    const [multiplyAddSubMatrix, setMultiplyAddSubMatrix] = useState(false)
    const [transposeInverseDeterminant, setTransposeInverseDeterminant] = useState(false)
    const [gaussianElim, setGaussianElim] = useState(false)
    const [systemOfEqns, setSystemOfEqns] = useState(false)
    const [injectiveOrSurjective, setInjectiveOrSurjective] = useState(false)
    const [eigenvaluesAndEigenvectors, setEigenvaluesAndEigenvectors] = useState(false)
    const [cartesian, setCartesian] = useState(false)

    const handleStartClick = () => {
        const selectedTopics = {
            set_union: unionIntersectionAndDifference,
            set_intersection: unionIntersectionAndDifference,
            set_diff: unionIntersectionAndDifference,
            set_cartesian: false,
            set_power_set: powerset,
            set_symm_diff: symmetricDiff,
            matrix_add: multiplyAddSubMatrix,
            matrix_sub: multiplyAddSubMatrix,
            matrix_mul: multiplyAddSubMatrix,
            matrix_det: transposeInverseDeterminant,
            matrix_inv: false,
            matrix_transpose: transposeInverseDeterminant,
            matrix_inj_surj: injectiveOrSurjective,
            matrix_eig: eigenvaluesAndEigenvectors,
            matrix_elim: gaussianElim
        }
        const types = Object.entries(selectedTopics)
        const typesReduced = types.filter((type) => {
            if (type[1]) {
                return type[0]
        }}).map((filtered) => filtered[0])
        console.log(typesReduced)
        // props.setTopics(typesReduced)
        props.handleStart(typesReduced)
    }

    return (
        <TopicContainer>
            <Header>Choose topics:</Header>

            <Topic>
                <TopicHeader>Set theory</TopicHeader>
                <br/>
                <Checkbox 
                    label="Finding the union, intersection or difference of 2 or more sets"
                    defaultChecked={unionIntersectionAndDifference}
                    handleClick={() => setUnionIntersectionAndDifference(!unionIntersectionAndDifference)}
                />
                <Checkbox 
                    label="Finding the symmetric difference of 2 or 3 sets"
                    defaultChecked={symmetricDiff}
                    handleClick={() => setSymmetricDiff(!symmetricDiff)}
                />
                <Checkbox 
                    label="Finding the powerset of given set"
                    defaultChecked={powerset}
                    handleClick={() => setPowerset(!powerset)}
                />
                <Checkbox 
                    label="Finding the cartesian product of 2 sets"
                    checked={false}
                    readOnly
                    // defaultChecked={cartesian}
                    // handleClick={() => setCartesian(false)}
                 />
            </Topic>

            <Topic>
                <TopicHeader>Linear algebra</TopicHeader>
                <br/>
                <Checkbox 
                    label="Multiplication, addition and subtraction on a matrix of up to 3x3 in size"
                    defaultChecked={multiplyAddSubMatrix}
                    handleClick={() => setMultiplyAddSubMatrix(!multiplyAddSubMatrix)}
                />
                <Checkbox 
                    label="Finding the transpose or determinant of matrices of up to 3x3 in size"
                    defaultChecked={transposeInverseDeterminant}
                    handleClick={() => setTransposeInverseDeterminant(!transposeInverseDeterminant)}
                />
                <Checkbox 
                    label="Using Gaussian elimination to reduce a matrix to reduced row echelon form"
                    defaultChecked={gaussianElim}
                    handleClick={() => setGaussianElim(!gaussianElim)}
                />
                <Checkbox 
                    label="Solving a system of linear equations using matrices"
                    defaultChecked={systemOfEqns}
                    handleClick={() => setSystemOfEqns(!systemOfEqns)}
                />
                <Checkbox 
                    label="Determining whether a matrix is injective or surjective"
                    defaultChecked={injectiveOrSurjective}
                    handleClick={() => setInjectiveOrSurjective(!injectiveOrSurjective)}
                />
                <Checkbox 
                    label="Finding the eigenvalues and corresponding eigenvectors of a matrix"
                    defaultChecked={eigenvaluesAndEigenvectors}
                    handleClick={() => setEigenvaluesAndEigenvectors(!eigenvaluesAndEigenvectors)}
                />
            </Topic>

            <StartButton onClick={handleStartClick} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Start</StartButton>
        </TopicContainer>
    )
}

export default TopicSelector;
