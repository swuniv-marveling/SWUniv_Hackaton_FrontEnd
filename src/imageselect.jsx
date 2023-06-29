import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Stage, Layer, Rect, Image, Line } from "react-konva";
import axios from "axios";
import { API } from "./global/Constants";
import { Loading } from "./components/Layout/Loading";
import { styled } from "styled-components";
import { LuDownload } from "react-icons/lu";
import { BsTrash3 } from "react-icons/bs";

const StyledButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const StyledButton = styled.div`
  cursor: pointer;
  font-size: 24px;
`;

const StyledTitle = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const StyledLocal = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 30px auto;
`;

const DrawingEditor = () => {
  const [image, setImage] = useState(null);
  const [lines, setLines] = useState([]);
  const [text, setText] = useState("");
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const isDrawing = useRef(false);
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const fileInputRef = useRef(null);
  const [inputImage, setInputImage] = useState(undefined);
  const navigation = useNavigate();
  const token = useSelector((state) => state.user.access_token);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [resultInfo, setResultInfo] = useState({});

  const isWithinImage = (x, y) => {
    if (!image) return false;

    const imgX = imageRef.current.x();
    const imgY = imageRef.current.y();
    const imgWidth = imageRef.current.width();
    const imgHeight = imageRef.current.height();

    return (
      x >= imgX && x <= imgX + imgWidth && y >= imgY && y <= imgY + imgHeight
    );
  };

  useEffect(() => {
    if (image) {
      const img = new window.Image();
      img.src = image;
      img.onload = () => {
        imageRef.current.image(img);
        imageRef.current.getLayer().batchDraw();
      };
    }
  }, [image]);

  const handleMouseDown = (event) => {
    isDrawing.current = true;

    const { offsetX, offsetY } = event.evt;

    if (isWithinImage(offsetX, offsetY)) {
      setLines([...lines, { points: [offsetX, offsetY] }]);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    setInputImage(URL.createObjectURL(file));

    reader.onload = (e) => {
      setImage(e.target.result);

      const tempImg = new window.Image();
      tempImg.onload = () => {
        const aspectRatio = tempImg.width / tempImg.height;
        let imgWidth, imgHeight;

        if (tempImg.width > tempImg.height) {
          imgWidth = 1024;
          imgHeight = imgWidth / aspectRatio;
        } else {
          imgHeight = 1024;
          imgWidth = imgHeight * aspectRatio;
        }

        setImageSize({ width: imgWidth, height: imgHeight });
      };
      tempImg.src = e.target.result;
    };

    reader.readAsDataURL(file);
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
      isDrawing.current = false;
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  async function handleSubmit() {
    // Convert stage (drawing + image) to data URL
    const dataUrl = stageRef.current.toDataURL();

    const byteString = atob(dataUrl.split(",")[1]);

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
      type: "image/png",
    });
    const file = new File([blob], "image.png", {
      type: "image/png",
    });

    const formData = new FormData();
    formData.append("prompt", text);
    formData.append(
      "input",
      document.getElementById("Input__Image").files[0] || null
    );
    formData.append("mask", file || null);

    setLoading(true);

    axios
      .post(API + "/work", formData, {
        headers: {
          "Contest-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        axios
          .get(API + "/work/" + response.data.id, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            console.log(response);
            setResult(true);
            setResultInfo(response.data.work);
          })
          .catch((err) => console.log(err))
          .then(() => setLoading(false));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSelectImage = () => {
    fileInputRef.current.click();
  };

  const downloadImage = () => {
    let image = new window.Image();
    image.setAttribute("crossOrigin", "anonymous");

    image.onload = function () {
      let canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      let context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);

      let link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "My_image.png";
      link.click();
    };

    image.src = resultInfo.output_url;
  };

  const deleteHandler = () => {
    axios
      .delete(API + "/work/delete/" + resultInfo.work_id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        setResult(false);
        setText("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (result) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <img
          src={resultInfo.output_url}
          alt="result"
          style={{ width: "40%" }}
        />
        <StyledLocal>
          <StyledTitle
            onClick={() => {
              setResult(false);
              setText("");
            }}
          >
            새로운 이미지
          </StyledTitle>
          <StyledButtonGroup>
            <StyledButton>
              <BsTrash3 onClick={deleteHandler} />
            </StyledButton>
            <StyledButton>
              <LuDownload onClick={downloadImage} />
            </StyledButton>
          </StyledButtonGroup>
        </StyledLocal>
      </div>
    );
  } else {
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
        <input
          id="Input__Image"
          type="file"
          onChange={handleImageChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "20px",
            width: "890px",
          }}
        >
          <button
            type="button"
            onClick={handleSelectImage}
            style={{
              width: "180px",
              height: "50px",
              borderRadius: "40px",
              backgroundColor: "#654BFF",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              fontFamily: "AppleSDGothicNeoB",
              padding: "5px",
              textAlign: "center",
            }}
          >
            이미지 선택
          </button>
          <div style={{ position: "relative", width: "480px" }}>
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder="    원하는 컨셉을 입력하세요."
              style={{
                width: "98%",
                height: "40px",
                borderRadius: "40px",
                paddingLeft: "10px",
                border: "none",
                outline: "none",
                padding: "5px",
                fontSize: "18px",
                fontFamily: "AppleSDGothicNeoB",
              }}
            />
          </div>
          <button
            onClick={handleSubmit}
            style={{
              width: "180px",
              height: "50px",
              borderRadius: "40px",
              backgroundColor: "#654BFF",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              fontFamily: "AppleSDGothicNeoB",
              padding: "5px",
              textAlign: "center",
            }}
          >
            선택 완료
          </button>
        </div>
        {loading && <Loading />}
        <div
          style={{
            width: "800px",
            height: "800px",
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
            width={1024}
            height={1024}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={stageRef}
          >
            <Layer>
              <Rect
                width={1024}
                height={1024}
                fill="rgba(0,0,0,0)"
                stroke="black"
              />

              {image && (
                <Image
                  id="modify__Image"
                  ref={imageRef}
                  draggable={false}
                  width={imageSize.width}
                  height={imageSize.height}
                  x={(1024 - imageSize.width) / 2} // image X position for center
                  y={(1024 - imageSize.height) / 2} // image Y position for center
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
                  globalCompositeOperation="destination-out"
                  listening={false}
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
};

export default DrawingEditor;
