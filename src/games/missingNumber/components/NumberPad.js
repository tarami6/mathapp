import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setInput, setActiveIndex, setMessage } from '../../../store/slices/gamesSlice';
import { generateAnswers } from '../constants';

const FEEDBACK_MESSAGES = {
  ERROR: '😠'
};

const findNextEmptyPosition = (currentIdx, inputs) => {
  for (let i = currentIdx + 1; i < inputs.length; i++) {
    if (!inputs[i]) {
      return i;
    }
  }
  for (let i = 0; i < currentIdx; i++) {
    if (!inputs[i]) {
      return i;
    }
  }
  return currentIdx;
};

const NumberButton = ({ number, onClick }) => (
  <button
    onClick={() => onClick(number)}
    role="button"
    name={String(number)}
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
  const { activeIdx, inputs, level } = useAppSelector(state => state.games.missingNumber);

  const handleNumberClick = (number) => {
    const currentInput = inputs[activeIdx] || '';
    const answers = generateAnswers(level);
    const correctAnswer = answers[activeIdx];
    
    // If the current input is already correct, don't allow more input
    if (currentInput && parseInt(currentInput, 10) === correctAnswer) {
      return;
    }

    // For single-digit answers (1-9)
    if (correctAnswer <= 9) {
      dispatch(setInput({ value: String(number), index: activeIdx }));
      return;
    }

    // For number 10
    if (correctAnswer === 10) {
      if (currentInput === '') {
        // First digit must be 1
        if (number === 1) {
          dispatch(setInput({ value: '1', index: activeIdx }));
        } else {
          dispatch(setInput({ value: '', index: activeIdx }));
        }
      } else if (currentInput === '1') {
        // Second digit must be 0
        if (number === 0) {
          dispatch(setInput({ value: '10', index: activeIdx }));
        } else {
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