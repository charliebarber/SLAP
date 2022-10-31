import styled from "styled-components";
import { useState } from "react";
import { formatTime } from "../utils/helper";

const MainDiv = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    align-self: stretch;
    
    display: flex;
    flex-direction: column;
    place-items: center;
    ${'' /* display: grid;
    grid-template-rows: auto 8fr auto;
    grid-template-columns: 2fr 6fr 2fr; */}
    gap: 2rem;
    padding: 1rem;
    justify-content: stretch;
    align-content: stretch;
`

const Container = styled.div`
  margin: 2.5rem 2.5rem 2.5rem;
  padding: 2rem;
  background: #6D8EA0;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  height: 75vh;
  display: grid;
  align-items: stretch;
  align-content: stretch;
  gap: 1rem;
`

const Statistic = styled.span`
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    font-size: 3rem;
    text-align: center;
`

const Header = styled.span`
    font-family: Montserrat;
    font-size: 6rem;
    font-style: normal;
    font-weight: 900;
`

const Button = styled.button`
    background: #016FB9;
    border-radius: 10px;
    border: #016FB9;

    color: #FFFFFF;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 3rem;
    display: flex;
    align-items: center;
    text-align: center;

    padding: 4rem 2rem 4rem;
`

const HistoryTable = styled.table`
    border: 1px solid;
    border-collapse: collapse;
    thead {
        background: #016FB9;
        color: white;
    }
    td, th {
        border: 1px solid;
        padding: 1rem;
    }

    text-align: center; 

    font-family: Montserrat;
    font-style: normal;
    font-weight: 400;
    font-size: 1.5rem;
`

const Stats = (props) => {
    const [showHistory, setShowHistory] = useState(false)

    const handleHistoryClick = () => {
        setShowHistory(!showHistory)
    }

    return (
        <Container>
            <MainDiv>
                <Header>{showHistory ? "History" : "Test Stats"}</Header>
                {
                    !showHistory && <>
                        <Statistic><b>Questions answered:</b>   {props.answered}</Statistic>
                        <Statistic><b>Correct answers:</b>   {props.correct}</Statistic>
                        <Statistic><b>Time taken:</b>   {props.seconds}</Statistic>
                    </>
                }
                {
                    showHistory && props.testHistory && <HistoryTable>
                        <thead>
                            <tr>
                                <th><b>Date</b></th>
                                <th><b>Time taken</b></th>
                                <th><b>Questions answered</b></th>
                                <th><b>Correct answers</b></th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.testHistory.map((row, index) =>
                                <tr key={index}>
                                    <td key={`${index}-date`}>{row.date.substring(0, 10)}</td>
                                    <td key={`${index}-time`}>{formatTime(row.time_taken)}</td>
                                    <td key={`${index}-num`}>{row.no_questions}</td>
                                    <td key={`${index}-correct`}>{row.no_correct}</td>
                                </tr>)}
                        </tbody>
                    </HistoryTable>
                }
                <Button onClick={handleHistoryClick}>{showHistory ? "View results" : "View history"}</Button>
            </MainDiv>
        </Container>
    )
}

export default Stats;