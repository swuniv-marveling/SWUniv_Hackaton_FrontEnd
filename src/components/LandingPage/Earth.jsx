import React from "react";
import { styled } from "styled-components";
import EarthImage from "../../images/Earth.png";

const StyledImage = styled.img`
  position: fixed;
  width: 950px;
  height: 950px;
  /* background: linear-gradient(to right, #9d18e2, #ffa9a9); */
  top: 130px;
  left: 480px;
  transform: rotate(-17deg);
`;

function Earth() {
  return <StyledImage src={EarthImage} />;
}

export default Earth;
