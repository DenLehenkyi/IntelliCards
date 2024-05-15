import styled from "styled-components"
import CardBox from "./CardsBox"
import { Pagination } from "@mui/material"
import { useEffect, useState } from "react";
import Center from "../Center";

export default function CardSetsGrid({allCardSets, category, users}){
    const [cardSets, setCardSets] = useState(allCardSets);

    useEffect(() => {
        if(category){
            const filteredCardSets = allCardSets.filter(set => set.category === category);
            setCardSets(filteredCardSets);
        }
        else{
            setCardSets(allCardSets);
        }

    }, [allCardSets, category]);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const totalPages = Math.ceil(cardSets.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentCardSets = cardSets.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return(
        <Center>
                    <SetsDiv>
            <StyledP>Набори карточок</StyledP>
            <Grid>
                {currentCardSets.map(set => (
                    <CardBox key={set._id} card={set} users={users}/>
                ))}
            </Grid>
            <PaginationDiv>
                <Pagination count={totalPages} page={currentPage} variant="outlined" color="primary" onChange={(event, page) => handlePageChange(page)} />
            </PaginationDiv>
        </SetsDiv>

        </Center>

    );
}

const SetsDiv = styled.div`
   margin-top: 20px;
   width: 98%;
   margin-left:16px;
   height: auto;
   background: #F3F3F3;
   border-radius: 10px;
   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
   padding: 18px;
   margin-bottom: 20px;
`
const StyledP = styled.p`
   font-size: 20px;
   font-weight: 600;
   margin-top: 10px;
   margin-bottom: 28px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 21px;
`

const PaginationDiv = styled.div`
  margin-top: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`
