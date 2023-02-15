import styled from "styled-components";

import useCanvas from "src/hooks/use-canvas";
import useCanvasRaining from "src/hooks/use-canvas-raining";

const RainEffectPage = () => {
  const { canvasRef, fallbackMessage, canvasContext } = useCanvas();
  useCanvasRaining(canvasContext, canvasRef.current);

  return (
    <Container>
      <canvas ref={canvasRef}>{fallbackMessage}</canvas>
    </Container>
  );
};

export default RainEffectPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 9px;
  background-color: #061928;
  overflow: hidden;
`;
