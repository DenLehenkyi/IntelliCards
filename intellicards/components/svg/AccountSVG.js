import styled from "styled-components";
import Link from "next/link";

export default function AccountSvg() {
    
  return (
    <Link href={"/login"}>
      <Svg
        width="32"
        height="28"
        viewBox="0 0 32 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5833 0.833313C11.0362 0.833313 9.5525 1.44789 8.45853 2.54186C7.36457 3.63582 6.74999 5.11955 6.74999 6.66665C6.74999 8.21374 7.36457 9.69747 8.45853 10.7914C9.5525 11.8854 11.0362 12.5 12.5833 12.5C14.1304 12.5 15.6142 11.8854 16.7081 10.7914C17.8021 9.69747 18.4167 8.21374 18.4167 6.66665C18.4167 5.11955 17.8021 3.63582 16.7081 2.54186C15.6142 1.44789 14.1304 0.833313 12.5833 0.833313ZM22.7917 12.5C22.7025 12.4983 22.6157 12.5281 22.5463 12.5841C22.477 12.6401 22.4296 12.7188 22.4125 12.8062L22.1354 14.7312C21.6979 14.9208 21.275 15.1541 20.8958 15.4166L19.0875 14.6875C18.9271 14.6875 18.7375 14.6875 18.6354 14.8771L17.1771 17.4C17.0896 17.5604 17.1187 17.75 17.2646 17.8666L18.8104 19.0625C18.7523 19.5469 18.7523 20.0364 18.8104 20.5208L17.2646 21.7166C17.199 21.7728 17.1546 21.8497 17.1387 21.9346C17.1228 22.0194 17.1363 22.1072 17.1771 22.1833L18.6354 24.7062C18.7229 24.8958 18.9125 24.8958 19.0875 24.8958L20.8958 24.1666C21.275 24.4291 21.6833 24.6771 22.1354 24.8521L22.4125 26.7771C22.4417 26.9521 22.5875 27.0833 22.7917 27.0833H25.7083C25.8687 27.0833 26.0292 26.9521 26.0583 26.7771L26.3354 24.8521C26.7729 24.6625 27.1667 24.4291 27.5604 24.1666L29.3542 24.8958C29.5437 24.8958 29.7333 24.8958 29.8354 24.7062L31.2937 22.1833C31.3345 22.1072 31.348 22.0194 31.3321 21.9346C31.3162 21.8497 31.2718 21.7728 31.2062 21.7166L29.6458 20.5208C29.675 20.2729 29.7042 20.0396 29.7042 19.7916C29.7042 19.5437 29.6896 19.3104 29.6458 19.0625L31.1917 17.8666C31.2572 17.8104 31.3016 17.7336 31.3175 17.6487C31.3334 17.5638 31.3199 17.4761 31.2792 17.4L29.8208 14.8771C29.7333 14.6875 29.5437 14.6875 29.3542 14.6875L27.5604 15.4166C27.1667 15.1541 26.7729 14.9062 26.3208 14.7312L26.0437 12.8062C26.0345 12.7232 25.9954 12.6463 25.9337 12.5899C25.872 12.5336 25.7919 12.5016 25.7083 12.5H22.7917ZM12.5833 15.4166C6.13749 15.4166 0.916656 18.0271 0.916656 21.25V24.1666H15.0333C14.3825 22.7999 14.0437 21.3055 14.0417 19.7916C14.0446 18.3265 14.3629 16.8791 14.975 15.5479C14.2021 15.4604 13.4 15.4166 12.5833 15.4166ZM24.25 17.6041C25.4604 17.6041 26.4375 18.5812 26.4375 19.7916C26.4375 21.0021 25.4604 21.9791 24.25 21.9791C23.025 21.9791 22.0625 21.0021 22.0625 19.7916C22.0625 18.5812 23.0396 17.6041 24.25 17.6041Z"
          fill="black"
        />
      </Svg>
    </Link>
  );
}

const Svg = styled.svg`
  margin-right: 10px;
`;
