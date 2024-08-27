import { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, onClick) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
export function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.onClick);
  if (props.noWrapper) {
    return props.children
  }
  return (
    <div style={{ height: "100%", width: "100%", display: props.showing ? 'block' : 'none', ...(props.style || {}) }} ref={wrapperRef}>
      {props.children}
    </div>
  );
}

export default OutsideAlerter;
