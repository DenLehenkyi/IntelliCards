import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import Navigation from "@/components/Navigation";
import { CardSet } from "@/models/CardSet";
import { useAuth } from "@/Contexts/AccountContext";
import { useEffect, useState } from "react";
import { mongooseConnect } from "@/lib/mongoose";
import { Card } from "@/models/Card";
export default function MySets(allCardSets, card) {
  const { user } = useAuth();
  const [userId, setUserId] = useState(null);
  const [myCardSets, setMyCardSets] = useState([]);
  useEffect(() => {
    if (user) {
      setUserId(user.data._id);
    }
  }, [user, userId]);


  // useEffect(() => {
  //   if (userId) {
  //     const filteredCardSets = allCardSets.filter((cardSet) => cardSet.userId === userId);
  //     setMyCardSets(filteredCardSets);
  //   }
  // }, [userId, allCardSets]);
   console.log(allCardSets)
  return (
    <>
      <Header />
      <Navigation page="Мої набори" />
      <Center>
        <Wrapper>
          <Menu>
            <Button>Створені мною</Button>
            <Button>Прогрес вивчення</Button>
          </Menu>
          <MySetsDiv>
            {/* <CardSetsGrid allCardSets={cardSets} category={selectedCategory} users={users}/> */}
          </MySetsDiv>
        </Wrapper>
      </Center>
    </>
  );
}
export async function getServerSideProps(context) {
  await mongooseConnect();
  const allCardSets = await CardSet.find({});
  const allCards = await Card.find({});

  return {
    props: {
      cardSets: JSON.parse(JSON.stringify(allCardSets)),
      allCards: JSON.parse(JSON.stringify(allCards)),
    },
  };
}

const Wrapper = styled.div`
  display: flex;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  margin-top: 35px;
`;
const Button = styled.button`
  background-color: #c5e898;
  border: none;
  font-family: "Montserrat", sans-serif;
  border-radius: 20px;
  font-size: 16px;
  width: 200px;
  height: 40px;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const MySetsDiv = styled.div`
  width: 730px;
  background-color: #f3f3f3;
  border-radius: 15px;
  margin-left: 25px;
  margin-top: 30px;

  height: auto;
`;
const StyledH2 = styled.h2`
  font-family: "Montserrat";
  font-size: 16px;
  padding-left: 22px;
`;
