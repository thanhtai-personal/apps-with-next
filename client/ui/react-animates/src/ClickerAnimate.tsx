import { ReactNode, useRef, useState } from "react";
import { motion, useAnimation } from 'framer-motion';

export const ClickerAnimate = ({
  width,
  height,
  children,
  flyUp,
  fallDown,
  length = 250,
  isIOS
}: {
  width: number,
  height: number,
  length: number,
  children: ReactNode,
  flyUp?: ReactNode,
  fallDown?: ReactNode,
  isIOS?: boolean;
}) => {
  const touchAreaRef = useRef<any>();
  const controls = useAnimation();
  const [flyUpAnimations, setFlyUpAnimations] = useState<{ id: number }[]>([]);
  const [fallDownAnimations, setFallDownAnimations] = useState<{ id: number }[]>([]);
  const [animationId, setAnimationId] = useState(0);

  const handleClick = () => {
    if (touchAreaRef.current) {
      controls.start({
        scale: 1.02,
        transition: { type: 'spring', stiffness: 50 }
      }).then(() => {
        controls.start({
          scale: 1,
          transition: { type: 'spring', stiffness: 50 }
        });
      });
      const newAnimationId = animationId + 1;
      setFlyUpAnimations(prev => [...prev, { id: newAnimationId }]);
      setFallDownAnimations(prev => [...prev, { id: newAnimationId }]);
      setAnimationId(newAnimationId);
    }
  };

  return (
    <motion.div
      ref={touchAreaRef}
      animate={controls}
      style={{
        width,
        height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        overflow: 'visible'
      }}
      onClick={isIOS ? () => { } : handleClick}
      onTouchStart={isIOS ? handleClick : () => { }}
    >
      {children}
      {flyUp && !isIOS && flyUpAnimations.map(({ id }) => (
        <motion.div
          key={id}
          initial={{ opacity: 1, y: -1 * height / 2 }}
          animate={{ opacity: 0, y: -1 * length }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            color: 'red',
            fontWeight: 'bold',
            pointerEvents: 'none'
          }}
          onAnimationComplete={() => {
            setFlyUpAnimations(prev => prev.filter(animation => animation.id !== id));
          }}
        >
          {flyUp}
        </motion.div>
      ))}
      {fallDown && !isIOS && fallDownAnimations.map(({ id }) => (
        <motion.div
          key={id}
          initial={{ opacity: 1, y: height / 2 }}
          animate={{ opacity: 0, y: length }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            color: 'red',
            fontWeight: 'bold',
            pointerEvents: 'none'
          }}
          onAnimationComplete={() => {
            setFallDownAnimations(prev => prev.filter(animation => animation.id !== id));
          }}
        >
          {fallDown}
        </motion.div>
      ))}
    </motion.div>
  );
};
