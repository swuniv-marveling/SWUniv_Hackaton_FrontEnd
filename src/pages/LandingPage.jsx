import React from "react";
import { styled } from "styled-components";
import Contents from "../components/LandingPage/Contents";
import Earth from "../components/LandingPage/Earth";

const StyledLandingPage = styled.div`
  height: 85%;
`;

function LandingPage() {
  return (
    <StyledLandingPage>
      <Contents />
      <Earth />
    </StyledLandingPage>
  );
}

export default LandingPage;
