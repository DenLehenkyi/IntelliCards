import React, { useState } from "react";
import styled from "styled-components";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CreateSet() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [cards, setCards] = useState([{ question: "", answer: "" }]);

  const handleAddCard = () => {
    setCards([...cards, { question: "", answer: "" }]);
  };

  const handleQuestionChange = (index, value) => {
    const newCards = [...cards];
    newCards[index].question = value;
    setCards(newCards);
  };

  const handleAnswerChange = (index, value) => {
    const newCards = [...cards];
    newCards[index].answer = value;
    setCards(newCards);
  };

  const handleDeleteCard = (index) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
  };

  return (
    <Center>
      <Header />
      <Navigation page="Створити набір" />

      <StyledDiv>
        <StyledInput
          placeholder="Введіть назву..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledInput
          placeholder="Введіть категорію..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </StyledDiv>

      <StyledText>Додати карточки</StyledText>

      {cards.map((card, index) => (
        <StyledQuestionDiv key={index}>
          <DeleteIcon onClick={() => handleDeleteCard(index)}>
            <FontAwesomeIcon icon={faTimes} />
          </DeleteIcon>
          <StyledCardInput
            placeholder="Питання"
            value={card.question}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
          />
          <StyledCardInput
            placeholder="Відповідь"
            value={card.answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        </StyledQuestionDiv>
      ))}
      <AddCard onClick={handleAddCard}>Додати ще одну картку</AddCard>
      <AddSet>Створити набір</AddSet>
    </Center>
  );
}
const DeleteIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  z-index: 555;
`;

const AddCard = styled.button`
  width: 1000px;
  height: 104px;
  text-align: center;
  font-weight: bold;
  background-color: #f3f3f3;
  border: none;
  margin-top: 50px;
  font-size: 16px;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 1 ease;
  &:hover {
    background-color: #75c113;
  }
`;
const AddSet = styled.button`
  width: 380px;
  height: 62px;
  border-radius: 15px;
  margin-top: 150px;
  background-color: #c5e898;
  font-weight: bold;
  margin-left: 350px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 1 ease;
  &:hover {
    background-color: #75c113;
  }
`;
const StyledText = styled.p`
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
`;
const StyledInput = styled.input`
  width: 800px;
  height: 50px;
  border-radius: 15px;
  background-color: #f3f3f3;
  border: none;
  outline: none;
  padding-left: 10px;

  &::placeholder {
    font-family: "Montserrat", sans-serif;
    line-height: 50px;
  }
`;

const StyledCardInput = styled.input`
  padding: 20px 5px;
  width: 400px;
  font-size: 16px;
  height: 36px;
  margin-top: 30px;
  border: none;
  border-bottom: 0.5px solid black;
  outline: none;
  margin-left: 20px;
  background-color: #f3f3f3;
  &::placeholder {
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    padding-bottom: 20px;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  margin-top: 20px;
  width: 1000px;
  & > ${StyledInput}:first-child {
    margin-right: 50px;
  }
`;
const StyledQuestionDiv = styled.div`
  display: flex;
  height: 110px;
  background-color: #f3f3f3;
  width: 1000px;
  border-radius: 10px;
  gap: 95px;
  margin-bottom: 30px;
  position: relative;
  font-family: "Montserrat", sans-serif;
`;
