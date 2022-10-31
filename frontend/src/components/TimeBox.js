import styled from 'styled-components';

const Box = styled.div`
    background: #182825;
    border-radius: 10px;
    color: white;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;

    grid-column: 3 / span 1;
    align-self: center;
    justify-self: right;
    text-align: center;

    padding: 0.5rem;
    min-width: 6rem;
`

const TimeBox = (props) => (
    <Box>
        <span>{props.time}</span>
    </Box>
)

export default TimeBox;