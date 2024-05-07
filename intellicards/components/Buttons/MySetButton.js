import styled from "styled-components";

export default function MySetsButton({ children }) {
  return <StyledButton>{children}</StyledButton>;
}

const StyledButton = styled.button`
  width: 180px;
  height: 40px;
  margin-left:300px;
  border-radius: 20px;
  border: 2px solid  #75c113;
  font-weight: bold;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  color: #75c113;
  background-color: #f3f3f3;
  cursor: pointer;
  transition: background-color 1.0 ease;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    &:hover {
        background-color: #75C113;
        color: white;
    }
`;
