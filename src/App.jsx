import React from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Layout/Header";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ImageSelect from "./imageselect";
import GalleryPage from "./pages/GalleryPage";
import AllGalleryPage from "./pages/AllGalleryPage";

const StyledApp = styled.div`
  background-color: #000011;
  color: #f9fbfd;
  min-height: 100vh;
  padding: 0 50px;
`;

function App() {
  return (
    <StyledApp>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user/imageselect" element={<ImageSelect />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/every" element={<AllGalleryPage />} />
      </Routes>
    </StyledApp>
  );
}

export default App;
