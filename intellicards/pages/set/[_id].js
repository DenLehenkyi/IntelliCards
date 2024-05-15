import CardBox from "@/components/Card/CardsBox";
import CardsInSetGrid from "@/components/Card/CardsInSetGrid";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Card } from "@/models/Card";
import { CardSet } from "@/models/CardSet";
import { User } from "@/models/User";

export default function SetPage({ _id, cardSets, allCards, users}) {
  const [cards, setCards] = useState([]);
  const set = cardSets.filter((set) => set._id == _id);
  console.log(users);
  useEffect(() => {
    if (set) {
      const filteredCards = allCards.filter(
        (card) => card.setId === set._id
      );
      setCards(filteredCards);
    }
  }, [set._id]);

  console.log(set[0].name)

  

  return (
    <Center>
      <Header />
      <Navigation page={set[0].name} />
      <Container>
        <ButtonAndBox>
          <CardBox card={set[0]} users={users}/>
          <StyledLink href={"/set/study/" + _id}>
             <Button>Перейти до вивчення</Button>
          </StyledLink>
        </ButtonAndBox>
        <CardsInSetGrid cards={cards} users={users}/>
      </Container>
    </Center>
  );
}

export async function getServerSideProps(context) {
  const { _id } = context.query;
  const cardSets = await CardSet.find({});
  const allCards = await Card.find({});
  const users = await User.find({});

  return {
    props: {
      _id: _id.toString(),
      cardSets: JSON.parse(JSON.stringify(cardSets)),
      allCards: JSON.parse(JSON.stringify(allCards)),
      users: JSON.parse(JSON.stringify(users)),

    },
  };
}

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 220px;
  height: 51px;
  background: #c5e898;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  margin-top: 50px;
`;

const ButtonAndBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledLink = styled(Link)`
   text-decoration: none;
   color: inherit;
`