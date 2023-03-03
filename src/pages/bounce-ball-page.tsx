import { useEffect } from "react";
import { Container } from "src/components/common/style";
import useCanvas from "src/hooks/use-canvas";

const BounceBallPage = () => {
  const { canvasRef, fallbackMessage, canvasContext, canvasSize } = useCanvas();

  useEffect(() => {
    if (!canvasContext) return;

    let animationframeId: number;

    const canvasWidth = canvasSize.width;
    const canvasHeight = canvasSize.height;

    // ball 초기 상태
    const radius = 30;
    const diameter = radius * 2;
    const speed = 10;
    // 지름 보다는 크고 전체 사이즈보다는 작은 값으로 랜덤 위치 선정
    let positionX = diameter + (Math.random() * canvasWidth - diameter);
    let positionY = diameter + (Math.random() * canvasHeight - diameter);
    let accelerationX = speed;
    let accelerationY = speed;

    // 장애물 상태
    const boxWidth = 200;
    const boxHeight = 20;
    const boxPositionX = 100;
    const boxPositionY = 200;

    // 장애물 그림자
    const shadowPointX = 50;
    const shadowPointY = 40;

    const bounceWindow = () => {
      // 전체 너비 및 높이에서 반지름을 뺀 값을 최대치로 잡고 최소치는 반지름으로 잡는다.
      const minX = radius;
      const minY = radius;

      const maxX = canvasWidth - radius;
      const maxY = canvasHeight - radius;

      if (positionX <= minX || positionX >= maxX) {
        accelerationX *= -1;
        positionX += accelerationX;
      } else if (positionY <= minY || positionY >= maxY) {
        accelerationY *= -1;
        positionY += accelerationY;
      }
    };

    const bounceBlock = () => {
      const minContactX = boxPositionX - radius;
      const maxContactX = boxPositionX + boxWidth + radius;
      const minContactY = boxPositionY - radius;
      const maxContactY = boxPositionY + boxHeight + radius;

      if (
        positionX > minContactX &&
        positionX < maxContactX &&
        positionY > minContactY &&
        positionY < maxContactY
      ) {
        const candidateX1 = Math.abs(minContactX - positionX);
        const candidateX2 = Math.abs(maxContactX - positionX);
        const candidateY1 = Math.abs(minContactY - positionY);
        const candidateY2 = Math.abs(maxContactY - positionY);

        const candidateMin1 = Math.min(candidateX1, candidateX2);
        const candidateMin2 = Math.min(candidateY1, candidateY2);

        const resultMin = Math.min(candidateMin1, candidateMin2);

        if (resultMin === candidateMin1) {
          accelerationX *= -1;
          positionX += accelerationX;
        } else if (resultMin === candidateMin2) {
          accelerationY *= -1;
          positionY += accelerationY;
        }
      }
    };

    const movePath = () => {
      positionX += accelerationX;
      positionY += accelerationY;

      bounceWindow();
      bounceBlock();
    };

    const draw = () => {
      // 초기화
      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

      // 중간 장애물 그리기
      canvasContext.fillStyle = "#ff384e";
      canvasContext.fillRect(boxPositionX, boxPositionY, boxWidth, boxHeight);

      // 장애물 그림자 그리기
      canvasContext.fillStyle = "#190f3a";
      canvasContext.beginPath();
      canvasContext.moveTo(boxWidth + boxPositionX, boxHeight + boxPositionY);
      canvasContext.lineTo(
        boxWidth + boxPositionX - shadowPointX,
        boxHeight + boxPositionY + shadowPointY
      );
      canvasContext.lineTo(
        boxPositionX - shadowPointX,
        boxHeight + boxPositionY + shadowPointY
      );
      canvasContext.lineTo(boxPositionX, boxHeight + boxPositionY);
      canvasContext.fill();

      // 장애물 사이드
      canvasContext.fillStyle = "#9d0919";
      canvasContext.beginPath();
      canvasContext.moveTo(
        boxPositionX - shadowPointX,
        boxHeight + boxPositionY + shadowPointY
      );
      canvasContext.lineTo(
        boxPositionX - shadowPointX,
        boxPositionY + shadowPointY
      );
      canvasContext.lineTo(boxPositionX, boxPositionY);
      canvasContext.lineTo(boxPositionX, boxHeight + boxPositionY);
      canvasContext.fill();

      // 공 그리기
      canvasContext.fillStyle = "#fdd700";
      canvasContext.beginPath();
      canvasContext.arc(positionX, positionY, radius, 0, Math.PI * 2);
      canvasContext.fill();

      movePath();

      animationframeId = window.requestAnimationFrame(draw);
    };

    animationframeId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationframeId);
    };
  }, [canvasSize, canvasContext]);

  return (
    <Container style={{ backgroundColor: "#161e38" }}>
      <canvas ref={canvasRef}>{fallbackMessage}</canvas>
    </Container>
  );
};

export default BounceBallPage;
