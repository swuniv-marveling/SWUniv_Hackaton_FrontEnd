// 출처 : https://yumyumlog.tistory.com/251
// 출처를 바탕으로 일부 수정했습니다.

import styled, { keyframes } from "styled-components";

const rotation = keyframes`
    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }

`;

const Loading = styled.div`
  height: 50px;
  width: 50px;
  border: 3px solid #654bff;
  border-radius: 50%;
  border-top: none;
  border-right: none;
  margin: 16px auto;
  animation: ${rotation} 1s linear infinite;
`;

export { Loading };
