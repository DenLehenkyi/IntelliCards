import { AuthProvider } from "@/Contexts/AccountContext";
import { createGlobalStyle } from "styled-components";

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

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        
    
      <GlobalStyles />
      <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
