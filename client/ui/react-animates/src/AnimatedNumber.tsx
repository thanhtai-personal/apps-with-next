import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';

export const AnimatedNumber = ({
  initialValue = 0,
  incrementValue = 1000,
  intervalDuration = 50,
  duration = 2000,
  style = {},
  useRandomValue = false,
  value,
  children
}: {
  value: number;
  initialValue?: number;
  incrementValue?: number;
  intervalDuration?: number;
  duration?: number;
  style?: any;
  children: (value: number) => ReactNode;
  useRandomValue?: boolean;
}) => {
  const [_value, setValue] = useState(initialValue);
  const [isAnimationEnd, setIsAnimationEnd] = useState(false);
  const motionValue = useMotionValue(initialValue);
  const springValue = useSpring(motionValue, { duration: duration / 1000, ease: "ease" } as any);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setValue(prevValue =>
        useRandomValue ?
          Math.floor(Math.random() / 2 * value) + initialValue
          : prevValue + incrementValue
      );
    }, intervalDuration);

    const timeoutId = setTimeout(() => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setValue(value);
    }, duration);

    const timeoutId2 = setTimeout(() => {
      setIsAnimationEnd(true);
    }, duration + intervalDuration);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, [incrementValue, intervalDuration, duration, initialValue, useRandomValue, value]);

  useEffect(() => {
    springValue.set(_value);
  }, [_value, springValue]);

  const count = useTransform(springValue, latest => Number(latest).toFixed(0));
  const renderValue = Number(count.get());

  return isAnimationEnd ? children(value) : (
    <motion.div style={style}>
      {children(renderValue)}
    </motion.div>
  );
};
