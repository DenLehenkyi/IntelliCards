import styled from "styled-components"
import CardBox from "./CardsBox"
import { Pagination } from "@mui/material"
import { useState } from "react";

export default function CardSetsGrid({cardSets}){
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCardSets, setCurrentCardSets] = useState(cardSets);
    const productsPerPage = 12;
    const totalPages = Math.ceil(cardSets.length / productsPerPage);
    const handlePageChange = (page) => {
        setCurrentPage(page);
        setCurrentCardSets(cardSets.slice(startIndex, endIndex));
    };
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;


    return(
        <SetsDiv>
            <StyledP>Набори карточок</StyledP>
            <Grid>
            {currentCardSets.map(set => {
                {console.log(set)}
          
          return <CardBox key={set._id} card={set} />;
        })}
            </Grid>
        <PaginationDiv>
          <Pagination count={totalPages} page={currentPage} variant="outlined" color="primary"   onChange={(event, page) => handlePageChange(page)}/>
        </PaginationDiv>
        
        </SetsDiv> 


    )
}

const SetsDiv = styled.div`
   margin-top: 20px;
   width: 73%;
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
  grid-template-columns: 1fr 1fr 1fr;
  gap: 21px;
`

const PaginationDiv = styled.div`
  margin-top: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  

`