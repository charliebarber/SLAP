import React from "react";
import styled from "styled-components";

const HelpMenuTitle = styled.span`
    background: #000000;
    border-radius: 10px;
    grid-row: 1 / span 1;
    grid-column: 2 / span 1;

    font-family: Montserrat;
    font-syle: normal;
    font-weight: 600;
    font-size: 3rem;

    
    display: fixed;
    align-items: center;
    text-align: center;
    justify-content: center;
    align-self: center;

    color: #FFFFFF;

    padding: 1.25rem;
`;

const Background = styled.div`
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center; 
`;

const HelpMenuWrapper = styled.div`
    width: 90%;
    height: 90%; // changes the grid size 
    box-shadow: 0% 50% 50% rgba(0, 0, 0, 0.2);
    background: #6D8EA0;
    color: #000;
    display: grid;
    grid-template-columns: 10% 80% 10%;
    grid-template-rows: 20% 60% 20%; 
    border-radius: 10px;
    align-items: center
    padding: 10px
`;


const HelpMenuContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 2.0;
    color = #141414;
`;


const CloseHelpMenuButton = styled.div`
    background: #FF0000;
    border-radius: 50%;
    border: #009F49; 
    grid-column: 3 / span 1;
    grid-row: 1 / span 1;

    padding: 2rem;
    height: 1rem;
    width: 1rem;
    margin: 2rem;
    
    align-self: center;
    justify-self: right;

    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 2rem;
    display: flex;
    align-items: center;
    text-align: center;
    align-self: center;

    color: #FFFFFF;
`;


const Container = styled.div`
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;

    margin: 1rem 1rem 1rem;
    padding: 2rem;
    background: #FFFFFF;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    height: 56vh;
    display: grid;
    grid-template-rows: 100%;
    align-items: stretch;
    align-content: stretch;
    gap: 1rem;
`;

const textStyle = {
    fontSize: 22
}

export const HelpDifference = ({showDifferenceHelp, setShowDifferenceHelp}) => {
    return (
        <>
        {showDifferenceHelp ? (
            <Background>
                <HelpMenuWrapper showDifferenceHelp = {showDifferenceHelp}>
                    <HelpMenuTitle>Difference</HelpMenuTitle>
                    <Container>
                        <div style={{overflowY:"scroll"}}>
                            <p style={textStyle}>In set theory, the difference (denoted as ‘-’) of two sets is the set of all elements that are contained in the first set but not in the second set. 
<br></br><br></br>In set-builder notation, the difference of two sets A and B is represented as follows:
A-B = {"{"} x : x ∈ A and x ∉ B {"}"} <br></br> <br></br></p>
                            <h2>Example 1:</h2>
                            <p style={textStyle}>Find A-B.<br></br>A = {"{"} 1, 2, 3 {"}"}<br></br>B = {"{"} 2, 3, 4 {"}"}<br></br><br></br>A-B = {"{"} 1 {"}"}<br></br><br></br></p>
                            <h2>Example 2:</h2>
                            <p style={textStyle}>Find A-B.<br></br>A = {"{"} 1, 2, 3 {"}"}<br></br>B = {"{"} 1, 2, 3 {"}"}<br></br><br></br>A-B = {"{ }"} or Ø<br></br><br></br></p>
                            <h2>Example 3:</h2>
                            <p style={textStyle}>Find (A-B)-C.<br></br>A = {"{"} 1, 2, 3, 4, 5 {"}"}<br></br>B = {"{"} 1, 2, 3 {"}"}<br></br>C = {"{"} 3, 4, 5 {"}"}<br></br><br></br>(A-B)-C = {"{ }"} or Ø<br></br><br></br></p>
                            <h2>Example 4:</h2>
                            <p style={textStyle}>Find A-(B-C).<br></br>A = {"{"} 1, 2, 3, 4, 5 {"}"}<br></br>B = {"{"} 1, 2, 3 {"}"}<br></br>C = {"{"} 3, 4, 5 {"}"}<br></br><br></br>(B-C) = {"{"} 1, 2 {"}"}<br></br>A-(B-C) = {"{"} 3, 4, 5 {"}"}</p>
                        </div>
                    </Container>
                    <CloseHelpMenuButton onClick={() => setShowDifferenceHelp (prev => !prev)}>x</CloseHelpMenuButton>
                </HelpMenuWrapper>
            </Background>
        ) : null}
        </>
    )
}