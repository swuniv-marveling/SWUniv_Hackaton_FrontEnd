import React from "react";
import { styled } from "styled-components";
import { LuDownload } from "react-icons/lu";

const StyledTab = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  transform: translateX(0px);
  box-shadow: -8px 0px 5px -2px rgb(71, 71, 105),
    -8px 0px 5px -2px rgb(71, 71, 105);
  width: 50vw;
  height: 100vh;
  z-index: 5;
  overflow-y: scroll;
`;

const StyledContent = styled.div`
  margin: 0 30px;
`;

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 120px;
  margin-bottom: 10px;
`;

const StyledWidth50 = styled.div`
  width: 50%;
`;

function Tab(props) {
  const downloadImage = () => {
    var image = new Image();
    image.setAttribute("crossOrigin", "anonymous");

    image.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      var context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);

      var link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "Other_image.png";
      link.click();
    };

    image.src = props.detailInfo.output_url;
  };

  if (props.showTab)
    return (
      <StyledTab>
        <StyledContent>
          <StyledLocal>
            <StyledTitle>새로운 이미지</StyledTitle>
            <StyledButtonGroup>
              <StyledButton onClick={downloadImage}>
                <LuDownload />
              </StyledButton>
            </StyledButtonGroup>
          </StyledLocal>
          <img
            style={{
              width: "70%",
              alignItems: "center",
              display: "block",
              margin: "auto",
            }}
            src={props.detailInfo.output_url}
            alt="local_Image"
          />
          <StyledLocal style={{ margin: "50px 0", gap: "2rem" }}>
            <StyledWidth50>
              <StyledTitle>원본 이미지</StyledTitle>
              <img
                style={{ width: "100%" }}
                src={props.detailInfo.input_url}
                alt="basic_Image"
              />
            </StyledWidth50>
            <StyledWidth50>
              <StyledTitle>프롬프트</StyledTitle>
              <span style={{ fontSize: "20px" }}>
                {props.detailInfo.prompt_text}
              </span>
            </StyledWidth50>
          </StyledLocal>
        </StyledContent>
      </StyledTab>
    );
}

export default Tab;
