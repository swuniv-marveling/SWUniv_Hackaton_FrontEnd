import React from "react";
import { styled } from "styled-components";
import SignupForm from "../components/SignupPage/SignupForm";
import Circle from "../components/SignupPage/Circle";

const StyledSignupPage = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function SignupPage() {
  return (
    <StyledSignupPage>
      <SignupForm />
      <Circle />
    </StyledSignupPage>
  );
}

export default SignupPage;
