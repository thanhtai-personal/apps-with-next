import { useEffect, useState } from "react";
import "./smoke.style.css"

export interface ISmoke2Props {
  id: string;
  wind?: number;
  blur?: number;
  style?: React.CSSProperties;
  src?: string;
  config?: any;
}

export const Smoke2 = ({
  id,
  src,
  style = {},
  config = {}
}: ISmoke2Props) => {

  useEffect(() => {
    if (!id) return () => { }

    var smoke = new Image();
    smoke.src = src || "https://s3-us-west-2.amazonaws.com/s.cdpn.io/15388/smoke.png";

    function emitter(el: HTMLCanvasElement, opts: any) {
      var particles: any[] = [];
      var canvas = el.getContext("2d")!;

      canvas.canvas.width = el.clientWidth;
      canvas.canvas.height = el.clientHeight;

      function particle(this: any) {
        var x, y, size, speedX, speedY, opacity;
        reset();

        this.update = () => {
          if (opacity > 0) {
            opacity -= Math.random() / opts.speed.fade;
          }

          if (opacity <= 0) {
            reset();
          }

          speedX -= Math.random() / opts.speed.acceleration;
          speedY -= Math.random() / opts.speed.acceleration;
          x += speedX;
          y += speedY;
          size += Math.random();
          drawParticle(x, y, size, opacity);
        };

        function drawParticle(x, y, size, opacity) {
          canvas.globalAlpha = opacity;
          canvas.drawImage(smoke, 0, 0, opts.size, opts.size, x, y, size, size);
        }

        function reset() {
          x = opts.x;
          y = opts.y;
          size = opts.size;
          speedX = Math.random() * opts.speed.x;
          speedY = Math.random() * opts.speed.y;
          opacity = Math.random();
        }
      };

      for (var c = 0; c < opts.particles; c++) {
        particles.push(new particle());
      }

      function render() {
        canvas.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
        particles.forEach(function (particle) {
          particle.update();
        });
        window.requestAnimationFrame(render);
      }

      return { render: render };
    }

    const canvasElement = document.getElementById(`smoke-2-${id}`) as HTMLCanvasElement;
    if (canvasElement) {
      emitter(canvasElement, {
        x: config.x || 1000,
        y: config.y || 0,
        size: config.size || 70,
        particles: config.particles || 100,
        speed: config.speed || {
          x: -2,
          y: 2.5,
          fade: 150,
          acceleration: 200
        }
      }).render();
    }

  }, [id, src, config])

  return (
    <canvas id={`smoke-2-${id}`} style={{ ...style }}>

    </canvas>
  )
}