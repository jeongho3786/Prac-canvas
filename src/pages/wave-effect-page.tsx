import useCanvas from "src/hooks/use-canvas";
import useCanvasWave from "src/hooks/use-canvas-wave";

import { Container } from "src/components/common/style";

const WaveEffectPage = () => {
  const { canvasRef, fallbackMessage, canvasContext, canvasSize } = useCanvas();
  useCanvasWave({
    canvasContext,
    waveNumber: 3,
    canvasSize,
  });

  return (
    <Container>
      <canvas ref={canvasRef}>{fallbackMessage}</canvas>
    </Container>
  );
};

export default WaveEffectPage;
