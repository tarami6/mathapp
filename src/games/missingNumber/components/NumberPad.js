import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setInput, setActiveIndex, setMessage } from '../../../store/slices/gamesSlice';
import { Button } from './button';
import { STAGE_REVEALS, generateAnswers } from '../constants';

const FEEDBACK_MESSAGES = {
  SUCCESS: '🎉',
  ERROR: '😠'
};

const validateInput = (value, correctAnswer, level) => {
  const numericValue = parseInt(value, 10);
  return level === 3 
    ? numericValue === correctAnswer && numericValue % 10 === 0
    : numericValue === correctAnswer;
};

const findNextEmptyPosition = (currentIdx, inputs, revealedPositions) => {
  for (let i = currentIdx + 1; i < inputs.length; i++) {
    if (!revealedPositions.includes(i) && !inputs[i]) {
      return i;
    }
  }
  return currentIdx;
};

const NumberButton = ({ number, onClick }) => (
  <button
    onClick={() => onClick(number)}
    className="w-[72px] h-[72px] rounded-full border border-gray-200
             flex items-center justify-center
             text-2xl text-black
             transition-colors duration-200
             hover:border-gray-300"
  >
    {number}
  </button>
);

export const NumberPad = () => {
  const dispatch = useAppDispatch();
  const { activeIdx, inputs, stage, level } = useAppSelector(state => state.games.missingNumber);
  const revealedPositions = STAGE_REVEALS[stage] || [];

  const handleNumberClick = (number) => {
    if (revealedPositions.includes(activeIdx)) return;

    const currentValue = inputs[activeIdx] || '';
    const newValue = currentValue + number;
    const answers = generateAnswers(level);
    const correctAnswer = answers[activeIdx];
    const expectedLength = String(correctAnswer).length;

    if (newValue.length <= expectedLength) {
      dispatch(setInput({ value: newValue, index: activeIdx }));

      if (newValue.length === expectedLength) {
        if (validateInput(newValue, correctAnswer, level)) {
          dispatch(setMessage(FEEDBACK_MESSAGES.SUCCESS));
          const nextIdx = findNextEmptyPosition(activeIdx, inputs, revealedPositions);
          if (nextIdx !== activeIdx) {
            dispatch(setActiveIndex(nextIdx));
          }
        } else {
          dispatch(setMessage(FEEDBACK_MESSAGES.ERROR));
          dispatch(setInput({ value: '', index: activeIdx }));
        }
      }
    }
  };

  return (
    <div className="w-full max-w-[280px] mx-auto">
      <div className="grid grid-cols-3 gap-6 place-items-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <NumberButton key={num} number={num} onClick={handleNumberClick} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <NumberButton number={0} onClick={handleNumberClick} />
      </div>
    </div>
  );
}; 