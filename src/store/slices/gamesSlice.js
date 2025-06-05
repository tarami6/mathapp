import { createSlice } from '@reduxjs/toolkit';
import { generateInitialInputs, generateAnswers, STAGE_REVEALED_COUNT } from '../../games/missingNumber/constants';

const MAX_LEVEL = 10;
const MAX_STAGE = 10;

const FEEDBACK_MESSAGES = {
  ERROR: '😠'
};

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

const checkAllInputs = (inputs, level) => {
  const answers = generateAnswers(level);
  return inputs.every((input, i) => {
    if (!input) return false;
    const numericValue = parseInt(input, 10);
    return numericValue === answers[i];
  });
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

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setInput: (state, action) => {
      const { index, value } = action.payload;
      const { level, stage } = state.missingNumber;
      const correctAnswer = generateAnswers(level)[index];
      const currentInput = state.missingNumber.inputs[index];
      
      // Special handling for number 10
      if (correctAnswer === 10) {
        if (value === '1') {
          state.missingNumber.inputs[index] = value;
          state.missingNumber.message = '';
          return;
        }
        
        if (currentInput === '1' && value === '10') {
          state.missingNumber.inputs[index] = value;
          state.missingNumber.message = '';
          // Move to next empty position
          state.missingNumber.activeIdx = findNextEmptyPosition(index, state.missingNumber.inputs);
        } else {
          state.missingNumber.inputs[index] = '';
          state.missingNumber.message = FEEDBACK_MESSAGES.ERROR;
          return;
        }
      } else {
        // For single-digit numbers
        const numericValue = parseInt(value, 10);
        if (numericValue === correctAnswer) {
          state.missingNumber.inputs[index] = value;
          state.missingNumber.message = '';
          // Move to next empty position
          state.missingNumber.activeIdx = findNextEmptyPosition(index, state.missingNumber.inputs);
        } else {
          state.missingNumber.inputs[index] = '';
          state.missingNumber.message = FEEDBACK_MESSAGES.ERROR;
          return;
        }
      }
      
      // Check if all inputs are correct
      if (checkAllInputs(state.missingNumber.inputs, level)) {
        // Move to next stage
        const nextStage = stage + 1;
        state.missingNumber.stage = nextStage;
        
        if (nextStage === MAX_STAGE) {
          if (level === MAX_LEVEL) {
            state.missingNumber.isGameFinished = true;
            state.missingNumber.endTime = Date.now();
          } else {
            state.missingNumber.level = level + 1;
            state.missingNumber.stage = 0;
          }
        }
        
        // Generate new inputs for next stage
        state.missingNumber.inputs = generateInitialInputs(
          state.missingNumber.stage,
          state.missingNumber.level
        );

        // Reset state for new stage
        state.missingNumber.activeIdx = state.missingNumber.inputs.findIndex(input => !input);
        state.missingNumber.mistakes = [];
        state.missingNumber.message = '';
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
        inputs: generateInitialInputs(0, 1),
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