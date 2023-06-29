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
        if (props.detailInfo.work_id === props.data.work_id) {
          props.setShowTab(false);
          props.setDetailInfo({});
        } else {
          props.setShowTab(true);
          props.setDetailInfo(props.data);
        }
      }}
    />
  );
}

export default GalleryImage;
