import { createSlice } from '@reduxjs/toolkit';
import { generateInitialInputs, generateAnswers } from '../../games/missingNumber/constants';

const MAX_LEVEL = 10;
const MAX_STAGE = 10;

const initialState = {
  missingNumber: {
    inputs: generateInitialInputs(0, 1),
    activeIdx: 0,
    message: '',
    mistakes: [],
    stage: 0,
    level: 1,
    isGameFinished: false,
    startTime: Date.now(),
    endTime: null,
    totalMistakes: []
  }
};

const checkAllInputs = (inputs, stage, level) => {
  const answers = generateAnswers(level);
  return inputs.every((input, i) => {
    if (!input) return false;
    return parseInt(input, 10) === answers[i];
  });
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setInput: (state, action) => {
      const { index, value } = action.payload;
      state.missingNumber.inputs[index] = value;
      
      const { level, stage } = state.missingNumber;
      const correctAnswer = generateAnswers(level)[index];
      
      if (value.length === String(correctAnswer).length) {
        const numericValue = parseInt(value, 10);
        const isValid = level === 3 
          ? numericValue === correctAnswer && numericValue % 10 === 0
          : numericValue === correctAnswer;
        
        if (!isValid) {
          state.missingNumber.message = '😠';
          state.missingNumber.inputs[index] = '';
          if (!state.missingNumber.mistakes.includes(correctAnswer)) {
            state.missingNumber.mistakes.push(correctAnswer);
            state.missingNumber.totalMistakes.push({
              level,
              stage,
              correctAnswer
            });
          }
        } else {
          state.missingNumber.message = '🎉';
          
          if (checkAllInputs(state.missingNumber.inputs, stage, level)) {
            state.missingNumber.stage++;
            
            if (state.missingNumber.stage === MAX_STAGE) {
              if (state.missingNumber.level === MAX_LEVEL) {
                state.missingNumber.isGameFinished = true;
                state.missingNumber.endTime = Date.now();
              } else {
                state.missingNumber.level++;
                state.missingNumber.stage = 0;
              }
            }
            
            state.missingNumber.inputs = generateInitialInputs(
              state.missingNumber.stage,
              state.missingNumber.level
            );
            state.missingNumber.activeIdx = 0;
            state.missingNumber.mistakes = [];
            state.missingNumber.message = '';
          }
        }
      }
    },
    
    setActiveIndex: (state, action) => {
      state.missingNumber.activeIdx = action.payload;
    },
    
    setMessage: (state, action) => {
      state.missingNumber.message = action.payload;
    },
    
    resetGame: (state) => {
      state.missingNumber = {
        ...initialState.missingNumber,
        startTime: Date.now()
      };
    }
  }
});

export const {
  setInput,
  setActiveIndex,
  setMessage,
  resetGame
} = gamesSlice.actions;

export default gamesSlice.reducer; 