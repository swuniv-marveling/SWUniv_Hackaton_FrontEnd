import React from "react";
import { styled } from "styled-components";
import LoginForm from "../components/LoginPage/LoginForm";
import Circle from "../components/LoginPage/Circle";

const StyledLoginPage = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function LoginPage() {
  return (
    <StyledLoginPage>
      <LoginForm />
      <Circle />
    </StyledLoginPage>
  );
}

export default LoginPage;
