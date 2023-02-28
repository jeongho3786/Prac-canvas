import { useEffect } from "react";
import useCanvas from "src/hooks/use-canvas";

// 이런저런 canvas api 테스트 하는 곳
const TestPage = () => {
  const { canvasRef, fallbackMessage, canvasContext, canvasSize } = useCanvas();

  useEffect(() => {
    if (!canvasContext) return;

    canvasContext.beginPath();
    canvasContext.moveTo(200, 100);
    canvasContext.quadraticCurveTo(0, 200, 200, 300);
    canvasContext.stroke();
  }, [canvasContext, canvasSize]);

  return <canvas ref={canvasRef}>{fallbackMessage}</canvas>;
};

export default TestPage;

/**
 * quadraticCurveTo(controlPointX, controlPointY, x, y)의 경우
 * controlPoint는 시작점과 끝점에서 보여주고자 하는 커브 곡선의 중간 점이다.
 */
