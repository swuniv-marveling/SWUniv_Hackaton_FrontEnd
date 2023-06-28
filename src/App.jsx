import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ImageUpload from './imageinput';
import ImageSelect from './imageselect';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/user/imageinput">이미지 등록하기</Link>
            </li>
            <li>
              <Link to="/user/imageselect">이미지 영역 선택하기</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/user/imageinput" element={<ImageUpload />} />
          <Route path="/user/imageselect" element={<ImageSelect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}