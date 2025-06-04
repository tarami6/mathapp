import React from 'react';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../../store/hooks';

const formatTime = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;
  
  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (remainingMinutes > 0) parts.push(`${remainingMinutes}m`);
  parts.push(`${remainingSeconds}s`);
  
  return parts.join(' ');
};

const GameComplete = ({ onRestart }) => {
  const { totalMistakes, startTime, endTime } = useAppSelector(state => state.games.missingNumber);
  
  const timeTaken = endTime - startTime;
  const mistakesByLevel = totalMistakes.reduce((acc, mistake) => {
    acc[mistake.level] = acc[mistake.level] || [];
    acc[mistake.level].push(mistake);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-xl p-8"
    >
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="text-6xl"
        >
          🎉
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-800">
          Congratulations!
        </h1>
        
        <p className="text-xl text-gray-600">
          You've completed all numbers from 1 to 100!
        </p>

        <div className="mt-8 space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="font-semibold text-blue-800">Time Taken</h2>
            <p className="text-2xl font-bold text-blue-600">
              {formatTime(timeTaken)}
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h2 className="font-semibold text-orange-800">Total Mistakes</h2>
            <p className="text-2xl font-bold text-orange-600">
              {totalMistakes.length}
            </p>
            
            {Object.entries(mistakesByLevel).length > 0 && (
              <div className="mt-4 text-left">
                <h3 className="text-sm font-semibold text-orange-700 mb-2">Mistakes by Level:</h3>
                <div className="space-y-2">
                  {Object.entries(mistakesByLevel).map(([level, mistakes]) => (
                    <div key={level} className="text-sm text-orange-600">
                      Level {level}: {mistakes.length} mistakes
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="mt-8 px-8 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors"
        >
          Play Again
        </motion.button>
      </div>
    </motion.div>
  );
};

export default GameComplete; 