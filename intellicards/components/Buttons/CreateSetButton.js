import { useRouter } from "next/router";
import styled from "styled-components";

export default function CreateSetButton({ children }) {
    const router = useRouter();

    const handleClick = () => {
        router.push("/CreateSet"); // Assuming "/CreateSet" is the correct route
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
    font-size: 18px;
    background-color: #c5e898;
    cursor: pointer;
`;
