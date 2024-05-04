import CardBox from "@/components/Card/CardsBox";
import CardsInSetGrid from "@/components/Card/CardsInSetGrid";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const cardSetsData = [
  {
    _id: 1,
    name: "Англійська мова",
    category: "Англійська мова",
    cardCount: 20,
    owner: "Користувач 1",
    rating: 3.5,
  },
  {
    _id: 2,
    name: "Англійська мова",
    category: "Українська мова",
    cardCount: 15,
    owner: "Користувач 2",
    rating: 4.5,
  },
  {
    _id: 3,
    name: "Англійська мова",
    category: "Історія",
    cardCount: 15,
    owner: "Користувач 3",
    rating: 4.0,
  },
  {
    _id: 4,
    name: "Набір 4",
    category: "Англійська мова",
    cardCount: 15,
    owner: "Користувач 4",
    rating: 4.0,
  },
];

const cardsData = [
  {
    _id: 1,
    setId: 1,
    question: "Яка столиця України?",
    answer: "Київ",
  },
  {
    _id: 2,
    setId: 1,
    question: "Який найбільший океан?",
    answer: "Тихий",
  },
  {
    _id: 3,
    setId: 2,
    question: "Скільки планет у Сонячній системі?",
    answer: "8",
  },
  {
    _id: 4,
    setId: 2,
    question: "Яка найбільша планета у Сонячній системі?",
    answer: "Юпітер",
  },
  {
    _id: 5,
    setId: 3,
    question: "Хто написав 'Майстер і Маргарита'?",
    answer: "Михайло Булгаков",
  },
  {
    _id: 6,
    setId: 3,
    question: "Коли почалася Перша світова війна?",
    answer: "1914",
  },
];

export default function SetPage({ _id }) {
  const [cards, setCards] = useState([]);
  const set = cardSetsData.filter((set) => set._id == _id);
  console.log(cardsData[0].setId);
  useEffect(() => {
    if (set) {
      const filteredCards = cardsData.filter(
        (card) => card.setId === set[0]._id
      );
      setCards(filteredCards);
    }
  }, [set[0]._id]);

  return (
    <Center>
      <Header />
      <Navigation page={set[0].name} />
      <Container>
        <ButtonAndBox>
          <CardBox card={set[0]} />
          <StyledLink href={"/set/study/" + _id}>
             <Button>Перейти до вивчення</Button>

          </StyledLink>

        </ButtonAndBox>

        <CardsInSetGrid cards={cards} />
      </Container>
    </Center>
  );
}

export async function getServerSideProps(context) {
  const { _id } = context.query;

  return {
    props: {
      _id: _id.toString(),
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