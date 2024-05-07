import Center from "@/components/Center";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import styled from "styled-components";

export default function TopUsersPage(){
    return(
        <Center>
            <Header />
            <Navigation page={"Топ користувачів"} />
            <UserDiv>

            </UserDiv>
        </Center>
    )
}

const UsersDiv = styled.div`
  
`
const UserDiv = styled.div`
   width: 743.85px;
   height: 61px;
   background: #F3F3F3;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
   display: flex;
   align-items: center;

`