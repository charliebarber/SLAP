import styled from 'styled-components';

const Box = styled.div`
    background: #22AED1;
    border-radius: 10px;

    grid-column: 1 / span 1;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    text-align: center;

    align-self: center;
    justify-self: left;
    padding: 0.5rem 1.5rem 0.5rem;

    color: #FFFFFF;
`

const QuestionNumber = (props) => {
    return (
        <Box>
            <span>Question {props.number}.</span>
        </Box>
    )
}

export default QuestionNumber;