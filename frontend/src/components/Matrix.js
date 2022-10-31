import styled from 'styled-components';
import leftbracket from '../img/leftbracket.svg';
import rightbracket from '../img/rightbracket.svg'
import {useEffect, useState} from 'react';

const MatrixGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.cols}, 4rem);
    grid-template-rows: repeat(${props => props.rows}, 4rem);
    place-items: center;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 2rem;
`

const MatrixDiv = styled.div`
    display: grid;
    grid-template-columns: 10% auto 10%;
    place-items: center;
`


const Matrix = (props) => {
    const [rows, setRows] = useState(0)
    const [cols, setCols] = useState(0)

    const getRows = () => {
        return props.matrix.length 
    }

    const getCols = () => {
        return props.matrix[0].length
    }

    useEffect(() => {
        setRows(getRows())
        setCols(getCols())
    }, props.matrix)

    return (
        <MatrixDiv>
            <img src={leftbracket} alt="left" />
            <MatrixGrid row={rows} cols={cols}>
                {
                    props.matrix.map((row) => 
                        row.map((elem) => <span>{elem}</span>)
                    )
                }
            </MatrixGrid>
            <img src={rightbracket} alt="right"/>
        </MatrixDiv>
    )
}

export default Matrix;