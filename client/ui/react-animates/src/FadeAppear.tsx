import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

export const FadeAppear = ({ children, startOnMount = true
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
  const controls = useAnimation();
  const hasAnimated = useRef<any>(false);

  useEffect(() => {
    if (wrapperRef.current && startOnMount && !hasAnimated.current) {
      controls.start({
        opacity: 1,
        transition: { stiffness, duration, delay },
      });
    }
  }, [wrapperRef.current, startOnMount])

  return <motion.div
    ref={wrapperRef}
    animate={controls}
    initial={{ opacity: 0 }}
    style={{
      width: "100%",
      height: "100%",
      display: 'flex',
      justifyContent: "flex-start",
      alignItems: "flex-start",
      ...(style || {})
    }}
  >
    {children}
  </motion.div>
}