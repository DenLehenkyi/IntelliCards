import { useEffect, useState } from "react"
import styled from "styled-components"

export default function CategoriesBox({cardSets}){
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const catArray = [];
        cardSets.forEach((set) => {
            if (!catArray.includes(set.category)){
                catArray.push(set.category);
            }

        });
    
        setCategories(catArray);
      }, [cardSets]);
    return (

        <CategoriesDiv>
            <Div>
              <StyledP>Категорії</StyledP>
              {categories.map(category => {
                return(
                    <CategoriesP>{category}</CategoriesP>
                )
              })}
            </Div>
            

        </CategoriesDiv>


    )
}

const CategoriesDiv = styled.div`
  width: 247px;
  height: 354px;
  background: #F3F3F3;
  border-radius: 10px;
  margin-top: 20px;
  padding: 0;
`
const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 20px;

`
const StyledP = styled.p`
  font-size: 20px;
  margin: 0;
  font-weight: 600;
  margin-bottom: 10px;

`
const CategoriesP = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 5px;
`