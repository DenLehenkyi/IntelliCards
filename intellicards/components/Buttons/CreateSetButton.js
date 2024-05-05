import { useRouter } from "next/router";
import styled from "styled-components";

export default function CreateSetButton({ children }) {
    const router = useRouter();

    const handleClick = () => {
        router.push("/CreateSet"); 
    };

    return (
        <StyledButton onClick={handleClick}>
            {children}
        </StyledButton>
    );
}

const StyledButton = styled.button`
    width: 180px;
    height: 40px;
    margin-left: 40px;
    border-radius: 20px;
    border: none;
    font-weight: bold;
    font-size: 16px;
    background-color: #c5e898;
    cursor: pointer;
    transition: background-color 1.0 ease; /* Add transition effect to background-color */
    &:hover {
        background-color: #75C113;;
    }
`;
