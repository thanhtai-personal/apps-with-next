import { memo, ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import "./ImageTappingAnimation.style.css"

const logoState = {
  rest: { scale: 0.96 },
  pressed: { scale: 0.93 }
};

export const ImageTappingAnimation = memo(({
  contentImage,
  animationContent,
  onTap,
  isMobile,
  width
}: {
  contentImage?: string,
  animationContent: ReactNode;
  onTap: () => void;
  isMobile?: boolean;
  width?: number;
}) => {
  const [tapList, setTapList] = useState<any>([]);
  const touchAreaRef = useRef<any>();

  const handleTouchStart = (event: React.TouchEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!touchAreaRef.current) return;
    const rect = touchAreaRef.current.getBoundingClientRect();
    const now = new Date().getTime();
    const newTaps = Array.from(event.touches)
      .filter((touch) => {
        const { clientX, clientY } = touch;
        return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
      })
      .map((touch) => ({
        id: touch.identifier + now,
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
        tapAt: now,
        point: 0
      }));
    const _tapList = [...tapList];
    _tapList.push(...newTaps);
    const _tapUpdate = _tapList
      .filter((tap) => {
        return tap.tapAt > now - 1000;
      })
      .slice(_tapList.length - 80, _tapList.length);
    setTapList(_tapUpdate);
    onTap();
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (!touchAreaRef.current) return;
    const rect = touchAreaRef.current.getBoundingClientRect();
    const now = new Date().getTime();
    const newTap = {
      id: now,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      tapAt: now,
      point: 0
    };
    const _tapList = [...tapList];
    _tapList.push(newTap);
    const _tapUpdate = _tapList
      .filter((tap) => {
        return tap.tapAt > now - 1000;
      })
      .slice(_tapList.length - 80, _tapList.length);
    setTapList(_tapUpdate);
    onTap();
  };

  return (
    <div
      className="tap-action"
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <motion.div
        className='action-logo'
        style={{
          width: 'fit-content',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          cursor: 'pointer',
          padding: '16px',
          zIndex: 2,
        }}
        id='tap-action-postion'
        draggable={false}
      >
        {contentImage && <motion.img
          src={contentImage}
          alt=''
          ref={touchAreaRef}
          draggable={false}
          style={{
            width: width || 240,
          }}
          initial='rest'
          whileTap='pressed'
          variants={logoState}
          whileInView={{ opacity: 1, scale: 1 }}
          onTouchStart={handleTouchStart}
          onClick={isMobile ? () => { } : handleClick}
        />}
        {tapList.map((tap: any) => (
          <motion.div
            key={tap.id}
            className={'action-logo'}
            style={{
              position: 'absolute',
              top: tap.y - 80,
              left: tap.x,
              pointerEvents: 'none',
              fontWeight: 600,
              fontSize: 36,
              color: 'white',
              width: 'fit-content',
              height: 'fit-content'
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, y: -120 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 2 }}
          >
            {animationContent}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});
