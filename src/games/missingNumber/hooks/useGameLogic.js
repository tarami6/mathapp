import { useState, useRef, useEffect } from 'react';
import { GAME_CONFIG, generateAnswers, generateEmptyInputs } from '../constants';

const { SERIES_LENGTH, FEEDBACK_MESSAGES } = GAME_CONFIG;

export const useGameLogic = () => {
  const [inputs, setInputs] = useState(generateEmptyInputs(SERIES_LENGTH));
  const [activeIdx, setActiveIdx] = useState(0);
  const [message, setMessage] = useState("");
  const [mistakes, setMistakes] = useState([]);
  const inputRefs = useRef([]);
  const answers = generateAnswers(SERIES_LENGTH);

  useEffect(() => {
    if (inputRefs.current[activeIdx]) {
      inputRefs.current[activeIdx].focus();
    }
  }, [activeIdx]);

  const reset = () => {
    setInputs(generateEmptyInputs(SERIES_LENGTH));
    setActiveIdx(0);
    setMessage("");
    setMistakes([]);
  };

  const handleNumberInput = (num) => {
    const correctAnswer = answers[activeIdx];
    const isDoubleDigit = correctAnswer >= 10;
    
    const newInputs = [...inputs];
    let value = String(num);

    if (isDoubleDigit && newInputs[activeIdx].length === 1) {
      value = newInputs[activeIdx] + value;
    }

    newInputs[activeIdx] = value;
    setInputs(newInputs);

    if (parseInt(value, 10) === correctAnswer) {
      setMessage("");
      if (activeIdx < SERIES_LENGTH - 1) {
        setActiveIdx(activeIdx + 1);
      }
    } else if (value.length >= (isDoubleDigit ? 2 : 1)) {
      setMistakes((prev) => [...prev, correctAnswer]);
      setMessage(FEEDBACK_MESSAGES.ERROR);
    } else {
      setMessage("");
    }
  };

  return {
    inputs,
    activeIdx,
    message,
    mistakes,
    inputRefs,
    setActiveIdx,
    handleNumberInput,
    reset,
  };
}; 