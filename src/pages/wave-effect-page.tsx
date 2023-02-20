import styled from "styled-components";

import useCanvas from "src/hooks/use-canvas";
import useCanvasWave from "src/hooks/use-canvas-wave";

const WaveEffectPage = () => {
  const { canvasRef, fallbackMessage, canvasContext } = useCanvas();
  useCanvasWave(canvasContext, canvasRef.current, 3);

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
