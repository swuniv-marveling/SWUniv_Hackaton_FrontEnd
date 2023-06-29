import React from "react";
import { styled } from "styled-components";

const StyledCircle = styled.div`
  position: fixed;
  width: 950px;
  height: 950px;
  border-radius: 9999px;
  background: linear-gradient(
    135deg,
    rgba(101, 75, 255, 255) 65%,
    rgba(101, 75, 255, 0) 90%
  );
  top: -500px;
  left: -700px;
`;

function Circle() {
  return <StyledCircle />;
}

export default Circle;
