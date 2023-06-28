import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

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

  const handleSubmit=()=>{
    //업로드하고나서 나중에 처리되는 함수 여기다가쓰면돼
  }

  return (
    <div>
      <h1>이미지 등록하기</h1>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: '300px',
          height: '200px',
          border: '2px dashed gray',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px 0',
        }}
      >
        <input
          type="file"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="file-input"
        />
        <label htmlFor="file-input">
          <p>이미지를 여기로 드래그 앤 드롭하거나 선택하세요.</p>
          <button type="button">이미지 선택</button>
        </label>
      </div>
      {selectedImage && (
        <div>
          <h2>사진 미리보기</h2>
          <img src={selectedImage} alt="Preview" style={{ width: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;