import { useEffect } from "react"

export const useCustomCursor = (elementId: string, option?: {
  customMouseMove: (event: MouseEvent) => void;
}) => {
  const { customMouseMove } = (option || {})
  const handleMouseMove = (event: MouseEvent) => {
    const customCursorElement = document.getElementById(elementId);
    if (customMouseMove) {
      customMouseMove(event);
    } else {
      if (!customCursorElement) return;
      const x = event.clientX;
      const y = event.clientY;
      customCursorElement.style.top = `${y - 10}px`;
      customCursorElement.style.left = `${x - 10}px`;
    }
  }


  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, false);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove, false);
    }
  }, []);
}