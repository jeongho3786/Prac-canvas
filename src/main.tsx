import styled from "styled-components";
import { Outlet } from "react-router-dom";

import MenuButtons from "src/components/common/menu-buttons";

const Main = () => {
  return (
    <Container>
      <MenuButtons />

      <CanvasContainer>
        <Outlet />
      </CanvasContainer>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #ffeeeb;
`;

const CanvasContainer = styled.div`
  border: solid var(--secondary);
  border-radius: 10px;
  background-color: #ffffff;
  width: 500px;
  height: 500px;
`;
