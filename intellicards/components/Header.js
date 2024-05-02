import styled from "styled-components";
import Center from "./Center";
import Logo from "./Logo";
import AccountSvg from "./svg/AccountSVG";


export default function Header(){

    return (
        <Center>
            <HeaderDiv>
                <Logo />
                <AccountSvg />
            </HeaderDiv>
        </Center>
        
    );
}

const HeaderDiv = styled.div`
    max-width:100%;
    width: 1000px;
    height:62px;
    background: linear-gradient(90deg, #C2E0F5 47.5%, #67AEDF 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`




