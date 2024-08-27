import React, { ReactNode, useEffect } from "react";

type Firefly = {
  move: () => void;
  show: () => void;
  x: number;
  y: number;
};

function createFirefly(w: number, h: number, c: CanvasRenderingContext2D): Firefly {
  let x = Math.random() * w;
  let y = Math.random() * h;
  const s = Math.random() * 2;
  let ang = Math.random() * 2 * Math.PI;
  const v = s * s / 4;

  function move() {
    x += v * Math.cos(ang);
    y += v * Math.sin(ang);
    ang += Math.random() * 20 * Math.PI / 180 - 10 * Math.PI / 180;
  }

  function show() {
    c.beginPath();
    c.arc(x, y, s, 0, 2 * Math.PI);
    c.fillStyle = "#fddba3";
    c.fill();
  }

  return {
    move,
    show,
    x,
    y
  };
}

export const FireflyNightBg = ({
  children,
  id,
  style = {},
  count = 100,
  width,
  height
}: {
  children: ReactNode;
  style?: React.CSSProperties;
  id: string;
  count?: number;
  width?: number;
  height?: number;
}) => {
  useEffect(() => {
    const canvas = document.getElementById(`firefly-canvas-${id}`) as HTMLCanvasElement;
    if (!canvas) return;

    const c = canvas.getContext("2d");
    if (!c) return;

    let w = width || (canvas.width = window.innerWidth);
    let h = height ||(canvas.height = window.innerHeight);

    const fireflies: Firefly[] = [];

    function draw() {
      if (!c) return;
      if (fireflies.length < count) {
        for (let j = 0; j < 10; j++) {
          fireflies.push(createFirefly(w, h, c));
        }
      }
      for (let i = 0; i < fireflies.length; i++) {
        if (!fireflies[i]) {
          continue;
        } else if (fireflies[i]) {
          fireflies[i]!.move();
          fireflies[i]!.show();
          if ((fireflies[i]!.x || 0) < 0 || (fireflies[i]!.x || 0) > w || (fireflies[i]!.y || 0) < 0 || (fireflies[i]!.y || 0) > h) {
            fireflies.splice(i, 1);
          }
        }
      }
    }

    function initCanvas() {
      if (!c) return;
      c.fillStyle = "rgba(30,30,30,1)";
      c.fillRect(0, 0, w, h);
    }

    function loop() {
      if (!c) return;
      c.clearRect(0, 0, w, h);
      draw();
      window.requestAnimationFrame(loop);
    }

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initCanvas();
    }

    window.addEventListener("resize", resize);

    // Initial canvas setup and loop start
    initCanvas();
    loop();

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          background: "transparent",
          ...style,
        }}
      >
        <canvas id={`firefly-canvas-${id}`} style={{
          width: width || "100%",
          height: height || "100%",
        }}></canvas>
      </div>
      {children}
    </div>
  );
};

export default FireflyNightBg;
