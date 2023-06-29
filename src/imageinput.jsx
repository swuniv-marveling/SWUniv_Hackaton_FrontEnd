import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
    // 이미지 업로드 후 처리할 내용을 여기에 작성
  };

  const handleNavigate = () => {
    navigate('/mypage'); // '/mypage'로 이동
  };

  const handleSelectImage = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <h1>이미지 등록하기</h1>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: '1200px',
          height: '650px',
          border: '2px dashed gray',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <input
          type="file"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <label htmlFor="file-input">
          {!selectedImage && (
            <p>이미지를 여기로 드래그 앤 드롭하거나 선택하세요.</p>
          )}
          {!selectedImage && (
            <button type="button" onClick={handleSelectImage}>
              이미지 선택
            </button>
          )}
        </label>
        {selectedImage && (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={selectedImage}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
              />
            </div>
          </div>
        )}
      </div>
      {selectedImage && (
        <button type="button" onClick={handleRemoveImage}>
          이미지 변경
        </button>
      )}
    </div>
  );
};

export default ImageUpload;
