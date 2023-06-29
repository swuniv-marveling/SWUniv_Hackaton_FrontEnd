import React from "react";
import { styled } from "styled-components";

function User(props) {
  const StyledUserName = styled.div`
    text-align: ${props.showTab ? "start" : "center"};
    margin-left: 30px;
    font-size: 48px;
  `;

  return <StyledUserName className="font-bold">abc님</StyledUserName>;
}

export default User;
