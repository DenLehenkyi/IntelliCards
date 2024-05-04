import Center from "@/components/Center"
import Header from "@/components/Header"
import styled from "styled-components"
import { useState, useEffect } from "react";
import {cardSetsData, cardsData} from "@/components/data"
import Navigation from "@/components/Navigation";

export default function StudyPage({_id}){
    console.log(_id)
    const [cards, setCards] = useState([]);
    const set = cardSetsData.filter((set) => set._id == _id);
    useEffect(() => {
      if (set) {
        const filteredCards = cardsData.filter(
          (card) => card.setId === set[0]._id
        );
        setCards(filteredCards);
      }
    }, [set[0]._id]);

    return(
        <Center>
            <Header />
            <Navigation page={set[0].name} />
            <Wrapper>
                <MainCard>
                    <Card></Card>
                </MainCard>


            </Wrapper>

        </Center>

       
    )
}

export async function getServerSideProps(context) {
    const { _id } = context.query;
  
    return {
      props: {
        _id: JSON.parse(JSON.stringify(_id)),
      },
    };
  }
const Wrapper = styled.div`
  width: 1000px;
  height: 619px;
  background: #F3F3F3;
  margin-top: 10px;

`

const Card = styled.div`
width: 700px;
height: 400px;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const MainCard = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;

`