import React from "react";
import { styled } from "styled-components";

const StyledImage = styled.img`
  width: 100%;
  cursor: pointer;
`;

function GalleryImage(props) {
  return (
    <StyledImage
      src={props.data.output_url}
      alt="Local_Image"
      onClick={() => {
        props.setShowTab(!props.showTab);
        props.setDetailInfo(props.data);
      }}
    />
  );
}

export default GalleryImage;
