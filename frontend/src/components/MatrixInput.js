import styled from 'styled-components';
import leftbracket from '../img/leftbracket.svg';
import rightbracket from '../img/rightbracket.svg'
import {useEffect, useState} from 'react';

const MatrixGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.cols}, 4rem);
    grid-template-rows: repeat(${props => props.rows}, 4rem);
    place-items: center;
    justify-items: center;
`

const Cell = styled.input`
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 2rem;
    border: none;
    width: 4rem;
    text-align: center;
    outline: none;
`

const MatrixDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    place-items: center;
    justify-items: center;
    align-items: center;
    padding: 2rem;
`


const MatrixInput = (props) => {
    const [matrix, setMatrix] = useState([])

    // useEffect(() => {
    //     console.log("matrix changed")
    //     props.setInput(matrix)
    // }, [matrix])

    useEffect(() => {
        let grid = []
        for (let i = 0; i < props.rows; i++) {
            let row = []
            for (let j = 0; j < props.cols; j++) {
                row.push("_")
            }
            grid.push(row)
        }
        console.log("new grid", grid)
        setMatrix(grid)
    }, [props.questionNum, props.rows, props.cols])

    const handleChange = (row, col, e) => {
        const newMatrix = matrix
        newMatrix[row][col] = e.target.value
        setMatrix(newMatrix)
        props.setAnswer(matrix)
    }

    // const handleClick = (row, col, e) => {
    //     const newMatrix = matrix
    //     newMatrix[row][col] = 'e'
    //     setMatrix(newMatrix)
    //     console.log(matrix)
    // }

    return (
        <MatrixDiv>
            <img src={leftbracket} alt="left" />
            <MatrixGrid rows={props.rows} cols={props.cols}>
                {
                    matrix &&
                    matrix.map((row, rowIndex) => (
                        row.map((col, colIndex) => (
                            <Cell 
                                key={`${rowIndex}-${colIndex}`} 
                                onChange={(e) => handleChange(rowIndex, colIndex, e)} 
                                value={matrix[rowIndex][colIndex]}
                                // onClick={(e) => handleClick(rowIndex, colIndex, e)}
                            />
                        ))
                    ))
                }
            </MatrixGrid>
            <img src={rightbracket} alt="right"/>
        </MatrixDiv>
    )
}

export default MatrixInput;