import Center from "@/components/Center";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { useState } from "react";

import styled from "styled-components";

export default function CreateSet() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  return (
    <Center>
      <Header />
      <Navigation page="Створити набір" />

      <StyledDiv>
        <StyledInput
          placeholder="Введіть назву..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></StyledInput>
        <StyledInput
          placeholder="Введіть категорію..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        ></StyledInput>
      </StyledDiv>

      <StyledText>Додати карточки</StyledText>

      <StyledQuestionDiv>
        <QuestionAnswerLine />
        <QuestionAnswerLine />
      </StyledQuestionDiv>
      <AddSet>Створити набір</AddSet>
    </Center>
  );
}
const AddSet = styled.button`
  width: 380px;
  height: 62px;
  border-radius:15px;
`;
const StyledText = styled.p``;
const StyledInput = styled.input`
  width: 800px;
  height: 50px;
  border-radius: 15px;
  background-color: #f3f3f3;
  border: none;

  &::placeholder {
    color: black;
    line-height: 50px;
    padding-left: 20px;
  }
`;

const QuestionAnswerLine = styled.input`
  width: 460px;
  height: 0.1px;
  border: none;
  background-color: black;
  border: 0.1;
  margin-bottom: 10px; /* Adjust as needed */
`;
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 1000px;
  & > ${StyledInput}:first-child {
    margin-right: 50px; /* Додайте потрібний вам відступ між елементами */
  }
`;
const StyledQuestionDiv = styled.div`
  display: flex;
  align-items: center;
  height: 110px;
  background-color: #f3f3f3;
  width: 1000px;
  & > ${QuestionAnswerLine}:first-child {
    margin-right: 90px;
  }
`;
