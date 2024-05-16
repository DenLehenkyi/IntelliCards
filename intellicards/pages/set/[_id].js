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
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "@/Contexts/AccountContext";
import axios from "axios";

export default function SetPage({ _id, cardSet, users }) {
  const {user} = useAuth();
  const [cards, setCards] = useState([]);
  const set = cardSet;
  const router = useRouter();
  useEffect(() => {
    if (set) {
      setCards(set.cards);
    }
  }, [set._id]);


  const handleStartStudy = async () => {

    try {
      const newProgress = await axios.post("/api/progress", {
        passedCards: 0,
        passingPercentage: 0,
        cardSetsId: _id,
        userId: user.data._id,
      });
    } catch (error) {
      console.error("Error adding progress", error);
    }
  };

  return (
    <Center>
      <Header />
      <Navigation page={set.name} />
      <Container>
        <ButtonAndBox>
          <CardBox card={set} users={users} />
          <StyledLink href={"/set/study/" + _id}>
            <Button onClick={() => handleStartStudy()}>Перейти до вивчення</Button>
          </StyledLink>
          <StyledLink href={"/edit/" + _id}>
            <Button>Редагувати набір</Button>
          </StyledLink>
    
            <Button onClick={handleDeleteSet}>Видалити набір</Button>
       
        </ButtonAndBox>
        <CardsInSetGrid cards={cards} users={users} />
      </Container>
    </Center>
  );
}

export async function getServerSideProps(context) {
  const { _id } = context.query;
  const cardSet = await CardSet.findById(_id).populate("cards");
  const allCards = await Card.find({});
  const users = await User.find({});

  return {
    props: {
      _id: _id.toString(),
      cardSet: JSON.parse(JSON.stringify(cardSet)),
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
  &:hover {
    background-color: #75c113;
    color: white;
  }
`;

const ButtonAndBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
