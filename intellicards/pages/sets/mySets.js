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
            <CardSetsGrid
              allCardSets={myCardSets}
              category={""}
              users={users}
            />
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
