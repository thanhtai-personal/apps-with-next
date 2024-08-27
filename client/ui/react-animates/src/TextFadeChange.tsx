import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

export const TextFadeChange = ({
  children, startOnMount = true
  , stiffness = 0
  , duration = 0.15
  , delay = 0
  , style = {}
}: {
  children: ReactNode;
  startOnMount ?: boolean;
  stiffness ?: number;
  duration ?: number;
  delay ?: number;
  style ?: any;
}) => {
  const wrapperRef = useRef<any>();
  const hasAnimated = useRef<any>(false);
  const controls = useAnimation();

  useEffect(() => {
    if (wrapperRef.current && startOnMount && !hasAnimated.current) {
      controls.start({
        opacity: 1,
        transition: { stiffness, duration, delay },
      });
      hasAnimated.current = true;
    }
  }, [wrapperRef.current, startOnMount, children])

  return <motion.div
    ref={wrapperRef}
    animate={controls}
    initial={{ opacity: 0 }}
    style={{
      display: 'flex',
      ...style
    }}
  >
    {children}
  </motion.div>
}