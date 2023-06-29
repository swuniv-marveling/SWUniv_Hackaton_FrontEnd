import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/modules/userSlice";
import { API } from "../../global/Constants";
import axios from "axios";
import { IoPerson } from "react-icons/io5";
import { BiSolidLockAlt } from "react-icons/bi";

const StyledLogin = styled.div`
  text-align: center;
`;

const StyledTitle = styled.div`
  font-size: 48px;
  margin: 50px 0 70px 0;
`;

const StyledInputDiv = styled.div`
  width: 480px;
  position: relative;
  margin: 0 auto;
`;

const StyledInput = styled.input`
  width: 100%;
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
  background-color: #f9fbfd;
  color: #000011;
  border-radius: 10px;
  cursor: pointer;
  display: none;
`;

const StyledSignup = styled.div`
  font-size: 18px;
  margin-top: 70px;
  cursor: pointer;
`;

function LoginForm() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({ id: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(API + "/login", userInfo)
      .then((response) => {
        if (response.data.access_token) {
          alert("안녕하세요.");
          dispatch(login(response.data));
          navigation("/", { replace: true });
        } else alert("다시 시도해주세요.");
      })
      .catch(() => alert("다시 시도해주세요."));
  };

  return (
    <StyledLogin>
      <StyledTitle className="font-bold">5초만에 로그인하기</StyledTitle>
      <form onSubmit={submitHandler}>
        <StyledInputDiv>
          <IoPerson className="inputIcon" size={24} />
          <StyledInput
            type="text"
            placeholder="ID"
            value={userInfo.id}
            onChange={(e) => {
              setUserInfo({ ...userInfo, id: e.target.value });
            }}
          />
        </StyledInputDiv>
        <StyledInputDiv>
          <BiSolidLockAlt className="inputIcon" size={24} />
          <StyledInput
            type="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={(e) => {
              setUserInfo({ ...userInfo, password: e.target.value });
            }}
          />
        </StyledInputDiv>
        <StyledSubmit type="submut">Login</StyledSubmit>
      </form>
      <StyledSignup onClick={() => navigation("/signup", { replace: true })}>
        {"처음 오셨나요? >>"}
      </StyledSignup>
    </StyledLogin>
  );
}

export default LoginForm;
