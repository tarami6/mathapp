import { createSlice } from '@reduxjs/toolkit';
import { generateInitialInputs, STAGE_REVEALS, generateAnswers } from '../../games/missingNumber/constants';

const MAX_LEVEL = 10;

const initialState = {
  missingNumber: {
    inputs: generateInitialInputs(0, 1),
    activeIdx: 0,
    message: "",
    mistakes: [],
    score: 0,
    isGameComplete: false,
    stage: 0,
    level: 1,
    isGameFinished: false,
    startTime: Date.now(),
    endTime: null,
    totalMistakes: [],
    isSpecialStage: false,
  },
};

// Helper function to check if all visible positions are filled correctly
const checkAllInputsComplete = (inputs, stage, level) => {
  const revealedPositions = STAGE_REVEALS[stage] || [];
  const answers = generateAnswers(level);

  for (let i = 0; i < inputs.length; i++) {
    if (revealedPositions.includes(i)) continue;
    const input = inputs[i];
    if (!input) return false;
    const numericValue = parseInt(input, 10);
    if (isNaN(numericValue) || numericValue !== answers[i]) return false;
  }
  return true;
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setInput: (state, action) => {
      const { index, value } = action.payload;
      const revealedPositions = STAGE_REVEALS[state.missingNumber.stage] || [];
      
      if (revealedPositions.includes(index)) {
        return;
      }
      
      state.missingNumber.inputs[index] = value;
      
      // Validate complete inputs
      if (value.length === String(generateAnswers(state.missingNumber.level)[index]).length) {
        const numericValue = parseInt(value, 10);
        const correctAnswer = generateAnswers(state.missingNumber.level)[index];
        
        const isValid = state.missingNumber.level === 3 
          ? numericValue === correctAnswer && numericValue % 10 === 0
          : numericValue === correctAnswer;
        
        if (!isValid) {
          state.missingNumber.message = '😠';
          state.missingNumber.inputs[index] = '';
          if (!state.missingNumber.mistakes.includes(correctAnswer)) {
            state.missingNumber.mistakes.push(correctAnswer);
            state.missingNumber.totalMistakes.push({
              level: state.missingNumber.level,
              stage: state.missingNumber.stage,
              correctAnswer
            });
          }
        } else {
          state.missingNumber.message = '🎉';
          
          // Check if all inputs are complete for current stage
          if (checkAllInputsComplete(state.missingNumber.inputs, state.missingNumber.stage, state.missingNumber.level)) {
            // Move to next stage
            state.missingNumber.stage += 1;
            
            // Check if we need to move to next level
            if (state.missingNumber.stage === 10) {
              if (state.missingNumber.level === MAX_LEVEL) {
                state.missingNumber.isGameFinished = true;
                state.missingNumber.endTime = Date.now();
              } else {
                state.missingNumber.level += 1;
                state.missingNumber.stage = 0;
              }
            }
            
            // Reset stage state
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
      const revealedPositions = STAGE_REVEALS[state.missingNumber.stage] || [];
      if (!revealedPositions.includes(action.payload)) {
        state.missingNumber.activeIdx = action.payload;
      }
    },
    
    setMessage: (state, action) => {
      state.missingNumber.message = action.payload;
    },
    
    resetGame: (state) => {
      state.missingNumber = {
        ...initialState.missingNumber,
        startTime: Date.now(),
      };
    },
    
    setGameState: (state, action) => {
      const { level, stage } = action.payload;
      state.missingNumber.level = level;
      state.missingNumber.stage = stage;
      state.missingNumber.inputs = generateInitialInputs(stage, level);
      state.missingNumber.activeIdx = 0;
      state.missingNumber.mistakes = [];
      state.missingNumber.message = '';
      state.missingNumber.isGameComplete = false;
    },
  },
});

export const {
  setInput,
  setActiveIndex,
  setMessage,
  resetGame,
  setGameState,
} = gamesSlice.actions;

export default gamesSlice.reducer; 