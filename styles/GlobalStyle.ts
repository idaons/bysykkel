import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  
  :root {
    --bysykkel-color:  rgb(0, 95, 201);

  }
  html {
    font-family: 'Source Sans Pro', Arial, sans-serif;
    font-size: 1.125rem;
  }
  
  body {
    min-height: 100vh;
  }
  * {
    box-sizing: border-box;
  }
  

  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
  }

  .sr-only {
    position:absolute;
    left:-10000px;
    top:auto;
    width:1px;
    height:1px;
    overflow:hidden;
  }
`;
