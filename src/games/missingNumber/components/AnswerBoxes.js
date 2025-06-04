import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setActiveIndex } from '../../../store/slices/gamesSlice';
import { STAGE_REVEALS } from '../constants';

const AnswerBox = ({ input, isActive, onClick }) => (
  <div
    onClick={onClick}
    style={{ width: '32px', height: '32px' }}
    className={`
      flex items-center justify-center
      text-sm
      transition-colors duration-200
      ${isActive ? 'border border-blue-500' : 'border border-gray-100'}
      rounded bg-white
    `}
  >
    {input || ''}
  </div>
);

const AnswerBoxes = ({ inputs, activeIdx }) => {
  const dispatch = useAppDispatch();
  const { stage } = useAppSelector(state => state.games.missingNumber);
  const revealedPositions = STAGE_REVEALS[stage] || [];

  const handleBoxClick = (index) => {
    if (!revealedPositions.includes(index)) {
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