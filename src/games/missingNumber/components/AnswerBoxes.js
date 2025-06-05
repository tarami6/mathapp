import React from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { setActiveIndex } from '../../../store/slices/gamesSlice';

const AnswerBox = ({ input, isActive, onClick }) => (
  <div
    onClick={onClick}
    data-testid="answer-box"
    data-filled={Boolean(input)}
    className={`
      w-8 h-8
      flex items-center justify-center
      text-sm font-medium
      transition-colors duration-200
      ${isActive ? 'border-2 border-blue-500' : 'border border-gray-200'}
      rounded bg-white
      ${input ? 'text-black' : 'text-gray-400'}
    `}
  >
    {input || ''}
  </div>
);

const AnswerBoxes = ({ inputs, activeIdx }) => {
  const dispatch = useAppDispatch();

  const handleBoxClick = (index) => {
    // Only allow clicking empty boxes
    if (!inputs[index]) {
      dispatch(setActiveIndex(index));
    }
  };

  return (
    <div className="grid grid-cols-10 gap-2">
      {inputs.map((input, index) => (
        <AnswerBox
          key={index}
          input={input}
          isActive={index === activeIdx}
          onClick={() => handleBoxClick(index)}
        />
      ))}
    </div>
  );
};

export default AnswerBoxes;