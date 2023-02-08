import styled from "styled-components";

import useCanvasDrawing from "../hooks/use-canvas-drawing";
import useCanvas from "../hooks/use-canvas";

import pencilIcon from "src/asset/icon/pencil-icon.png";

const MouseDrawingPage = () => {
  const { canvasRef, fallbackMessage, canvasContext } = useCanvas();
  const { handleDrawing, handleDrawingStart, handleDrawingFinsih } =
    useCanvasDrawing(canvasContext);

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={handleDrawingStart}
        onMouseUp={handleDrawingFinsih}
        onMouseLeave={handleDrawingFinsih}
        onMouseMove={handleDrawing}
      >
        {fallbackMessage}
      </canvas>

      <IconButtonContainer>
        <IconButton>
          <img
            src={pencilIcon}
            alt="pencilIcon"
            style={{ width: "40px", height: "40px" }}
          />
        </IconButton>
      </IconButtonContainer>
    </>
  );
};

export default MouseDrawingPage;

const IconButtonContainer = styled.div`
  width: 100%;
  padding: 20px 0px;
`;

const IconButton = styled.button`
  all: unset;
  background-color: var(--primary);
  color: var(--secondary);
  padding: 10px 10px;
  border-radius: 10px;
  cursor: pointer;
`;
