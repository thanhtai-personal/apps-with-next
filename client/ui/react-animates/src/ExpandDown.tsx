import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

export const ExpandDown = ({ children, startOnMount = true
  , stiffness = 250
  , duration = 0.5
  , delay = 0
  , slideEffect = true
  , width
  , height
  , style = {}
}: {
  children: ReactNode;
  startOnMount?: boolean;
  stiffness?: number;
  duration?: number;
  delay?: number;
  slideEffect?: boolean;
  width?: number;
  height?: number;
  style?: any;
}) => {
  const wrapperRef = useRef<any>();
  const hasAnimated = useRef(false);
  const controls = useAnimation();

  useEffect(() => {
    if (wrapperRef.current && startOnMount && !hasAnimated.current) {
      const elementHeight = wrapperRef.current.scrollHeight;
      if (slideEffect) {
        controls.start({
          opacity: 1,
          transform: "translateY(0%)",
          transition: { stiffness, duration, delay },
        });
      } else {
        controls.start({
          opacity: 1,
          height: elementHeight,
          transition: { stiffness, duration, delay },
        });
      }
      hasAnimated.current = true;
    }
  }, [wrapperRef.current, startOnMount, slideEffect])

  if (slideEffect) {
    return (
      <div style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        ...style
      }}>
        <motion.div
          ref={wrapperRef}
          animate={controls}
          initial={{ transform: "translateY(-100%)" }}
          style={{
            width: "100%",
            height: "100%",
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            ...style
          }}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  return <motion.div
    ref={wrapperRef}
    animate={controls}
    initial={{ height: 0, opacity: 0 }}
    style={{
      width: "100%",
      height: "100%",
      display: 'flex',
      ...style
    }}
  >
    {children}
  </motion.div>
}