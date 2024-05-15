import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CardSet } from "@/models/CardSet";
import axios from "axios";
import styled from "styled-components";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";

export default function EditSetPage({ _id, cardSet }) {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [cards, setCards] = useState([{ question: "", answer: "" }]);
    const [isPublic, setIsPublic] = useState(false);
  
    useEffect(() => {
      if (cardSet) {
        setName(cardSet.name);
        setCategory(cardSet.category);
        setCards(cardSet.cards);
        setIsPublic(cardSet.IsPublic);
      }
    }, [cardSet]);
  
    const handleEditSet = async () => {
      try {
        await axios.put(`/api/newCard`, {
            cardId: _id,
          name,
          category,
          cards,
          countCards: cards.length,
          IsPublic: isPublic,
        });
        // Додайте код для перенаправлення або виведення повідомлення про успіх
      } catch (error) {
        console.error("Error editing set:", error);
        // Обробте помилку, наприклад, показавши користувачеві повідомлення про помилку
      }
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
  
    return (
      <Center>
        <Header />
        <Navigation page="Редагувати набір" />
  
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
  
        <StyledText>Редагувати питання та відповіді</StyledText>
  
        {cards.map((card, index) => (
          <StyledQuestionDiv key={index}>
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
  
        <CheckBoxDiv>
          <CheckBox
            type="checkbox"
            id="isPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <label htmlFor="isPublic">Зробити публічним</label>
        </CheckBoxDiv>
  
        <AddSet onClick={handleEditSet}>Зберегти зміни</AddSet>
      </Center>
    );
  }

export async function getServerSideProps(context) {
  const { _id } = context.query;
  const cardSet = await CardSet.findById(_id).populate("cards");

  return {
    props: {
      _id: _id.toString(),
      cardSet: JSON.parse(JSON.stringify(cardSet)),
    },
  };
}

const AddSet = styled.button`
  width: 300px;
  height: 50px;
  border-radius: 15px;
  margin-top: 50px;
  background-color: #c5e898;
  font-weight: bold;
  margin-left: 350px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 1 ease;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 25px;
  &:hover {
    background-color: #75c113;
  }
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
    font-size: 15px;
  }
`;

const StyledQuestionDiv = styled.div`
  display: flex;
  justify-content: space-between; // Aligns question and answer inputs
  align-items: center; // Aligns vertically within each question div
  height: 110px;
  background-color: #f3f3f3;
  width: 1000px;
  border-radius: 10px;
  gap: 20px; // Spacing between question and answer inputs
  margin-bottom: 30px;
  position: relative;
  font-family: "Montserrat", sans-serif;
`;

const StyledCardInput = styled.input`
  padding: 20px 5px;
  width: 400px;
  font-size: 16px;
  height: 36px;
  border: none;
  border-bottom: 0.5px solid black;
  outline: none;
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

const StyledText = styled.p`
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
  margin-top: 30px;
`;

const CheckBoxDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 5px;
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
`;
