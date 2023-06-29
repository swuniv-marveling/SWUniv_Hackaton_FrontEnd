import React, { useState } from "react";
import { styled } from "styled-components";
import User from "../components/GalleryPage/User";
import Gallery from "../components/GalleryPage/Gallery";

const StyledGalleryPage = styled.div`
  min-height: 85%;
`;

function GalleryPage() {
  const [showTab, setShowTab] = useState(false);

  return (
    <StyledGalleryPage>
      <User showTab={showTab} />
      <Gallery showTab={showTab} setShowTab={setShowTab} />
    </StyledGalleryPage>
  );
}

export default GalleryPage;
