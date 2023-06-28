import React, { useRef, useState } from 'react';
import { Stage, Layer, Image, Line, Circle, Transformer } from 'react-konva';

const DrawingBoard = () => {
  const imageRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const handleMouseDown = (event) => {
    // 그리기 시작 위치 설정
    const { offsetX, offsetY } = event.evt;
    setLines([...lines, { tool: 'pen', points: [offsetX, offsetY] }]);
  };

  const handleMouseMove = (event) => {
    // 그리기 중인 동안 포인트 추가
    if (!lines.length) {
      return;
    }
    const { offsetX, offsetY } = event.evt;
    const updatedLines = [...lines];
    const lastLine = updatedLines[updatedLines.length - 1];
    lastLine.points = lastLine.points.concat([offsetX, offsetY]);
    setLines(updatedLines);
  };

  const handleMouseUp = () => {
    // 그리기 종료
    setLines([...lines]);
  };

  const handleSelect = (e) => {
    const shapeId = e.target.index;
    setSelectedId(shapeId);
  };

  const handleDelete = () => {
    if (selectedId !== null) {
      const updatedLines = lines.filter((_, index) => index !== selectedId);
      setLines(updatedLines);
      setSelectedId(null);
    }
  };

  return (
    <div>
      <Stage
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          <Image
            image={imageRef.current}
            width={800}
            height={600}
          />
          {lines.map((line, index) => (
            <Line
              key={index}
              points={line.points}
              stroke="red"
              strokeWidth={3}
              tension={0.5}
              draggable
              onClick={handleSelect}
            />
          ))}
          <Transformer
            selectedShapeName={selectedId !== null ? 'Line' : ''}
            nodes={[Line]}
          />
        </Layer>
      </Stage>
      <button onClick={handleDelete}>Delete Selected</button>
    </div>
  );
};

export default DrawingBoard;