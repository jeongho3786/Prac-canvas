import styled from "styled-components";

import useCanvas from "src/hooks/use-canvas";
import { useEffect } from "react";

const RainEffectPage = () => {
  const { canvasRef, fallbackMessage, canvasContext } = useCanvas();

  useEffect(() => {
    if (!canvasContext) return;
    if (!canvasRef.current) return;

    const w = canvasRef.current.width;
    const h = canvasRef.current.height;

    // 비 모양
    canvasContext.strokeStyle = "rgba(174,194,224)";
    canvasContext.lineWidth = 1;
    canvasContext.lineCap = "round";

    // 비 갯수..?
    const init = [];
    const maxParts = 200;

    for (let a = 0; a < maxParts; a++) {
      init.push({
        // 랜덤 x 시작좌표
        x: Math.random() * w,

        // 랜덤 y 시작좌표
        y: Math.random() * h,

        // 랜덤 빗줄기 길이 베이스
        l: Math.random(),

        // 랜덤 빗줄기 기울기
        xs: -4 + Math.random() * 4 + 2,

        // 랜덤 가속도
        ys: Math.random() * 10 + 10,
      });
    }

    const particles: any = [];

    for (let b = 0; b < maxParts; b++) {
      particles[b] = init[b];
    }

    const draw = () => {
      // 다 움직인 빗줄기 삭제
      canvasContext.clearRect(0, 0, w, h);

      for (let c = 0; c < particles.length; c++) {
        const p = particles[c];

        console.log("x, y, l, xs, ys 각각 좌표", p.x, p.y, p.l, p.xs, p.ys);

        canvasContext.beginPath();
        canvasContext.moveTo(p.x, p.y);
        canvasContext.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
        canvasContext.stroke();
      }

      move();
    };

    function move() {
      for (let d = 0; d < particles.length; d++) {
        const p = particles[d];

        p.x += p.xs;
        p.y += p.ys;

        // 화면 끝까지 빗줄기가 갔을 때
        if (p.x > w || p.y > h) {
          p.x = Math.random() * w;
          p.y = -20;
        }
      }
    }

    let key = setInterval(draw, 30);

    return () => {
      clearInterval(key);
    };
  }, [canvasContext, canvasRef]);

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
