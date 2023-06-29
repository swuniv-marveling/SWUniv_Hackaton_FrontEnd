import React from "react";
import { styled } from "styled-components";

const StyledImage = styled.img`
  width: 100%;
  cursor: pointer;
`;

function GalleryImage(props) {
  return (
    <StyledImage
      src="https://assets.community.lomography.com/89/20d68ad867732cbd6e18c0e9faec7e511b4385/576x576x2.jpg?auth=44c7207f9e9ba6944c9e9fdb0bf284865d718ae9"
      alt="Local_Image"
      onClick={() => props.setShowTab(true)}
    />
  );
}

export default GalleryImage;
