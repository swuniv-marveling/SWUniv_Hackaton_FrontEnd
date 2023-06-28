import React from "react";
import { styled } from "styled-components";

const StyledContents = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const StyledTitle = styled.div`
  font-size: 64px;
  font-weight: bold;
  margin-top: 50px;
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
  font-weight: bold;
  font-size: 17px;
  cursor: pointer;
`;

function Contents() {
  return (
    <StyledContents>
      <StyledTitle>간편한 콘텐츠 현지화</StyledTitle>
      <StyledExplain>
        사진을 업로드하시면 뭐 어쩌구를 통해
        <br />
        현지화를 만들어 새로운 이미지로!
      </StyledExplain>
      <StyledButton>{`이미지 업로드 >>`}</StyledButton>
    </StyledContents>
  );
}

export default Contents;
