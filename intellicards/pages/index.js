import CardSetsGrid from "@/components/CardSetsGrid";
import CategoriesBox from "@/components/Categories";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Search from "@/components/Search";
import { useState } from "react";
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

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(""); // Initialize with an empty string

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  }

  return (
    <Center>
      <Header/>
      <Search />
      <CategoriesAndGridDiv>
        <CategoriesBox cardSets={cardSetsData} onClick={handleCategoryClick} />
        <CardSetsGrid allCardSets={cardSetsData}  category={selectedCategory}/>
      </CategoriesAndGridDiv>
    </Center>
  );
}


const CategoriesAndGridDiv = styled.div`
   display: flex;
   justify-content: space-between;
`
 
