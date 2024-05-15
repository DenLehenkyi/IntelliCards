import Center from "@/components/Center";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import styled from "styled-components";
import { User } from "@/models/User";
import { mongooseConnect } from "@/lib/mongoose";

export default function TopUsersPage({ users }) {
  console.log(users);
  return (
    <Center>
      <Header />
      <Navigation page={"Топ користувачів"} />
      <UsersDiv>
        {users &&
          users.map((user, index) => (
            <UserDiv key={user._id}>
              <StyledOrder>{index + 1}.</StyledOrder> {/* Add numbering */}
              <StyledName>{user.name}</StyledName>
              <StyledSurname>{user.surname}</StyledSurname>
              <StyledPoints>{user.points}</StyledPoints>
              <StyledStar
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.9108 1.12969L9.47553 5.92656C9.53438 6.10709 9.62821 6.26307 9.74722 6.37823C9.86623 6.49339 10.0061 6.5635 10.1521 6.58125L13.9639 7.04063C14.3952 7.125 14.5673 7.83594 14.2546 8.24531L11.3832 11.4875C11.1507 11.75 11.0449 12.1625 11.1088 12.5609L11.9435 17.8125C12.0168 18.3891 11.5669 18.8297 11.1809 18.5563L7.85384 15.9375C7.72836 15.8385 7.58549 15.7863 7.43999 15.7863C7.29449 15.7863 7.15163 15.8385 7.02614 15.9375L3.69907 18.5547C3.31428 18.8266 2.86323 18.3875 2.93647 17.8109L3.77114 12.5594C3.83392 12.1609 3.72929 11.7484 3.49679 11.4859L0.624254 8.24688C0.312704 7.83906 0.484754 7.12656 0.914879 7.04219L4.72672 6.58281C4.87276 6.56507 5.01259 6.49496 5.1316 6.3798C5.25061 6.26464 5.34444 6.10865 5.40329 5.92813L6.96802 1.13125C7.16215 0.60625 7.71783 0.60625 7.9108 1.12969Z"
                  fill="#FDD835"
                />
                <path
                  d="M7.79703 6.21401L7.53185 2.67964C7.52139 2.48276 7.49115 2.14526 7.72608 2.14526C7.91217 2.14526 8.01335 2.66558 8.01335 2.66558L8.80887 5.50308C9.10893 6.58276 8.98565 6.95308 8.69606 7.17183C8.36343 7.42183 7.87262 7.22651 7.79703 6.21401Z"
                  fill="#FFFF8D"
                />
                <path
                  d="M11.0763 11.1735L13.3571 8.7813C13.4699 8.65474 13.6733 8.45317 13.5106 8.22349C13.3815 8.04224 13.0328 8.30317 13.0328 8.30317L11.0368 9.35161C10.4416 9.62817 10.0463 10.0375 10.0114 10.5532C9.96611 11.2407 10.4253 11.7704 11.0763 11.1735Z"
                  fill="#F4B400"
                />
              </StyledStar>
            </UserDiv>
          ))}
      </UsersDiv>
    </Center>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();

  const users = await User.find({});

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),

      search: context.query?.search || "",
    },
  };
}
const StyledStar = styled.svg`
  margin-right: 15px;
`;
const StyledOrder = styled.span`
  margin-left: 10px;
  font-weight: bold;
`;
const StyledName = styled.span`
  margin-left: 20px;
  margin-right: 10px;
  font-weight: 600;
`;
const StyledSurname = styled.span`
  font-weight: 600;
`;
const StyledPoints = styled.span`
  margin-left: auto;
  margin-right: 10px;
`;
const UsersDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
`;
const UserDiv = styled.div`
  width: 743.85px;
  height: 61px;
  background: #f3f3f3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: 30px;
`;
