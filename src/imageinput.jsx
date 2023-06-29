import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";


const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    navigate("/user/imageselect"); // '/imageselect'로 이동
  };

  const handleSelectImage = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <div
      style={{
        backgroundColor: "transparent",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>이미지 등록하기</h1>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: "800px",
          height: "800px",
          border: "2px dashed gray",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px 0",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "rgba(255, 255, 255, 0.01)",
        }}
      >
        <input
          type="file"
          onChange={handleImageChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <label
          htmlFor="file-input"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {!selectedImage && (
            <p style={{ fontfamily: "AppleSDGothicNeoB", fontSize: "30px" }}>
              이미지를 여기다 끌어다 놓으세요.
            </p>
          )}
          {!selectedImage && (
            <button
              type="button"
              onClick={handleSelectImage}
              style={{
                width: "260px",
                height: "50px",
                borderRadius: "40px",
                backgroundColor: "white",
                color: "#654BFF",
                border: "none",
                cursor: "pointer",
                fontSize: "30px",
                fontFamily: "AppleSDGothicNeoB",
                padding: "5px",
                textAlign: "center",
              }}
            >
              이미지 선택
            </button>
          )}
        </label>
        {selectedImage && (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <img
              src={selectedImage}
              alt="Preview"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        )}
      </div>
      {selectedImage && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "800px",
          }}
        >
          <button
            type="button"
            onClick={handleRemoveImage}
            style={{
              width: "260px",
              height: "50px",
              borderRadius: "40px",
              backgroundColor: "white",
              color: "#654BFF",
              border: "none",
              cursor: "pointer",
              fontSize: "30px",
              fontFamily: "AppleSDGothicNeoB",
              padding: "5px",
              textAlign: "center",
            }}
          >
            이미지 변경
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            style={{
              width: "260px",
              height: "50px",
              borderRadius: "40px",
              backgroundColor: "#654BFF",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "30px",
              fontFamily: "AppleSDGothicNeoB",
              padding: "5px",
              textAlign: "center",
            }}
          >
            선택 완료
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
