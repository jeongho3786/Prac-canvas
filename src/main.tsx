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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 50px;
  height: 80px;
`;

const CanvasContainer = styled.div`
  border: solid var(--secondary);
  border-radius: 10px;
  background-color: #ffffff;
  width: 500px;
  height: 500px;
`;

const Button = styled(Link)`
  all: unset;
  background-color: var(--primary);
  color: var(--secondary);
  padding: 15px 30px;
  border-radius: 10px;
  cursor: pointer;
`;
