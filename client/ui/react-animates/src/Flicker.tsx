import { motion } from "framer-motion";
import { ReactNode } from "react";

export const Fliker = ({
  children,
  style = {}
}: {
  children: ReactNode;
  style?: any;
}) => {
  return (
    <motion.div
      style={{ width: "100%", height: "100%", ...style }}
      animate={{
        opacity: [1, 0.5, 1, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};
