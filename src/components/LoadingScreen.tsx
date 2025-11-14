
"use client";

import { motion } from "framer-motion";
import { Logo } from "./Logo";

export function LoadingScreen() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="flex h-svh w-full items-center justify-center bg-background">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-4"
      >
        <motion.div variants={itemVariants}>
          <Logo />
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="relative w-48 h-1 bg-muted overflow-hidden rounded-full"
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
