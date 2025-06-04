import React from 'react';
import { motion } from 'framer-motion';

const CompletedSeries = ({ numbers }) => {
  if (!numbers || numbers.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 py-2 mb-4 overflow-x-auto"
    >
      <div className="flex justify-center gap-2">
        {numbers.map((num, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded text-sm font-medium text-gray-600"
          >
            {num}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CompletedSeries; 