import axios from "axios";
import React, { useState } from "react";
import { styled } from "styled-components";
import { API } from "../../global/Constants";
import { useNavigate } from "react-router-dom";
import { IoPerson, IoPersonOutline } from "react-icons/io5";
import { BiSolidLockAlt } from "react-icons/bi";

const StyledSingup = styled.div`
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

function SignupForm() {
  const navigation = useNavigate();
  const [userInfo, setUserInfo] = useState({ name: "", id: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(API + "/register", userInfo)
      .then((response) => {
        if (response.data.success) {
          alert("회원가입 완료");
          navigation("/login", { replace: true });
        } else alert("다시 시도해주세요.");
      })
      .catch(() => alert("다시 시도해주세요."));
  };

  return (
    <StyledSingup>
      <StyledTitle className="font-bold">
        {"간편하게 회원가입해 보세요 :)"}
      </StyledTitle>
      <form onSubmit={submitHandler}>
        <StyledInputDiv>
          <IoPersonOutline className="inputIcon" size={24} />
          <StyledInput
            type="text"
            placeholder="닉네임"
            value={userInfo.name}
            onChange={(e) => {
              setUserInfo({ ...userInfo, name: e.target.value });
            }}
          />
        </StyledInputDiv>
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
        <StyledSubmit type="submut">Sign up</StyledSubmit>
      </form>
    </StyledSingup>
  );
}

export default SignupForm;
