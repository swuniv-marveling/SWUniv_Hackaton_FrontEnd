import React from "react";
import { useNavigate } from "react-router";
import { styled } from "styled-components";

const StyledContents = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const StyledTitle = styled.div`
  font-size: 64px;
  margin-top: 50px;
  z-index: 20;
`;
const StyledExplain = styled.div`
  font-size: 24px;
`;
const StyledButton = styled.button`
  border: 0;
  outline: 0;
  background-color: #f9fbfd;
  color: #000011;
  border-radius: 9999px;
  text-align: center;
  margin-top: 20px;
  width: 259px;
  height: 52px;
  font-size: 17px;
  cursor: pointer;
`;

function Contents() {
  const navigation = useNavigate();

  return (
    <StyledContents>
      <StyledTitle className="font-bold">
        외국에서 찍은 사진을
        <br />
        우리나라 느낌으로 바꿔보세요
      </StyledTitle>
      <StyledExplain>
        사진을 업로드한 후 선택 영역을 지정하여
        <br />
        나만의 새로운 이미지로!
      </StyledExplain>
      <StyledButton
        className="font-bold"
        onClick={() => navigation("/user/imageselect")}
      >{`이미지 업로드 >>`}</StyledButton>
    </StyledContents>
  );
}

export default Contents;
