import React, { useState, useRef } from 'react';
import { Stage, Layer, Image, Line } from 'react-konva';

const DrawingEditor = () => {
  const [image, setImage] = useState(null);
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const stageRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new window.Image();
      img.src = e.target.result;

      img.onload = () => {
        setImage(img);
      };
    };

    reader.readAsDataURL(file);
  };

  const handleMouseDown = (event) => {
    isDrawing.current = true;

    const { offsetX, offsetY } = event.evt;

    setLines([...lines, { points: [offsetX, offsetY] }]);
  };

  const handleMouseMove = (event) => {
    if (!isDrawing.current) return;

    const { offsetX, offsetY } = event.evt;
    const updatedLines = [...lines];
    const lastLine = updatedLines[updatedLines.length - 1];

    lastLine.points = lastLine.points.concat([offsetX, offsetY]);

    setLines(updatedLines);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div>
      <h1>그림 그리기</h1>
      <input type="file" onChange={handleImageChange} />

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {image && (
            <Image
              image={image}
              width={window.innerWidth}
              height={window.innerHeight}
            />
          )}

          {lines.map((line, index) => (
            <Line
              key={index}
              points={line.points}
              stroke="red"
              strokeWidth={2}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation="source-over"
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default DrawingEditor;
