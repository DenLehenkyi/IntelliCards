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
      Додати карточки
      <StyledQuestionDiv>
        <QuestionAnswerLine />
      </StyledQuestionDiv>
    </Center>
  );
}

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const StyledInput = styled.input`
  width: 500px;
  height: 50px;
  border-radius: 15px;
  background-color: #f3f3f3;
  border: none;
  margin-right: 60px;

  &::placeholder {
    color: black;
    line-height: 50px;
    padding-left: 20px;
  }
`;

const StyledQuestionDiv = styled.div`
  display: flex;
  align-items: center;
  height: 110px;
  background-color: #f3f3f3;
  width: 1000px;
`;

const QuestionAnswerLine = styled.div`
  width: 400px;
  height: 1px;
  background-color: black;
`;
