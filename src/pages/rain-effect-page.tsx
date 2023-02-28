import useCanvas from "src/hooks/use-canvas";
import useCanvasRaining from "src/hooks/use-canvas-raining";

import { Container } from "src/components/common/style";

const RainEffectPage = () => {
  const { canvasRef, fallbackMessage, canvasContext, canvasSize } = useCanvas();
  useCanvasRaining({ canvasContext, canvasSize });

  return (
    <Container style={{ backgroundColor: "#061928" }}>
      <canvas ref={canvasRef}>{fallbackMessage}</canvas>
    </Container>
  );
};

export default RainEffectPage;
