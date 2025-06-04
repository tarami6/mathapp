import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setInput, setActiveIndex, setMessage } from '../../../store/slices/gamesSlice';
import { Button } from './button';
import { STAGE_REVEALS, generateAnswers } from '../constants';

const FEEDBACK_MESSAGES = {
  SUCCESS: '🎉',
  ERROR: '😠'
};

export const NumberPad = () => {
  const dispatch = useAppDispatch();
  const { activeIdx, inputs, stage, level } = useAppSelector(state => state.games.missingNumber);
  const revealedPositions = STAGE_REVEALS[stage] || [];

  const handleNumberClick = (number) => {
    // Don't handle input for revealed positions
    if (revealedPositions.includes(activeIdx)) {
      return;
    }

    // Get current input value and correct answer
    const currentValue = inputs[activeIdx] || '';
    const newValue = currentValue + number;
    const answers = generateAnswers(level);
    const correctAnswer = answers[activeIdx];
    const expectedLength = String(correctAnswer).length;

    // Only allow input if not exceeding expected length
    if (newValue.length <= expectedLength) {
      // Update input value
      dispatch(setInput({ value: newValue, index: activeIdx }));

      // Check if input is complete
      if (newValue.length === expectedLength) {
        const numericValue = parseInt(newValue, 10);
        const numericCorrectAnswer = parseInt(correctAnswer, 10);
        
        // For Level 3, check if it's a multiple of 10
        const isCorrect = level === 3 
          ? numericValue === numericCorrectAnswer && numericValue % 10 === 0
          : numericValue === numericCorrectAnswer;

        if (isCorrect) {
          dispatch(setMessage(FEEDBACK_MESSAGES.SUCCESS));
          
          // Find next empty non-revealed position
          let nextNonRevealed = activeIdx;
          for (let i = activeIdx + 1; i < inputs.length; i++) {
            if (!revealedPositions.includes(i) && !inputs[i]) {
              nextNonRevealed = i;
              break;
            }
          }
          
          // Only move to next position if we found one and current input is valid
          if (nextNonRevealed !== activeIdx && !revealedPositions.includes(nextNonRevealed)) {
            dispatch(setActiveIndex(nextNonRevealed));
          }
        } else {
          dispatch(setMessage(FEEDBACK_MESSAGES.ERROR));
          dispatch(setInput({ value: '', index: activeIdx }));
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
        <Button
          key={num}
          onClick={() => handleNumberClick(num)}
          className="rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 text-2xl transition-colors duration-200"
        >
          {num}
        </Button>
      ))}
    </div>
  );
}; 