import React from "react";
import { styled } from "styled-components";

function User(props) {
  const StyledUserName = styled.div`
    text-align: ${props.showTab ? "start" : "center"};
    margin-left: 30px;
    font-size: 48px;
  `;

  const StyledBr = styled.br`
    display: ${props.showTab ? "" : "none"};
  `;

  return (
    <StyledUserName className="font-bold">
      다른 사람들이 만든 <StyledBr />
      이미지를 함께 즐겨요
    </StyledUserName>
  );
}

export default User;
