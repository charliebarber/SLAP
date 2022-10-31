import styled from 'styled-components';
import Question from './Question';
import Answer from './Answer';

const Container = styled.div`
    margin: 2.5rem 2.5rem 2.5rem;
    padding: 2rem;
    background: #6D8EA0;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    height: 75vh;
    display: grid;
    grid-template-rows: 60% 40%;
    align-items: stretch;
    align-content: stretch;
    gap: 1rem;
`

const MainContainer = (props) => {
    return (
        <Container>
            {props.children}
        </Container>
    )
}

export default MainContainer;