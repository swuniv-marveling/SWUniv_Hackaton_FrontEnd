import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Image, Line, Text } from 'react-konva';

const DrawingEditor = () => {
  const [image, setImage] = useState(null);
  const [lines, setLines] = useState([]);
  const [text, setText] = useState('');
  const isDrawing = useRef(false);
  const stageRef = useRef(null);
  const imageRef = useRef(null);


  const saveDrawing = () => {
    // 그림 데이터와 텍스트를 백엔드로 전송
    const payload = {
      lines: lines,
      prompt: text, // 백엔드에 'prompt'라는 변수로 텍스트 전송
    };

    fetch('http://your-backend-server.com/api/save-drawing', { // 백엔드 API endpoint, 수정 필요
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));

    console.log('그림 저장:', lines, text);
  };

  //마우스 위치가 이미지 내부인지 확인하는 함수
  const isWithinImage = (x, y) => {
    if (!image) return false;

    const imgX = imageRef.current.x();
    const imgY = imageRef.current.y();
    const imgWidth = imageRef.current.width();
    const imgHeight = imageRef.current.height();

    return (
      x >= imgX &&
      x <= imgX + imgWidth &&
      y >= imgY &&
      y <= imgY + imgHeight
    );
  };

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
    if (!image) return; // 이미지가 없을 경우 그리기 작업 중지

    isDrawing.current = true;

    const { offsetX, offsetY } = event.evt;
    // 코드 수정: 이미지 내부에서만 그림 그리기 시작
    if (isWithinImage(offsetX, offsetY)) {
      isDrawing.current = true;
      setLines([...lines, { points: [offsetX, offsetY] }]);
    }
  };

  const handleMouseMove = (event) => {
    if (!isDrawing.current) return;

    const { offsetX, offsetY } = event.evt;
    if (isWithinImage(offsetX, offsetY)) {
      const updatedLines = [...lines];
      const lastLine = updatedLines[updatedLines.length - 1];

      lastLine.points = lastLine.points.concat([offsetX, offsetY]);

      setLines(updatedLines);
    } else {
      // 이미지 영역 밖으로 나가면 그리기 중지
      isDrawing.current = false;
    }
  };
  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImageLoad = () => {
    const img = imageRef.current;
    const stage = stageRef.current;

    const boxWidth = 2000; 
    const boxHeight = 800; 
    const stageWidth = stage.width();
    const stageHeight = stage.height();
  
    let scaleX = stageWidth / img.width;
    let scaleY = stageHeight / img.height;
  
    // 이미지를 박스 안에 맞추기 위한 스케일 팩터 계산
    const scaleFactor = Math.min(scaleX, scaleY);
  
    // 이미지의 새로운 크기 계산
    const newWidth = img.width * scaleFactor;
    const newHeight = img.height * scaleFactor;
  
    // 이미지의 크기를 조정할 필요가 있는 경우에만 실행
    if (newWidth > boxWidth || newHeight > boxHeight) {
      const scale = Math.min(boxWidth / newWidth, boxHeight / newHeight);
      const adjustedWidth = newWidth * scale;
      const adjustedHeight = newHeight * scale;
  
      img.width(adjustedWidth);
      img.height(adjustedHeight);
    }
  
    // 이미지를 박스 가운데로 위치시키기 위한 좌표 계산
    const newX = (stageWidth - img.width()) / 2;
    const newY = (stageHeight - img.height()) / 2;
  
    // 이미지의 위치 업데이트
    img.position({ x: newX, y: newY });
  
    // 스테이지의 크기를 이미지에 맞게 업데이트
    stage.width(img.width());
    stage.height(img.height());
  
    // 스테이지를 다시 그려서 변경 사항을 반영
    stage.draw();
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
      <h1>그림 그리기</h1>
      <input type="file" onChange={handleImageChange} style={{ marginBottom: '10px' }} />

      <div
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
        <Stage
          width={800}
          height={800}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          ref={stageRef}
        >
          <Layer>
            <Rect
              width={800}
              height={800}
              fill="rgba(255, 255, 255, 0.3)"
              stroke="black"
            />

            {image && (
              <Image
                image={image}
                x={(800 - image.width) / 2}
                y={(800 - image.height) / 2}
                ref={imageRef}
                draggable={false}
                onLoad={handleImageLoad}
              />
            )}
            
            {lines.map((line, index) => (
              <Line
                key={index}
                points={line.points}
                stroke="white"
                strokeWidth={30}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation="source-over"
                listening={false} // 이미지 위에서는 마우스 이벤트를 받지 않도록 설정
              />
            ))}
          </Layer>
        </Stage>
      </div>

      <input type="text" value={text} onChange={handleTextChange} placeholder="텍스트 입력" />
      <button onClick={saveDrawing}>저장하기</button>
    </div>
  );
};

export default DrawingEditor;