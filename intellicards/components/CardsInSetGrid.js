import styled from "styled-components"

export default function CardsInSetGrid({cards}){
    return(
        <Div>
            <StyledP>Попередній перегляд</StyledP>
            {cards.map(card => (
                <p key={card._id}>{card.answer}</p>
            ))}

        </Div>

    )
}

const Div = styled.div`
 width: 739px;
 height: 1141px;
 background: #F3F3F3;
 border-radius: 10px;
`
const StyledP = styled.p`
  font-size: 20px;
  font-weight: 600;
`