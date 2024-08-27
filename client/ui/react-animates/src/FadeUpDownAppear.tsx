import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

const fadeUpVariants = {
  hidden: { opacity: 0, y: "100%" },
  visible: { opacity: 1, y: 0 },
};

export const FadeUpDownAppear = ({
  children,
  style = {},
  isVisible
}: {
  children: ReactNode;
  style?: any;
  isVisible?: boolean;
}) => {

  return (
    <AnimatePresence>
      {isVisible && <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
        transition={{ duration: 0.2 }}
        style={style}
      >
        {children}
      </motion.div>}
    </AnimatePresence>
  )
};
