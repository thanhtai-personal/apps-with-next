import { useEffect } from "react"

export const useMouseWaveClicker = () => {

  const handleClick = (event: MouseEvent) => {
    applyCursormouseWaveEffect(event as MouseEvent)
  };

  function applyCursormouseWaveEffect(e: MouseEvent) {
    const mouseWave = document.createElement("div");

    mouseWave.className = "mouse-wave";
    document.body.appendChild(mouseWave);

    mouseWave.style.left = `${e.clientX}px`;
    mouseWave.style.top = `${e.clientY}px`;
    mouseWave.style.animation = `mouse-wave-effect .4s  linear`;
    mouseWave.onanimationend = () => {
      document.body.removeChild(mouseWave);
    }
  }

  useEffect(() => {
    window.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [])
}