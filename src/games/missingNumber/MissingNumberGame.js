// games/missingNumber/MissingNumberGame.jsx
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setMessage, resetGame } from "../../store/slices/gamesSlice";
import Feedback from "./components/Feedback";
import ResetButton from "./components/ResetButton";
import AnswerBoxes from "./components/AnswerBoxes";
import { NumberPad } from "./components/NumberPad";
import GameComplete from "./components/GameComplete";
import { Card, CardContent, CardHeader, CardTitle } from "./components/card";
import { motion, AnimatePresence } from "framer-motion";

function MissingNumberGame() {
  const dispatch = useAppDispatch();
  const { 
    inputs, 
    activeIdx, 
    message, 
    mistakes, 
    stage, 
    level,
    isGameFinished,
    isSpecialStage
  } = useAppSelector((state) => state.games.missingNumber);

  const handleReset = () => {
    dispatch(resetGame());
  };

  // Get the title based on level and special stage
  const getLevelTitle = () => {
    if (isSpecialStage) {
      return (
        <>
          <div className="text-blue-600">Special Stage: Counting by Tens</div>
          <div className="text-lg text-gray-600 mt-1">10, 20, 30, ... 100</div>
        </>
      );
    }

    if (level === 3) {
      return (
        <>
          <div className="text-blue-600">Level 3: Counting by Tens</div>
          <div className="text-lg text-gray-600 mt-1">10, 20, 30, ... 100</div>
        </>
      );
    }

    // Calculate the current series range for other levels
    const seriesStart = (level - 1) * 10 + 1;
    const seriesEnd = level * 10;
    return `Numbers ${seriesStart} to ${seriesEnd}`;
  };

  // If game is finished, show completion screen
  if (isGameFinished) {
    return <GameComplete onRestart={handleReset} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={level}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <Card className="shadow-lg">
            {mistakes.length > 0 && (
              <div className="absolute top-4 right-4 text-red-600 font-bold text-lg">
                ❌ {mistakes.length}
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-center text-2xl font-semibold mt-4">
                {getLevelTitle()}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-6 px-2">
              <AnswerBoxes
                inputs={inputs}
                activeIdx={activeIdx}
              />

              <Feedback message={message} />

              <NumberPad />

              <div className="flex gap-4 mt-2">
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
