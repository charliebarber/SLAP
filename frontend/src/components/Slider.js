import styled from "styled-components"

const Container = styled.div`
    display: flex;
    gap: 2rem;
`

const Label = styled.label`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
`

const Slider = (props) => {
    const handleChange = (e) => {
        props.setVal(e.target.value)
    }    

    return (
        <Container> 
            <Label>Questions</Label>
            <input type="range" min="5" max="20" value={props.val} class="slider" id="myRange" onChange={handleChange}></input>
            <Label>{props.val}</Label>
        </Container>
    )
}

export default Slider;