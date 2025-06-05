export const GAME_CONFIG = {
  SERIES_LENGTH: 10,
  FEEDBACK_MESSAGES: {
    ERROR: '😠'
  }
};

// Generate truly random positions for revealed numbers
const generateRandomPositions = (count, totalLength) => {
  // Create array of all possible positions
  const allPositions = Array.from({ length: totalLength }, (_, i) => i);
  
  // Shuffle array using Fisher-Yates algorithm
  for (let i = allPositions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allPositions[i], allPositions[j]] = [allPositions[j], allPositions[i]];
  }
  
  // Take first 'count' positions
  return allPositions.slice(0, count).sort((a, b) => a - b);
};

// Each stage indicates how many numbers should be revealed
export const STAGE_REVEALED_COUNT = {
  0: 0,  // No numbers revealed
  1: 1,  // One random number
  2: 2,  // Two random numbers
  3: 3,  // Three random numbers
  4: 4,  // Four random numbers
  5: 5,  // Five random numbers
  6: 6,  // Six random numbers
  7: 7,  // Seven random numbers
  8: 8,  // Eight random numbers
  9: 9   // Nine numbers (leaving only one for user)
};

export const generateHintSequence = (level) => {
  const startNum = (level - 1) * 10 + 1;
  return Array.from({ length: GAME_CONFIG.SERIES_LENGTH }, (_, i) => startNum + i);
};

export const generateAnswers = (level) => {
  return Array.from({ length: GAME_CONFIG.SERIES_LENGTH }, (_, i) => i + 1);
};

export const generateInitialInputs = (stage, level) => {
  const answers = generateAnswers(level);
  const numToReveal = STAGE_REVEALED_COUNT[stage] || 0;
  
  // Get random positions, but exclude position 9 (for number 10)
  const availablePositions = Array.from({ length: GAME_CONFIG.SERIES_LENGTH - 1 }, (_, i) => i);
  const revealedPositions = [];
  
  // Shuffle available positions (Fisher-Yates)
  for (let i = availablePositions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availablePositions[i], availablePositions[j]] = [availablePositions[j], availablePositions[i]];
  }
  
  // Take the first numToReveal positions
  revealedPositions.push(...availablePositions.slice(0, numToReveal));
  revealedPositions.sort((a, b) => a - b);
  
  return Array.from({ length: GAME_CONFIG.SERIES_LENGTH }, (_, i) => {
    if (revealedPositions.includes(i)) {
      return String(answers[i]);
    }
    return '';
  });
};

export const generateEmptyInputs = (length) => Array(length).fill(""); 