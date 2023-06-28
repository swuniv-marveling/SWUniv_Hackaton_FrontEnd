import React from "react";
import { styled } from "styled-components";
import Contents from "../components/LandingPage/Contents";

const StyledLandingPage = styled.div`
  height: 85%;
`;

const StyledCircle = styled.div`
  position: fixed;
  width: 950px;
  height: 950px;
  border-radius: 9999px;
  background: linear-gradient(to right, #9d18e2, #ffa9a9);
  z-index: 2;
  top: 150px;
  left: 570px;
  transform: rotate(45deg);
`;

function LandingPage() {
  return (
    <StyledLandingPage>
      <Contents />
      <StyledCircle />
    </StyledLandingPage>
  );
}

export default LandingPage;
