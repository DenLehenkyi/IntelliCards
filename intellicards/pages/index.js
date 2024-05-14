import CardSetsGrid from "@/components/Card/CardSetsGrid";
import CategoriesBox from "@/components/Categories";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Search from "@/components/Search";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { mongooseConnect } from "@/lib/mongoose";
import { CardSet } from "@/models/CardSet";

// const cardSetsData = [
//   {
//     _id: 1,
//     name: "Англійська мова",
//     category: "Англійська мова",
//     cardCount: 20,
//     owner: "Користувач 1",
//     rating: 3.5
//   },
//   {
//     _id: 2,
//     name: "Англійська мова",
//     category: "Українська мова",
//     cardCount: 15,
//     owner: "Користувач 2",
//     rating: 4.5
//   },
//   {
//     _id: 3,
//     name: "Англійська мова",
//     category: "Історія",
//     cardCount: 15,
//     owner: "Користувач 3",
//     rating: 4.0
//   },
//   {
//     _id: 4,
//     name: "Набір 4",
//     category: "Англійська мова",
//     cardCount: 15,
//     owner: "Користувач 4",
//     rating: 4.0
//   },

// ];

export default function Home({ cardSets }) {
  const [selectedCategory, setSelectedCategory] = useState(""); // Initialize with an empty string

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Center>
      <Header />
      <Search />
      <CategoriesAndGridDiv>
        <CategoriesAndButton>
          <CategoriesBox
            cardSets={cardSets}
            onClick={handleCategoryClick}
          />
          <StyledLink href={"/top_users"}>
            <Button>Топ користувачів</Button>
          </StyledLink>
        </CategoriesAndButton>

        <CardSetsGrid allCardSets={cardSets} category={selectedCategory} />
      </CategoriesAndGridDiv>
    </Center>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();

  const cardSets = await CardSet.find({});

  return {
    props: {
      cardSets: JSON.parse(JSON.stringify(cardSets)),

      search: context.query?.search || "",
    },
  };
}

const CategoriesAndGridDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CategoriesAndButton = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  width: 200px;
  height: 45px;
  background: #c5e898;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  font-size: 17px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  cursor: pointer;
  margin-top: 25px;
  transition: background-color 1 ease; /* Add transition effect to background-color */
  &:hover {
    background-color: #75c113;
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
