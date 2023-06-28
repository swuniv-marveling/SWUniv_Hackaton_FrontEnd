import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ImageUpload from './imageinput';
import ImageSelect from './imageselect';


export default function App() {
  
  return (
    <div className="App">
     
    <BrowserRouter>
          <Routes>
              <Route path={"/user/imageinput"} element={<ImageUpload />}></Route>
              <Route path={"/user/imageselect"} element={<ImageSelect />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}