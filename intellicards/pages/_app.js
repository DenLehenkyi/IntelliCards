
import { createGlobalStyle } from "styled-components";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }
`;