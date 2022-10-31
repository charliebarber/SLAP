import { createGlobalStyle } from "styled-components";
import MontserratRegular from './fonts/Montserrat-Regular.ttf';
import MontserratBlack from './fonts/Montserrat-Regular.ttf';

const FontStyles = createGlobalStyle`
    
    @font-face {
        font-family: 'Montserrat Regular';
        src: url(${MontserratRegular}) format('ttf');
    }

    @font-face {
        font-family: 'Montserrat Black';
        src: url(${MontserratBlack}) format('ttf');
    }

`;

export default FontStyles;
