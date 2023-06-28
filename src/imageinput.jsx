import React, { useState } from 'react';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <h2>Preview:</h2>
          <img src={selectedImage} alt="Preview" style={{ width: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
