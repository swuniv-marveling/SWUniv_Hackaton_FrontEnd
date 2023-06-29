import React, { useState } from "react";
import { styled } from "styled-components";
import User from "../components/AllGalleryPage/User";
import Gallery from "../components/AllGalleryPage/Gallery";

const StyledAllGalleryPage = styled.div`
  min-height: 85%;
`;

function AllGalleryPage() {
  const [showTab, setShowTab] = useState(false);
  const [detailInfo, setDetailInfo] = useState({});

  return (
    <StyledAllGalleryPage>
      <User showTab={showTab} />
      <Gallery
        showTab={showTab}
        setShowTab={setShowTab}
        detailInfo={detailInfo}
        setDetailInfo={setDetailInfo}
      />
    </StyledAllGalleryPage>
  );
}

export default AllGalleryPage;
