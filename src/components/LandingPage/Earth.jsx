import React from "react";
import { styled } from "styled-components";
import EarthImage from "../../assets/images/Earth.png";

const StyledImage = styled.img`
  position: fixed;
  width: 950px;
  height: 950px;
  top: 130px;
  left: 480px;
  transform: rotate(-17deg);
`;

function Earth() {
  return <StyledImage src={EarthImage} />;
}

export default Earth;
