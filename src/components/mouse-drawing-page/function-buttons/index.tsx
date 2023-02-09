import type { EditMode } from "src/types/mouse-drawing-page";
import styled from "styled-components";

import { ReactComponent as PencilIcon } from "src/asset/icon/pencil-icon.svg";
import { ReactComponent as EraserIcon } from "src/asset/icon/eraser-icon.svg";

interface FunctionButtonsProps {
  editMode: EditMode;
  onClick: (mode: EditMode) => void;
}

const FunctionButtons = ({ editMode, onClick }: FunctionButtonsProps) => {
  return (
    <ButtonContainer>
      <IconButton
        isClicked={editMode === "draw"}
        onClick={() => onClick("draw")}
      >
        <PencilIcon fill="var(--secondary)" width={40} height={40} />
      </IconButton>

      <IconButton
        isClicked={editMode === "erase"}
        onClick={() => onClick("erase")}
      >
        <EraserIcon fill="var(--secondary)" width={40} height={40} />
      </IconButton>
    </ButtonContainer>
  );
};

export default FunctionButtons;

const ButtonContainer = styled.div`
  display: flex;
  gap: 13px;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 0px;
`;

const IconButton = styled.button<{ isClicked: boolean }>`
  all: unset;
  background-color: var(--primary);
  color: var(--secondary);
  padding: 10px 10px;
  border-radius: 10px;
  box-shadow: ${(props) => (props.isClicked ? "none" : "var(--boxShadow)")};
  cursor: pointer;
  :active {
    box-shadow: inset var(--boxShadow);
  }
`;
