import React from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

function User(props) {
  const user = useSelector((state) => state.user);

  const StyledUserName = styled.div`
    text-align: ${props.showTab ? "start" : "center"};
    margin-left: 30px;
    font-size: 48px;
  `;

  return (
    <StyledUserName className="font-bold">{user.name + " 님"}</StyledUserName>
  );
}

export default User;
