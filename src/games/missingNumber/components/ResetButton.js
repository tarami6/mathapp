import styles from '../styles';
import { RotateCcw } from "lucide-react";

const ResetButton = ({ onClick }) => (
  <button style={styles.resetButton} onClick={onClick}>
     <RotateCcw className="w-6 h-6 text-black" />
  </button>
);

export default ResetButton;