import styled from 'styled-components';
import { useState } from 'react';
import QuestionNumber from './QuestionNumber';
import TimeBox from './TimeBox';
import Matrix from './Matrix';
import { formatTime, generateQuestionText } from '../utils/helper';
import { Help } from './help/Help';
import ReactModal from 'react-modal';
import { motion } from 'framer-motion';

const MainDiv = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    align-self: stretch;
    
    display: grid;
    grid-template-rows: auto 8fr auto;
    grid-template-columns: 2fr 6fr 2fr;
    gap: 2rem;
    padding: 1rem;
    justify-content: stretch;
    align-content: stretch;
`

const QuestionText = styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    align: center;
    align-self: center;

    color: #000000;
`

const HelpButton = styled.div`
    background: #009F49;
    border-radius: 50%;
    border: #009F49; 
    grid-column: 3 / span 1;
    grid-row: 3 / span 1;

    padding: 2rem;
    height: 1rem;
    width: 1rem;
    margin-right: 2rem;
    margin-bottom: 2rem;

    align-self: stretch;
    justify-self: right;

    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 2rem;
    display: flex;
    align-items: center;
    text-align: center;

    color: #FFFFFF;

` 

const QuestionDiv = styled.div`
    grid-column: 1 / span 3;
    align-self: center;
    justify-self: center;

    display: grid;
    grid-template-rows: 40% auto;
    place-items: center;
`

const Overlay = styled(motion.div)`
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    gap: 2rem;
    padding: 1rem;
    background: ${props => props.overlayColour};

    text-align: center;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 6rem;
    color: white;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
`

const SetContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    padding: 2rem;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 600;
    font-size: 2.5rem;
    letter-spacing: 0.25rem;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const MatrixContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 4rem;
`

const Question = (props) => {
    const [showHelpMenu, setShowHelpMenu] = useState(false)

    const openHelpMenu = () => {
      setShowHelpMenu(prev => !prev)
    } 

    if (props.overlay !== null) {
        return (
            <Overlay overlayColour={props.overlay === "Correct" ? "#009F49" : "#fc3a3a"} initial={{opacity: 0}} animate={{ opacity: 1 }} exit={{ opacity: 0.5 }}>
                <span>{props.overlay}</span>
            </Overlay>
        )
    } else {
        return (
            <MainDiv>
                <QuestionNumber number={props.number} />
                <TimeBox time={formatTime(props.time)} />
                <QuestionDiv>
                    <QuestionText>{generateQuestionText(props.type)}</QuestionText>
                    {
                        props.type.includes("matrix") &&
                        <MatrixContainer>
                            {props.display.map((matrixArr, index) => 
                                <Matrix matrix={matrixArr} key={`${props.number}-Matrix-${index}`}/>
                            )}
                        </MatrixContainer>
                    }
                    {
                        props.type.includes("set") && 
                        <SetContainer>{props.display}</SetContainer>
                    }
                </QuestionDiv>
                <HelpButton onClick={openHelpMenu}>?</HelpButton>
                <ReactModal 
                    isOpen={showHelpMenu} 
                    parentSelector={() => document.querySelector('#root')}
                    style={{
                        content: {
                            background: 'unset',
                            border: 'unset'
                        }
                    }}
                >
                    <Help showHelpMenu={showHelpMenu} setShowHelpMenu={setShowHelpMenu}/>
                </ReactModal>
            </MainDiv>
        )
    }
}

export default Question;