import styled from "styled-components";
import Lamp from "./svg/LampSVG";

export default function Logo(){
    return(
        <Div>
        <Lamp />
        <Name>IntelliCards</Name>
        </Div>

    );
}

const Name = styled.p`
  font-family: "Assistant", sans-serif;
  font-weight: 900;
  font-size: 24px;
`
const Div = styled.div`
   display: flex;
   align-items: center;
   margin-left: 10px;

`
