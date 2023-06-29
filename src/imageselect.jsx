import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Stage, Layer, Rect, Image, Line } from "react-konva";
import EnterImage from "./assets/images/Enter.png";
import { __asyncLogin } from "./redux/modules/userSlice";
import axios from "axios";
import { API } from "./global/Constants";

const DrawingEditor = () => {
  const [image, setImage] = useState(null);
  const [lines, setLines] = useState([]);
  const [text, setText] = useState("");
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [workList, setWorkList] = useState([]);
  const isDrawing = useRef(false);
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const fileInputRef = useRef(null);
  const [inputImage, setInputImage] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.access_token);
  const [line_color, setLine_color] = useState("white");

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

  const handleTextSave = async () => {
    const textToSend = text;

    try {
      const response = await axios.post(
        API + "/work",
        { prompt: textToSend },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setWorkList(response.data.work_list);

      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  async function handleSubmit() {
    setLine_color("rgba(0,0,0,0)");
    // return;
    // Convert stage (drawing + image) to data URL
    const dataUrl = stageRef.current.toDataURL();
    console.log(dataUrl);
    // return;
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

    console.log(inputImage);
    console.log(URL.createObjectURL(blob));

    const formData = new FormData();
    formData.append("prompt", text);
    formData.append(
      "input",
      document.getElementById("Input__Image").files[0] || null
    );
    formData.append("mask", file || null);

    for (const a of formData.values()) {
      console.log(a);
    }

    // console.log(document.getElementById("Input__Image").files[0]);
    // console.log(file);

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
            // setWorkList(response.data.work_list);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSelectImage = () => {
    fileInputRef.current.click();
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
              fill="rgba(71,71,105,1)"
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
                stroke={line_color}
                strokeWidth={30}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation="source-over"
                listening={false}
              />
            ))}
          </Layer>
        </Stage>
      </div>

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
            placeholder="   원하는 결과를 입력하세요. "
            style={{
              width: "96%",
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
          {image && (
            <button
              onClick={handleTextSave}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                width: "40px",
                height: "40px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              <img
                src={EnterImage}
                alt="Save"
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "40px",
                }}
              />
            </button>
          )}
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
    </div>
  );
};

export default DrawingEditor;
