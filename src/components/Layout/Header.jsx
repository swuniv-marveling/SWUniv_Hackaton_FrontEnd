import React from "react";
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
`;

const StyledButton = styled.div`
  cursor: pointer;
  font-size: 24px;
`;

function Header() {
  return (
    <StyledHeader>
      <StyledLogo>Loca</StyledLogo>
      <StyledButton>LOGIN</StyledButton>
    </StyledHeader>
  );
}

export default Header;
