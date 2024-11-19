import { useEffect } from "react";
import "./fire.style.css"

export const Fire = ({
  id, style = {}
}: {
  id: string;
  style: React.CSSProperties;
}) => {

  useEffect(() => {
    if (!id) return () => {};
    const WASM_PAGE_SIZE = 65536;

    const main = () => {
      const my_memory = new Uint8Array(5 * WASM_PAGE_SIZE);
      const initialData = new Uint8Array(
        `07 07 07 FF 1F 07 07 FF 2F 0F 07 FF 47 0F 07 FF 57 17 07 FF 67 1F 07 FF 77 1F 07 FF 8F 27 07 FF 9F 2F 07 FF AF 3F 07 FF BF 47 07 FF C7 47 07 FF DF 4F 07 FF DF 57 07 FF DF 57 07 FF D7 5F 07 FF D7 5F 07 FF D7 67 0F FF CF 6F 0F FF CF 77 0F FF CF 7F 0F FF CF 87 17 FF C7 87 17 FF C7 8F 17 FF C7 97 1F FF BF 9F 1F FF BF 9F 1F FF BF A7 27 FF BF A7 27 FF BF AF 2F FF B7 AF 2F FF B7 B7 2F FF B7 B7 37 FF CF CF 6F FF DF DF 9F FF EF EF C7 FF FF FF FF FF`
          .split(" ")
          .map((x) => parseInt(x, 16))
      );
      my_memory.set(initialData, 268800);

      const instance_exports_setup = () => {
        const stack: number[] = [];
        let i = 0;

        stack.push(320);
        i = stack.pop() ?? 0;
        while (true) {
          stack.push(i);
          stack.push(36);
          const v1 = stack.pop() ?? 0;
          my_memory[53439 + (stack.pop() ?? 0)] = v1;
          stack.push(i);
          stack.push(1);
          {
            const x2 = stack.pop() ?? 0;
            stack.push((stack.pop() ?? 0) - x2);
          }
          i = stack[stack.length - 1] ?? 0;
          if ((stack.pop() ?? 0) !== 0) {
            continue;
          }
          break;
        }
      };

      const instance_exports_run = () => {
        const stack: number[] = [];
        let i = 0;
        let pixel = 0;
        let randIdx = 0;

        while (true) {
          while (true) {
            stack.push(i);
            stack.push(320);
            stack.push((stack.pop() ?? 0) + (stack.pop() ?? 0));
            i = stack[stack.length - 1] ?? 0;
            stack.push(my_memory[stack.pop() ?? 0] ?? 0);
            pixel = stack[stack.length - 1] ?? 0;

            if (stack.pop()) {
              stack.push(Math.random());
              stack.push(3);
              stack.push((stack.pop() ?? 0) * (stack.pop() ?? 0));
              stack.push(Math.round(stack.pop() ?? 0));
              stack.push(Math.trunc(stack.pop() ?? 0));
              stack.push(3);
              stack.push((stack.pop() ?? 0) & (stack.pop() ?? 0));
              randIdx = stack.pop() ?? 0;

              stack.push(i);
              stack.push(randIdx);
              const xx2 = stack.pop() ?? 0;
              stack.push((stack.pop() ?? 0) - xx2);
              stack.push(319);
              const x2 = stack.pop() ?? 0;
              stack.push((stack.pop() ?? 0) - x2);

              stack.push(pixel);
              stack.push(randIdx);
              stack.push(1);
              stack.push((stack.pop() ?? 0) & (stack.pop() ?? 0));
              const xxx2 = stack.pop() ?? 0;
              stack.push((stack.pop() ?? 0) - xxx2);

              const v1 = stack.pop() ?? 0;
              my_memory[stack.pop() ?? 0] = v1;
            } else {
              stack.push(i);
              stack.push(320);
              const x2 = stack.pop() ?? 0;
              stack.push((stack.pop() ?? 0) - x2);
              stack.push(0);
              const v1 = stack.pop() ?? 0;
              my_memory[stack.pop() ?? 0] = v1;
            }
            stack.push(i);
            stack.push(53440);
            const x2 = stack.pop() ?? 0;
            stack.push((stack.pop() ?? 0) < x2 ? 1 : 0);

            if ((stack.pop() ?? 0) !== 0) {
              continue;
            }
            break;
          }
          stack.push(i);
          stack.push(53439);
          const x2 = stack.pop() ?? 0;
          stack.push((stack.pop() ?? 0) - x2);
          i = stack[stack.length - 1] ?? 0;
          stack.push(320);
          stack.push((stack.pop() ?? 0) !== (stack.pop() ?? 0) ? 1 : 0);

          if ((stack.pop() ?? 0) !== 0) {
            continue;
          }
          break;
        }
        stack.push(53760);
        i = stack.pop() ?? 0;
        while (true) {
          stack.push(i);
          stack.push(1);
          const x2 = stack.pop() ?? 0;
          stack.push((stack.pop() ?? 0) - x2);
          i = stack.pop() ?? 0;

          stack.push(i);
          stack.push(2);
          const x1 = stack.pop() ?? 0;
          stack.push((stack.pop() ?? 0) << x1);

          {
            stack.push(i);
            stack.push(my_memory[stack.pop() ?? 0] ?? 0);
            stack.push(2);
            const x1 = stack.pop() ?? 0;
            stack.push((stack.pop() ?? 0) << x1);
          }
          stack.push(
            new DataView(my_memory.buffer, 268800 + (stack.pop() ?? 0), 4).getInt32(
              0,
              true
            )
          );

          {
            const v1 = stack.pop() ?? 0;
            new DataView(my_memory.buffer, 53760 + (stack.pop() ?? 0), 4).setInt32(
              0,
              v1,
              true
            );
          }
          stack.push(i);
          if ((stack.pop() ?? 0) !== 0) {
            continue;
          }
          break;
        }
      };

      const canvas = document.querySelector<HTMLCanvasElement>(`fire-sea-${id}`);
      if (!canvas) {
        console.error("Canvas element not found");
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Unable to get 2D context");
        return;
      }
      const W = 320;
      const H = 168;
      canvas.width = W;
      canvas.height = H;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, W, H);
      const imageData = ctx.createImageData(W, H);

      const canvasData = new Uint8Array(my_memory.buffer, 53760, 215040);
      const update = () => {
        requestAnimationFrame(update);
        instance_exports_run();
        imageData.data.set(canvasData);
        ctx.putImageData(imageData, 0, 0);
      };

      instance_exports_setup();
      update();
    };

    main();

  }, [id])

  return (
    <canvas id={`fire-sea-${id}`}
      style={{
        ...style
      }}
    ></canvas>
  )
}