import React from "react";
import { styled } from "styled-components";

const StyledLogin = styled.div`
  text-align: center;
`;

const StyledTitle = styled.div`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const StyledInput = styled.input`
  width: 480px;
  font-size: 24px;
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid #f9fbfd;
  color: #f9fbfd;
  padding: 20px 0;
  text-align: center;
  margin: 10px 0;
  &:focus {
    outline: none;
  }
`;

const StyledSubmit = styled.button`
  width: 480px;
  font-size: 24px;
  padding: 5px 0;
  margin-top: 10px;
`;

const StyledSignup = styled.div`
  font-size: 18px;
  margin-top: 30px;
`;

function LoginForm() {
  return (
    <StyledLogin>
      <StyledTitle>Login</StyledTitle>
      <form>
        <StyledInput type="text" placeholder="id" />
        <br />
        <StyledInput type="text" placeholder="password" />
        <br />
        <StyledSubmit type="submut">Login</StyledSubmit>
      </form>
      <StyledSignup>{"Sign up >>"}</StyledSignup>
    </StyledLogin>
  );
}

export default LoginForm;
