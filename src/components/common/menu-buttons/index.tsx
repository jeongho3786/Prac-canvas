import styled from "styled-components";
import { NavLink } from "react-router-dom";

const MenuButtons = () => {
  return (
    <ButtonContainer>
      <RouteButton to="mouse-drawing">마우스 드로잉</RouteButton>
      <RouteButton to="rain-effect">비 효과</RouteButton>
      <RouteButton to="wave-effect">물결 효과</RouteButton>
      <RouteButton to="test">테스트 화면</RouteButton>
    </ButtonContainer>
  );
};

export default MenuButtons;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 0px 50px;
  height: 80px;
`;

const RouteButton = styled(NavLink)`
  all: unset;
  background-color: var(--primary);
  color: var(--secondary);
  padding: 15px 30px;
  border-radius: 10px;
  box-shadow: var(--boxShadow);
  cursor: pointer;
  &.active {
    box-shadow: none;
  }
  :active {
    box-shadow: inset var(--boxShadow);
  }
`;
