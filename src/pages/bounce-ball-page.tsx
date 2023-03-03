import { Container } from "src/components/common/style";
import useCanvas from "src/hooks/use-canvas";
import useCanvasBouncing from "src/hooks/use-canvas-bouncing";

const BounceBallPage = () => {
  const { canvasRef, fallbackMessage, canvasContext, canvasSize } = useCanvas();
  useCanvasBouncing({ canvasContext, canvasSize });

  return (
    <Container style={{ backgroundColor: "#161e38" }}>
      <canvas ref={canvasRef}>{fallbackMessage}</canvas>
    </Container>
  );
};

export default BounceBallPage;
