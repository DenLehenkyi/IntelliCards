import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import Navigation from "@/components/Navigation";

import { useAuth } from "@/Contexts/AccountContext";
import { useEffect, useState } from "react";
import { mongooseConnect } from "@/lib/mongoose";
import { Card } from "@/models/Card";
import { CardSet } from "@/models/CardSet";
import CardSetsGrid from "@/components/Card/CardSetsGrid";
import { User } from "@/models/User";

export default function MySets({ cardSets, users }) {
  const { user } = useAuth();
  const [userId, setUserId] = useState(null);
  const [myCardSets, setMyCardSets] = useState([]);
  const [showMySets, setShowMySets] = useState(true); // Доданий стан для відображення моїх наборів
  const [isMySetsClicked, setIsMySetsClicked] = useState(false); //

  useEffect(() => {
    if (user) {
      setUserId(user.data._id);
    }
  }, [user, userId]);

  useEffect(() => {
    if (userId) {
      const filteredCardSets = cardSets.filter(
        (cardSet) => cardSet.userId === userId
      );
      setMyCardSets(filteredCardSets);
    }
  }, [userId, cardSets]);

  const handleShowMySets = () => {
    setIsMySetsClicked(true); // Встановлюємо стан showMySets в true при натисканні кнопки
  };

  const handleShowLearningProgress = () => {
    setIsMySetsClicked(false); // Встановлюємо стан showMySets в false при натисканні кнопки
  };

  return (
    <>
      <Header />
      <Navigation page="Мої набори" />
      <Center>
        <Wrapper>
          <Menu>
            <Button onClick={handleShowMySets} isActive={isMySetsClicked}>
              Створені мною
            </Button>{" "}
            <Button
              onClick={handleShowLearningProgress}
              isActive={!isMySetsClicked}
            >
              Прогрес вивчення
            </Button>
          </Menu>
          <MySetsDiv>
            {isMySetsClicked && (
              <CardSetsGrid
                allCardSets={myCardSets}
                category={""}
                users={users}
              />
            )}
          </MySetsDiv>
        </Wrapper>
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();

  const cardSets = await CardSet.find({}).populate("cards");
  const users = await User.find({});

  return {
    props: {
      cardSets: JSON.parse(JSON.stringify(cardSets)),
      users: JSON.parse(JSON.stringify(users)),

      search: context.query?.search || "",
    },
  };
}

const Wrapper = styled.div`
  display: flex;
`;

const Menu = styled.div`
  display: flex;

  flex-direction: column;
  gap: 20px;
  margin-top: 55px;
`;
const Button = styled.button`
  background-color: ${({ isActive }) => (isActive ? "gray" : "#c5e898")};
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  border: none;
  font-family: "Montserrat", sans-serif;
  border-radius: 20px;
  font-size: 16px;
  width: 200px;
  height: 40px;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
  &:hover {
    background-color: ${({ isActive }) => (isActive ? "green" : "#75c113")};
    color: ${({ isActive }) => (isActive ? "white" : "black")};
  }
`;
const MySetsDiv = styled.div`
  width: 730px;

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
