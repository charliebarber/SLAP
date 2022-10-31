import styled from 'styled-components';

const CheckboxContainer = styled.div`
    display: grid;
    grid-template-columns: 10% auto;
    place-items: center stretch;
    grid-gap: 1rem 1rem;

    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 1.5rem;

    color: #000000;
`

const Checkbox = (props) => {
    return (
        <CheckboxContainer>
            <input type="checkbox" checked={props.checked} onClick={props.handleClick}/>
            <label>{props.label}</label>
        </CheckboxContainer>
    )
}

export default Checkbox;