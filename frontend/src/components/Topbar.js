import styled from 'styled-components';

const TopbarDiv = styled.div`
    display: grid;
    grid-template-columns: 25fr 60fr 15fr;
    background-color: #182825;
`

const Logo = styled.span`
    color: white;
    padding: 1rem 2rem 1rem;
    grid-column: 1 / span 1;
    justify-self: left;
    align-self: center;
    font-family: Montserrat;
    font-size: 4rem;
    font-style: normal;
    font-weight: 900;
    letter-spacing: 0em;
    text-align: center;
`

const User = styled.span`
    color: white;
    padding: 1rem 2rem 1rem;
    grid-column: 3 / span 1;
    justify-self: right;
    align-self: center;

    font-family: Montserrat;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 600;
    text-align: center;
`

const Topbar = (props) => {
    const handleLogoClick = () => {
        props.goHome()
    }

    return (
        <TopbarDiv>
            <Logo onClick={handleLogoClick}>SLAP</Logo>
            <User>Welcome, {props.username}</User>
        </TopbarDiv>
    )
}

export default Topbar;