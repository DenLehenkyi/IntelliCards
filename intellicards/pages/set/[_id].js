import CardBox from "@/components/CardsBox";
import CardsInSetGrid from "@/components/CardsInSetGrid";
import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";

const cardSetsData = [
    {
      _id: 1,
      name: "Англійська мова",
      category: "Англійська мова",
      cardCount: 20,
      owner: "Користувач 1",
      rating: 3.5
    },
    {
      _id: 2,
      name: "Англійська мова",
      category: "Українська мова",
      cardCount: 15,
      owner: "Користувач 2",
      rating: 4.5
    },
    {
      _id: 3,
      name: "Англійська мова",
      category: "Історія",
      cardCount: 15,
      owner: "Користувач 3",
      rating: 4.0
    },
    {
      _id: 4,
      name: "Набір 4",
      category: "Англійська мова",
      cardCount: 15,
      owner: "Користувач 4",
      rating: 4.0
    },
  
  
  ];
  
export default function SetPage({_id}){
    const set = cardSetsData.filter(set => set._id == _id);
    console.log(set[0].category);

    return(
        <Center>
           <Header />
           <Container>
           <CardBox card={set[0]} />
           <CardsInSetGrid set={set[0]} />

           </Container>

        </Center>

        
    )
}

export async function getServerSideProps(context) {
    const { _id } = context.query;

    return {
        props: {
            _id: _id.toString(),
        },
    };
}

const Container = styled.div`
margin-top: 20px;
    display: flex;
    justify-content: space-between;
`
