"use client";

import { motion } from "motion/react";

interface GreetingAnimatedProps {
  greeting: string;
  userName: string;
}

export function GreetingAnimated({
  greeting,
  userName,
}: GreetingAnimatedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-2"
    >
      <div className="space-y-1">
        <h1 className="text-5xl font-bold tracking-tight">
          <span className="text-gray-900 dark:text-white">{greeting},</span>{" "}
          <span className="bg-linear-to-r from-red-600 to-blue-600 bg-clip-text text-transparent font-extrabold">
            {userName}
          </span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Welcome back to Starter
        </p>
      </div>
    </motion.div>
  );
}
