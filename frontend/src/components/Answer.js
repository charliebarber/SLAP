import styled from 'styled-components';
import {useState} from 'react';
import MatrixInput from './MatrixInput';
import { motion } from 'framer-motion';

const AnswerDiv = styled.div`
    display: flex;
    gap: 1em;
`

const SetAnswerBox = styled.input`
    flex: 80%;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 2rem;
    font-size: 3rem;
    text-align: center;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 0.75rem;
`

const MatrixAnswerBox = styled.div`
    flex: 80%;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
`

const SubmitButton = styled(motion.button)`
    flex: 20%;
    background: #016FB9;
    border-radius: 10px;
    border: white;

    color: white;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 59px;
    align-self: center;

    padding-top: 2.5rem;
    padding-bottom: 2.5rem;

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`

const Answer = (props) => {
    const [input, setInput] = useState('')
    const [answer, setAnswer] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        if (props.inputType === "string") {
            setAnswer(input)
            props.submitAnswer(input)
            return setInput('')
        }
        props.submitAnswer(answer)
        setInput('')
    }

    return (
        <AnswerDiv>
            {
                props.inputType === "string" && 
                <SetAnswerBox value={input} onChange={handleChange} />
            }
            {
                props.inputType === "matrix" && 
                <MatrixAnswerBox value="matrix" onChange={handleChange}>
                    <MatrixInput rows={props.rows} cols={props.cols} setAnswer={setAnswer} questionNum={props.questionNum}/>
                </MatrixAnswerBox>
            }
            <SubmitButton onClick={handleSubmit} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>SUBMIT</SubmitButton>
        </AnswerDiv>
    )
}

export default Answer;