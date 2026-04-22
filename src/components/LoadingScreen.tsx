import React from 'react';
import { motion } from 'motion/react';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-bg select-none"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-brand-accent mb-4"
        >
          Initializing Portfolio
        </motion.div>
        <div className="w-48 h-[1px] bg-brand-text/10 relative overflow-hidden">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ 
              duration: 1, 
              ease: "easeInOut",
            }}
            className="absolute top-0 bottom-0 w-1/2 bg-brand-accent/50"
          />
        </div>
      </div>
    </motion.div>
  );
}
