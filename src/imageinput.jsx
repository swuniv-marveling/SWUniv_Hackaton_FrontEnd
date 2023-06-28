import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <div>
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