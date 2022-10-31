import React, { useState } from 'react';
import styled from "styled-components";
import { HelpUnion } from './HelpUnion.js';
import { HelpIntersection } from './HelpIntersection.js';
import { HelpDifference } from './HelpDifference.js';
import { HelpSymmetricDifference } from './HelpSymmetricDifference.js';
import { HelpPowerset } from './HelpPowerset.js';


const HelpMenuTitle = styled.span`
    background: #000000;
    border-radius: 10px;
    grid-row: 1 / span 1;
    grid-column: 2 / span 1;

    font-family: Montserrat;
    font-syle: normal;
    font-weight: 600;
    font-size: 3rem;

    
    ${'' /* display: fixed; */}
    align-items: center;
    text-align: center;
    justify-content: center;
    align-self: center;

    color: #FFFFFF;

    padding: 1.25rem;
`;

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center; 
`;

const HelpMenuWrapper = styled.div`
    ${'' /* width: 90%; */}
    height: 90%; // changes the grid size 
    box-shadow: 0% 50% 50% rgba(0, 0, 0, 0.2);
    background: #6D8EA0;
    color: #000;
    display: grid;
    grid-template-columns: 10% 80% 10%;
    grid-template-rows: 20% 60% 20%; 
    border-radius: 10px;
    padding: 10px;
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


const Option = styled.button`
    background: white;
    border-radius: 10px;
    border: 0.25rem solid #016FB9;
    margin: 2rem;

    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    text-align: center;

    &:hover {
        background: #016fb987;
    }

    &:click {
        background: red;
    }
`;

const OptionContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;

    grid-row: 2 / span 1;
    grid-column: 2 / span 1;
`;

export const Help = ({ showHelpMenu, setShowHelpMenu }) => {
    const [showUnionHelp, setShowUnionHelp] = useState(false)

    const openUnionHelp = () => {
        setShowUnionHelp(prev => !prev)
    }

    const [showIntersectionHelp, setShowIntersectionHelp] = useState(false)

    const openIntersectionHelp = () => {
        setShowIntersectionHelp(prev => !prev)
    }

    const [showDifferenceHelp, setShowDifferenceHelp] = useState(false)

    const openDifferenceHelp = () => {
        setShowDifferenceHelp(prev => !prev)
    }

    const [showSymmetricDifferenceHelp, setShowSymmetricDifferenceHelp] = useState(false)

    const openSymmetricDifferenceHelp = () => {
        setShowSymmetricDifferenceHelp(prev => !prev)
    }

    const [showPowersetHelp, setShowPowesetHelp] = useState(false)

    const openPowersetHelp = () => {
        setShowPowesetHelp(prev => !prev)
    }

    return (
        <HelpMenuWrapper showHelpMenu={showHelpMenu}>
            <HelpMenuTitle>Help Menu</HelpMenuTitle>
            <OptionContainer>
                <Option onClick={openUnionHelp}>Union</Option>
                <HelpUnion showUnionHelp={showUnionHelp} setShowUnionHelp={setShowUnionHelp} />
                <Option onClick={openIntersectionHelp}>Intersection</Option>
                <HelpIntersection showIntersectionHelp={showIntersectionHelp} setShowIntersectionHelp={setShowIntersectionHelp} />
                <Option onClick={openDifferenceHelp}>Difference</Option>
                <HelpDifference showDifferenceHelp={showDifferenceHelp} setShowDifferenceHelp={setShowDifferenceHelp} />
                <Option onClick={openSymmetricDifferenceHelp}>Symmetric Difference</Option>
                <HelpSymmetricDifference showSymmetricDifferenceHelp={showSymmetricDifferenceHelp} setShowSymmetricDifferenceHelp={setShowSymmetricDifferenceHelp} />
                <Option onClick={openPowersetHelp}>Powerset</Option>
                <HelpPowerset showPowersetHelp={showPowersetHelp} setShowPowersetHelp={setShowPowesetHelp} />
            </OptionContainer>
            <CloseHelpMenuButton onClick={() => setShowHelpMenu(prev => !prev)}>x</CloseHelpMenuButton>
        </HelpMenuWrapper>
    )
}