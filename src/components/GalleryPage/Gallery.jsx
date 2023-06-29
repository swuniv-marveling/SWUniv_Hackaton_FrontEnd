import React from "react";
import { styled } from "styled-components";
import GalleryImage from "./GalleryImage";
import Tab from "./Tab";

function Gallery(props) {
  const StyledImageList = styled.div`
    width: ${props.showTab ? "45%" : "60%"};
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin: ${props.showTab ? "30px 30px 0 30px" : "30px auto"};
  `;

  return (
    <>
      <StyledImageList>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <GalleryImage key={item} setShowTab={props.setShowTab} />
        ))}
      </StyledImageList>
      <Tab showTab={props.showTab} setShowTab={props.setShowTab} />
    </>
  );
}

export default Gallery;
