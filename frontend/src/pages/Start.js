import styled from 'styled-components';

const Container = styled.div`
    grid-row: 2 / span 1;
    grid-column: 2 / span 1;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    
    background: #6D8EA0;
`

const Logo = styled.span`
    background: #000000;
    border-radius: 10px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 900;
    font-size: 6rem;
    display: flex;
    align-items: center;
    text-align: center;

    color: #FFFFFF;

    padding: 2rem;
`

const SLAPName = styled.span`
    background: #000000;
    border-radius: 10px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    text-align: center;

    color: #FFFFFF;
    padding: 1rem;
`

const NameInput = styled.input`
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 3rem;
    color: rgba(0, 0, 0, 0.58);
    padding: 1rem;
`

const ModeSelector = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr 2fr 4fr 1fr;
    margin: 2rem;
`

const ModeButton = styled.button`
    background: #016FB9;
    border-radius: 10px;
    border: #016FB9;

    color: #FFFFFF;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 59px;
    display: flex;
    align-items: center;
    text-align: center;

    padding: 4rem 2rem 4rem;
`

const Start = () => {
    return (
        <Container>
            <Logo>SLAP</Logo>
            <SLAPName>Sets and Linear Algebra Practice</SLAPName>
            <NameInput />
            <ModeSelector>
                <br></br>
                <ModeButton>INFINITE MODE</ModeButton>
                <br></br>
                <ModeButton>TEST MODE</ModeButton>
                <br></br>
            </ModeSelector>
        </Container>
    )
}

export default Start;