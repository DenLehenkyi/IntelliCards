import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { cardSetsData, cardsData } from "@/components/data";
// import Navigation from "@/components/Navigation";
import { CardSet } from "@/models/CardSet";
import axios from "axios";


import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  EffectCoverflow,
  Pagination,
  Navigation,
  EffectCards,
} from "swiper/modules";
import ReactCardFlip from "react-card-flip";
import { useAuth } from "@/Contexts/AccountContext";
import { Progress } from "@/models/Progress";

export default function StudyPage({ _id, cardSet, progresses }) {
  const [answer, setAnswer] = useState([]);
  const set = cardSet;
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  const [result, setResult] = useState("");
  const [color, setColor] = useState("");
  const {user} = useAuth();
  const [progress, setProgress] = useState();

  useEffect(() => {
    if (set) {
      setCards(cardSet.cards);
    }
  }, [set._id]);

  useEffect(() => {
    const currentProgress = progresses.find((prog) => prog.userId == user.data._id);
    setProgress(currentProgress);

  }, [progresses]);

  const [flips, setFlips] = useState({}); 

  const handleFlip = (index) => {
    setResult("");
    console.log(index);
    setFlips((prevFlips) => ({
      ...prevFlips,
      [index]: !prevFlips[index],
    }));
  };

  const handleAddProgress = async () => {
    try {
      const response = await axios.put("/api/progress", {
        progressId: progress._id, 
        passedCards: progress.passedCards + 1, 
        passingPercentage: cardSet.countCards / (progress.passedCards + 1) * 100, 
        cardSetsId: CardSet._id, 
        userId: user.data._id
      });
      console.log("Progress updated successfully", response.data);
    } catch (error) {
      console.error("Error updating progress", error);
    }
  };
  

  const handleOnButtonFlip = (index) => {
    if (
      answer.trim().toLowerCase() ===
      cards[currentCardIndex].answer.trim().toLowerCase()
    ) {
      setResult("Правильно! +5 балів");
      setColor("green");
      handleAddProgress();
    } else {
      setResult("Не правильно!");
      setColor("red");
    }

    setFlips((prevFlips) => ({
      ...prevFlips,
      [index]: !prevFlips[index],
    }));
  };

  const handleAnswerChange = (value) => {
    const newAnswer = value;
    setAnswer(newAnswer);
  };
  return (
    <Center>
      <Header />
      {/* <Navigation page={set[0].name} /> */}
      <Wrapper>
        <Swiper
          effect={"coverflow"}
          spaceBetween={30}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation, EffectCards]}
          className="swiper_container"
          onSlideChange={(swiper) => setCurrentCardIndex(swiper.realIndex)}
        >
          {cards.map((card, index) => {
            return (
              <SwiperSlide key={card._id}>
                <ReactCardFlip
                  isFlipped={flips[index]}
                  flipDirection="vertical"
                >
                  <FrontCard onClick={() => handleFlip(index)}>
                    <Card>
                      <CardCount>Карточка {index + 1}</CardCount>
                      <QuestionDiv>
                        <Question>{card.question}</Question>
                      </QuestionDiv>
                    </Card>
                  </FrontCard>
                  <BackCard onClick={() => handleFlip(index)}>
                    <Card>
                      <CardCount>Карточка {index + 1}</CardCount>
                      {result != "" && <Result color={color}>{result}</Result>}
                      <QuestionDiv>
                        <Question>Відповідь: {card.answer}</Question>
                      </QuestionDiv>
                    </Card>
                  </BackCard>
                </ReactCardFlip>
              </SwiperSlide>
            );
          })}

          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <ion-icon  name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
          </div>
        </Swiper>
        <InputAndButton>
          <Input
            placeholder="Введіть відповідь..."
            onChange={(e) => handleAnswerChange(e.target.value)}
          ></Input>
          <ShowAnswerButton onClick={() => handleOnButtonFlip(currentCardIndex)}>
            Перевернути карточку
          </ShowAnswerButton>
        </InputAndButton>
      </Wrapper>
    </Center>
  );
}

export async function getServerSideProps(context) {
  const { req, query } = context;
  const user = req.user;
  const { _id } = context.query;
  const cardSet = await CardSet.findById(_id).populate("cards");
  const progresses = await Progress.find({cardSetsId: _id });

  return {
    props: {
      _id: JSON.parse(JSON.stringify(_id)),
      cardSet: JSON.parse(JSON.stringify(cardSet)),
      progresses: JSON.parse(JSON.stringify(progresses)),
    },
  };
}

const Wrapper = styled.div`
  width: 1000px;
  height: 619px;
  background: #f3f3f3;
  margin-top: 10px;
  margin: 0 auto;
`;

const FrontCard = styled.div``;
const BackCard = styled.div``;

const Card = styled.div`
  width: 700px;
  height: 400px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 5px 20px;
`;

const CardCount = styled.p`
  position: absolute;
  color: #2d9b05;
  font-weight: 600;
  font-size: 24px;
  margin-top: 70px;
`;

const Question = styled.p`
  font-size: 24px;
  font-weight: 500;
`;
const QuestionDiv = styled.div`
  position: absolute;
  top: 39%;
`;
const MainCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const InputAndButton = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Input = styled.textarea`
  width: 400px;
  height: 90px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  outline: none;
  margin-left: 180px;
  margin-top: 25px;

  &::placeholder {
    color: #b0b0b0;
    font-family: "Montserrat", sans-serif;
  }
`;

const ShowAnswerButton = styled.button`
  width: 189px;
  height: 51px;
  background: #c5e898;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  cursor: pointer;
`;

const Result = styled.p`
  margin-top: 350px;
  font-weight: 800;
  color: ${props => props.color};
  align-self: flex-start;
  font-size: 20px;
`;
