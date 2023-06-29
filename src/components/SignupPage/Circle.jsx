import React from "react";
import { styled } from "styled-components";

const StyledCircle = styled.div`
  position: fixed;
  width: 950px;
  height: 950px;
  border-radius: 9999px;
  background: linear-gradient(
    -45deg,
    rgba(48, 234, 55, 255) 65%,
    rgba(48, 234, 55, 0) 90%
  );
  top: 400px;
  left: 1050px;
`;

function Circle() {
  return <StyledCircle />;
}

export default Circle;
