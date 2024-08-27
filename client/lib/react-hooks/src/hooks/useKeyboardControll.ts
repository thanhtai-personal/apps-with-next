import { useCallback, useEffect } from "react"

export const useKeyboardControll = ({
  onKeyDown
}: {
  onKeyDown: (event: KeyboardEvent) => void;
}) => {

  const  handleKeyDown = useCallback((e: KeyboardEvent) => {
    onKeyDown && onKeyDown(e);
  }, [onKeyDown]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  });
}