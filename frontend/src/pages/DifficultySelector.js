import styled from "styled-components";
import {useState} from 'react';
import Slider from "../components/Slider";
import { motion } from "framer-motion";

const DifficultyContainer = styled.div`
    margin: 2.5rem 2.5rem 2.5rem;
    padding: 2rem;
    background: #FFFFFF;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    height: 75vh;
    display: grid;
    grid-template-rows: 5% 10% auto 10% 10% 10%;
    grid-template-columns: 20% auto 20%;
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

    grid-row: 2 / span 1;
    grid-column: 2 / span 1;
`

const OptionContainer = styled.div`
    display: grid;
    grid-template-rows: 50% 50%;
    grid-template-columns: 50% 50%;
    grid-gap: 2rem;
    align-items: stretch;
    align-content: stretch;

    grid-row: 3 / span 1;
    grid-column: 2 / span 1;
`

const Option = styled.button`
    background: ${props => props.background};
    border-radius: 10px;
    border: 0.25rem solid #016FB9;
    margin: 2rem;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    text-align: center;
    color: ${props => props.color};

    &:hover {
        background: #016fb987;
    }

    &:click {
        background: red;
    }
`

const NextButton = styled(motion.button)`
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

    grid-column: 2 / span 1;
    grid-row: 5 / span 1;

    padding: 1rem 4rem;

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`

const SliderDiv = styled.div`
    grid-row: 4 / span 1;
    grid-column: 2 / span 1;
    align-self: center;
    justify-self: center;
`

const DifficultySelector = (props) => {
    const [easy, setEasy] = useState(false)
    const [medium, setMedium] = useState(false)
    const [hard, setHard] = useState(false)
    const [challenging, setChallenging] = useState(false)

    const handleNext = () => {
        let res = []
        easy && res.push(1)
        medium && res.push(2)
        hard && res.push(3)
        challenging && res.push(4)
        console.log(res)
        props.setDifficulty(res)
    }

    return (
        <DifficultyContainer>
            <Header>Difficulty</Header>
            <OptionContainer>
                <Option background={easy ? '#016FB9' : 'white'} onClick={() => setEasy(!easy)}>Easy</Option>
                <Option background={medium ? '#016FB9' : 'white'}  onClick={() => setMedium(!medium)}>Medium</Option>
                <Option background={hard ? '#016FB9' : 'white'}  onClick={() => setHard(!hard)}>Hard</Option>
                <Option background={challenging ? '#016FB9' : 'white'}  onClick={() => setChallenging(!challenging)}>Challenging</Option>
            </OptionContainer>
            <SliderDiv>
                <Slider val={props.totalQuestions} setVal={props.setTotalQuestions} />
            </SliderDiv>
            <NextButton onClick={handleNext} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Next</NextButton>
        </DifficultyContainer>
    )
}

export default DifficultySelector