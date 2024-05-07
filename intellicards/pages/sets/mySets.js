import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import Navigation from "@/components/Navigation";
import {cardSetsData, cardsData} from "@/components/data"
import CardSetsGrid from "@/components/Card/CardSetsGrid";
export default function MySets() {

  return (
    <>
      <Header/>
      <Navigation page="Мої набори" />
      <Center>
        <MySetsDiv>
        <CardSetsGrid allCardSets={cardSetsData}></CardSetsGrid>
        </MySetsDiv>
      
      </Center>
    </>
  );
}
const MySetsDiv = styled.div`
  margin-top: 20px;
  
  height: auto;


`;
const StyledH2 = styled.h2`
    font-family:"Montserrat";
    font-size:16px;
    padding-left:22px;
    
`;