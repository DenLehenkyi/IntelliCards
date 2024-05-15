import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import Navigation from "@/components/Navigation";
import {cardSetsData, cardsData} from "@/components/data"
import CardSetsGrid from "@/components/Card/CardSetsGrid";
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

        </Wrapper>

        <MySetsDiv>
        {/* <CardSetsGrid allCardSets={cardSets}></CardSetsGrid> */}
        </MySetsDiv>
      
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
`
const Button = styled.button`
  
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
