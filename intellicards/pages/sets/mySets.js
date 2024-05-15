import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import Navigation from "@/components/Navigation";
import { CardSet } from "@/models/CardSet";
import { User } from "@/models/User";
import { Card } from "@/models/Card";

export default function MySets(users, cardSets) {

  return (
    <>
      <Header/>
      <Navigation page="Мої набори" />
      <Center>
        <Wrapper>
          <Menu>
            <Button>Створені мною</Button>
            <Button>Прогрес вивчення</Button>
          </Menu>
          <MySetsDiv>
        {/* <CardSetsGrid allCardSets={cardSets} users={users}></CardSetsGrid> */}
        </MySetsDiv>



        </Wrapper>


      
      </Center>
    </>
  );
}

const Wrapper = styled.div`
   display: flex;
`


const Menu = styled.div` 
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  margin-top: 35px;
`
const Button = styled.button`
  background-color: #C5E898;
  border: none;
  font-family: 'Montserrat', sans-serif;
  border-radius: 20px;
  font-size: 16px;
  width: 200px;
  height: 40px;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  
`
const MySetsDiv = styled.div`
  margin-top: 20px;
  
  height: auto;


`;
const StyledH2 = styled.h2`
    font-family:"Montserrat";
    font-size:16px;
    padding-left:22px;
    
`;

export async function getServerSideProps(context) {
  const cardSets = await CardSet.find({});
  const allCards = await Card.find({});
  const users = await User.find({});

  return {
    props: {
      cardSets: JSON.parse(JSON.stringify(cardSets)),
      allCards: JSON.parse(JSON.stringify(allCards)),
      users: JSON.parse(JSON.stringify(users)),

    },
  };
}
