import React from "react";
import { styled } from "styled-components";
import { LuDownload } from "react-icons/lu";
import { BsTrash3 } from "react-icons/bs";

const StyledTab = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  transform: translateX(0px);
  box-shadow: -8px 0px 5px -2px rgb(71, 71, 105),
    -8px 0px 5px -2px rgb(71, 71, 105);
  width: 50vw;
  height: 100vh;
  z-index: 20;
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
  if (props.showTab)
    return (
      <StyledTab>
        <StyledContent>
          <StyledLocal>
            <StyledTitle>현지화 이미지</StyledTitle>
            <StyledButtonGroup>
              <StyledButton>
                <BsTrash3 />
              </StyledButton>
              <StyledButton>
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
            src="https://assets.community.lomography.com/89/20d68ad867732cbd6e18c0e9faec7e511b4385/576x576x2.jpg?auth=44c7207f9e9ba6944c9e9fdb0bf284865d718ae9"
            alt="local_Image"
          />
          <StyledLocal style={{ margin: "50px 0", gap: "2rem" }}>
            <StyledWidth50>
              <StyledTitle>원본 이미지</StyledTitle>
              <img
                style={{ width: "100%" }}
                src="https://assets.community.lomography.com/89/20d68ad867732cbd6e18c0e9faec7e511b4385/576x576x2.jpg?auth=44c7207f9e9ba6944c9e9fdb0bf284865d718ae9"
                alt="basic_Image"
              />
            </StyledWidth50>
            <StyledWidth50>
              <StyledTitle>프롬프트</StyledTitle>
              <span style={{ fontSize: "20px" }}>Missing claim: sub</span>
            </StyledWidth50>
          </StyledLocal>
        </StyledContent>
      </StyledTab>
    );
}

export default Tab;
