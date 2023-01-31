import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";

const Main = () => {
  return (
    <Container>
      <NavBar>
        <Button to="mouse-drawing">마우스 드로잉</Button>
      </NavBar>

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
  width: 100%;
  height: 100%;
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 50px;
  min-height: 60px;
`;

const CanvasContainer = styled.div`
  flex: 1;
  border: thick double #07553b;
`;

const Button = styled(Link)`
  all: unset;
  background-color: #ced46a;
  border-radius: 10px;
  padding: 10px 30px;
  cursor: pointer;
`;
