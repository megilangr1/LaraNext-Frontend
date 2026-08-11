"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const MotionWrapper = ({
  children,
  className,
  delay = 0,
  duration = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) => {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay,
        duration,
      }}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
