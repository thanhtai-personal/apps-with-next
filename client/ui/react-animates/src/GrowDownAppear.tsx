import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

export const GrowDownAppear = ({ children, startOnMount = true
  , stiffness = 250
  , duration = 0.5
  , delay = 0,
}: {
  children: ReactNode;
  startOnMount?: boolean;
  stiffness?: number;
  duration?: number;
  delay?: number;
}) => {
  const wrapperRef = useRef<any>();
  const controls = useAnimation();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (wrapperRef.current && startOnMount && !hasAnimated.current) {
      controls.start({
        transform: "translateY(0%)",
        filter: "unset",
        opacity: 1,
        transition: { stiffness, duration, delay },
      });
      hasAnimated.current = true;
    }
  }, [wrapperRef.current, startOnMount])

  return <motion.div
    ref={wrapperRef}
    animate={controls}
    initial={{ transform: "translateY(-100%)", filter: "blur(4px)", opacity: 0 }}
    style={{
      width: "100%",
      height: "100%",
      display: 'flex',
    }}
  >
    {children}
  </motion.div>
}