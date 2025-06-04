import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setActiveIndex } from '../../../store/slices/gamesSlice';
import { STAGE_REVEALS } from '../constants';

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
    <div className="grid grid-cols-5 gap-4">
      {inputs.map((input, index) => {
        const isRevealed = revealedPositions.includes(index);
        const isActive = index === activeIdx;

        return (
          <div
            key={index}
            onClick={() => handleBoxClick(index)}
            className={`
              w-12 h-12 flex items-center justify-center
              text-2xl font-bold rounded-lg cursor-pointer
              transition-all duration-200
              ${isRevealed ? 'bg-gray-200 text-gray-700' : 'bg-white'}
              ${isActive ? 'border-2 border-blue-500' : 'border border-gray-300'}
              ${!isRevealed && !input ? 'hover:border-blue-300' : ''}
            `}
          >
            {input || (isRevealed ? index + 1 : '')}
          </div>
        );
      })}
    </div>
  );
};

export default AnswerBoxes;