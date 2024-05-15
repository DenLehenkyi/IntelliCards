import styled from "styled-components";
import Rating from '@mui/material/Rating';
import OwnerSvg from "../svg/OwnerSvg";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function CardBox({card, users}) {
  const [owner, setOwner] = useState();

  useEffect(() => {
    if (users && card) {
      const foundOwner = users.find(user => user.id === card.userId);
      console.log(foundOwner)
      if (foundOwner) {
        setOwner(foundOwner);
      }
    }
  }, [card, users]);
  


  return(
    <StyledLink href={"/set/" + card._id}>
    <CardDiv>
      <NameDiv>
        <Name>{card.name}</Name>
      </NameDiv>
      <Container>
        <NumOfCardsDiv>
          <NumOfCardsP>{card.cards.length} карточок</NumOfCardsP>
        </NumOfCardsDiv>
        <Rating name="half-rating-read" defaultValue={card.rating} precision={0.5} readOnly />
        <OwnerDiv>
          <OwnerSvg />
          <OwnerName>{owner.name} {owner.surname}</OwnerName>
        </OwnerDiv>

      </Container>

    </CardDiv>
    </StyledLink>
    

  )

}


const StyledLink = styled(Link)`
   text-decoration: none;
   color: inherit;
`
const CardDiv = styled.div`
  width: 220px;
  height: 231px;
  background: rgba(120, 193, 243, 0.19);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

`;

const NameDiv = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
`

const Name = styled.p`
   font-size: 20px;
   font-family: 'Montserrat', sans-serif;
   font-weight: 600;
`
const Container = styled.div`
  margin-left: 20px;
    
`

const NumOfCardsDiv = styled.div`
  width: 115px;
  height: 32px;
  background: #F3F3F3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 40px;
`
const NumOfCardsP = styled.p`
  font-size: 15px;   
`
const OwnerDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 17px;

` 
const OwnerName = styled.span`
  font-size: 15px;
  margin-left: 5px;
`