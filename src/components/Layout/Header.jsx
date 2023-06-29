import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px 0;
  top: 0;
`;

const StyledLogo = styled.div`
  font-size: 30px;
  cursor: pointer;
  z-index: 10;
`;

const StyledButton = styled.div`
  cursor: pointer;
  font-size: 24px;
  z-index: 10;
`;

const StyledButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
`;

function Header() {
  const navigation = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  return (
    <StyledHeader>
      <StyledLogo onClick={() => navigation("/")}>Loca</StyledLogo>
      {!(location.pathname === "/login" || location.pathname === "/signup") && (
        <StyledButtonGroup>
          <StyledButton onClick={() => navigation("/every")}>
            사진첩
          </StyledButton>
          {location.pathname === "/gallery" ? (
            <></>
          ) : !user.access_token ? (
            <StyledButton onClick={() => navigation("/login")}>
              LOGIN
            </StyledButton>
          ) : (
            <StyledButton onClick={() => navigation("/gallery")}>
              MY
            </StyledButton>
          )}
        </StyledButtonGroup>
      )}
    </StyledHeader>
  );
}

export default Header;
