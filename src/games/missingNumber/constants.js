export const GAME_CONFIG = {
  SERIES_LENGTH: 10
};

export const STAGE_REVEALS = {
  0: [0],
  1: [0, 1],
  2: [0, 1, 2],
  3: [1, 2, 3],
  4: [2, 3, 4],
  5: [4, 5, 6],
  6: [6, 7, 8],
  7: [7, 8, 9],
  8: [3, 6, 9],
  9: [0, 5, 9]
};

export const generateHintSequence = (level) => {
  const startNum = (level - 1) * 10 + 1;
  return Array.from({ length: GAME_CONFIG.SERIES_LENGTH }, (_, i) => startNum + i);
};

export const generateAnswers = (level) => {
  const startNum = (level - 1) * 10 + 1;
  return Array.from({ length: GAME_CONFIG.SERIES_LENGTH }, (_, i) => startNum + i);
};

export const generateInitialInputs = (stage, level) => {
  const answers = generateAnswers(level);
  const revealedPositions = STAGE_REVEALS[stage] || [];
  
  return Array.from({ length: GAME_CONFIG.SERIES_LENGTH }, (_, i) => {
    if (revealedPositions.includes(i)) {
      return String(answers[i]);
    }
    return '';
  });
};

export const generateEmptyInputs = (length) => Array(length).fill(""); 