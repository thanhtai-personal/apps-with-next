import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import "./pageSlide.style.css"

const pageSlideVariant = {
  hidden: { opacity: 0, x: "25%" },
  visible: { opacity: 1, x: 0 },
};

export const PageSlide = ({
  children,
  style = {},
  wrapperStyle = {},
  isVisible,
  isMobile
}: {
  children: ReactNode;
  style?: any;
  wrapperStyle?: any;
  isVisible?: boolean;
  isMobile?: boolean;
}) => {

  return (
    <div style={wrapperStyle}>
      {isMobile ? children :
        <AnimatePresence>
          {isVisible && <motion.div
            initial="hidden"
            animate="visible"
            variants={pageSlideVariant}
            transition={{ duration: 0.1 }}
            style={style}
          >
            {children}
          </motion.div>}
        </AnimatePresence>
      }
    </div>
  )
};
