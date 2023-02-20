import styled from "styled-components";

import useCanvas from "src/hooks/use-canvas";
import useCanvasWave from "src/hooks/use-canvas-wave";

const WaveEffectPage = () => {
  const { canvasRef, fallbackMessage, canvasContext } = useCanvas();
  useCanvasWave(canvasContext, canvasRef.current);

  return (
    <Container>
      <canvas ref={canvasRef}>{fallbackMessage}</canvas>
    </Container>
  );
};

export default WaveEffectPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 9px;
  overflow: hidden;
`;

// rgba(0, 199, 235, 0.4), rgba(0, 146, 199, 0.4), rgba(0, 87, 158, 0.4);
