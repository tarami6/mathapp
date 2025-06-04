// games/missingNumber/MissingNumberGame.jsx
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetGame } from "../../store/slices/gamesSlice";
import Feedback from "./components/Feedback";
import ResetButton from "./components/ResetButton";
import AnswerBoxes from "./components/AnswerBoxes";
import { NumberPad } from "./components/NumberPad";
import GameComplete from "./components/GameComplete";
import { Card, CardContent } from "./components/card";
import { motion, AnimatePresence } from "framer-motion";
import { generateHintSequence } from "./constants";

const SequenceHint = ({ level }) => {
  const sequence = generateHintSequence(level);
  return (
    <div className="flex flex-col gap-3 mb-3">
      <div className="text-gray-600 text-base">Numbers in this level:</div>
      <div className="grid grid-cols-10 gap-1">
        {sequence.map((num, index) => (
          <div
            key={index}
            className="aspect-square p-2 bg-gray-50 rounded-lg border border-gray-200
                     flex items-center justify-center text-blue-600 text-sm"
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

function MissingNumberGame() {
  const dispatch = useAppDispatch();
  const { 
    inputs, 
    activeIdx, 
    message, 
    level,
    isGameFinished 
  } = useAppSelector((state) => state.games.missingNumber);

  const handleReset = () => {
    dispatch(resetGame());
  };

  if (isGameFinished) {
    return <GameComplete onRestart={handleReset} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={level}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md px-4"
        >
          <Card className="shadow-lg py-8">
            <CardContent className="flex flex-col items-center">
              <h1 className="text-2xl font-normal mb-8">Numbers 1 to 10</h1>
              
              <div className="w-full px-3">
                <SequenceHint level={level} />
                <AnswerBoxes
                  inputs={inputs}
                  activeIdx={activeIdx}
                />
              </div>

              {message && <Feedback message={message} />}

              <div className="mt-12">
                <NumberPad />
              </div>

              <div className="mt-8">
                <ResetButton onClick={handleReset} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default MissingNumberGame;
