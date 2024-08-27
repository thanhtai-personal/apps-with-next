import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

export const ZoomOutAppear = ({ children, startOnMount = true, specialZooming = false
  , stiffness = 250
  , duration = 0.5
  , delay = 0,
}: {
  children: ReactNode;
  startOnMount?: boolean;
  stiffness?: number;
  duration?: number;
  delay?: number;
  specialZooming?: boolean;
}) => {
  const wrapperRef = useRef<any>();
  const hasAnimated = useRef<any>();
  const controls = useAnimation();

  useEffect(() => {
    if (wrapperRef.current && startOnMount && !hasAnimated.current) {
      controls.start({
        transform: specialZooming ? "scale(0.4)" : "scale(1)",
        transition: { stiffness, duration: duration / 7 * 2, delay },
      }).then(() => {
        if (!specialZooming) return;
        controls.start({
          transform: "scale(0.35)",
          transition: { stiffness, duration: duration / 7 },
        }).then(() => {
          controls.start({
            transform: "scale(1.05)",
            transition: { stiffness, duration: duration / 7 * 4, delay: duration / 14 },
          })
        }).then(() => {
          controls.start({
            transform: "scale(1)",
            transition: { stiffness, duration: duration / 14 },
          })
        })
      });
      hasAnimated.current = true;
    }
  }, [wrapperRef.current, startOnMount, specialZooming])

  return <motion.div
    ref={wrapperRef}
    animate={controls}
    initial={{ transform: "scale(0)" }}
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {children}
  </motion.div>
}