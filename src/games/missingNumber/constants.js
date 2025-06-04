export const GAME_CONFIG = {
  SERIES_LENGTH: 10,
  FEEDBACK_MESSAGES: {
    ERROR: "😠",
    SUCCESS: "🎉",
  },
  SPECIAL_STAGES: {
    TENS: 'tens'
  }
};

// Stage reveals configuration (0-based index)
// Each stage N should have exactly N numbers revealed
export const STAGE_REVEALS = {
  0: [],                                     // Stage 0: No numbers revealed
  1: [4],                                    // Stage 1: One number (middle)
  2: [3, 7],                                 // Stage 2: Two numbers
  3: [2, 5, 8],                             // Stage 3: Three numbers
  4: [2, 4, 6, 8],                          // Stage 4: Four numbers
  5: [1, 3, 5, 7, 9],                       // Stage 5: Five numbers
  6: [1, 3, 4, 6, 7, 9],                    // Stage 6: Six numbers
  7: [1, 2, 4, 5, 7, 8, 9],                 // Stage 7: Seven numbers
  8: [0, 2, 3, 4, 6, 7, 8, 9],             // Stage 8: Eight numbers
  9: [0, 1, 2, 3, 4, 6, 7, 8, 9],          // Stage 9: Nine numbers
  // Special tens stage follows same N numbers per stage N pattern
  [`${GAME_CONFIG.SPECIAL_STAGES.TENS}_0`]: [],                      // No numbers
  [`${GAME_CONFIG.SPECIAL_STAGES.TENS}_1`]: [5],                     // Show 60
  [`${GAME_CONFIG.SPECIAL_STAGES.TENS}_2`]: [3, 7],                  // Show 40, 80
  [`${GAME_CONFIG.SPECIAL_STAGES.TENS}_3`]: [2, 5, 8],              // Show 30, 60, 90
  [`${GAME_CONFIG.SPECIAL_STAGES.TENS}_4`]: [2, 4, 6, 8],           // Show 30, 50, 70, 90
  [`${GAME_CONFIG.SPECIAL_STAGES.TENS}_5`]: [1, 3, 5, 7, 9],        // Show 20, 40, 60, 80, 100
  [`${GAME_CONFIG.SPECIAL_STAGES.TENS}_6`]: [1, 3, 4, 6, 7, 9],     // Six numbers
  [`${GAME_CONFIG.SPECIAL_STAGES.TENS}_7`]: [1, 2, 4, 5, 7, 8, 9],  // Seven numbers
  [`${GAME_CONFIG.SPECIAL_STAGES.TENS}_8`]: [0, 2, 3, 4, 6, 7, 8, 9], // Eight numbers
  [`${GAME_CONFIG.SPECIAL_STAGES.TENS}_9`]: [0, 1, 2, 3, 4, 6, 7, 8, 9], // Nine numbers
};

// Helper function to generate initial inputs
export const generateInitialInputs = (stage, level, isSpecialStage = false) => {
  const revealedPositions = STAGE_REVEALS[stage] || [];
  const inputs = Array(GAME_CONFIG.SERIES_LENGTH).fill('');
  
  if (level === 3) {
    // Level 3: Counting by tens (10, 20, 30, ...)
    revealedPositions.forEach(pos => {
      inputs[pos] = String((pos + 1) * 10);
    });
  } else {
    // Regular level logic
    const startNum = (level - 1) * 10 + 1;
    revealedPositions.forEach(pos => {
      inputs[pos] = String(startNum + pos);
    });
  }
  
  // Verify that the number of revealed positions matches the stage number
  if (stage > 0) {
    const expectedCount = stage;
    const actualCount = revealedPositions.length;
    console.assert(
      actualCount === expectedCount,
      `Stage ${stage} should have exactly ${expectedCount} revealed numbers, but has ${actualCount}. Level: ${level}`
    );
  }
  
  return inputs;
};

// Helper function to generate answers
export const generateAnswers = (level) => {
  if (level === 3) {
    // Level 3: Counting by tens (10, 20, 30, ...)
    return Array.from({ length: GAME_CONFIG.SERIES_LENGTH }, (_, i) => (i + 1) * 10);
  }
  
  // Regular sequence for other levels
  const startNum = (level - 1) * 10 + 1;
  return Array.from({ length: GAME_CONFIG.SERIES_LENGTH }, (_, i) => startNum + i);
};

export const generateEmptyInputs = (length) => Array(length).fill(""); 