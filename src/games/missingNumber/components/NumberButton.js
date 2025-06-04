import styles from '../styles';

const NumberButton = ({ num, onClick }) => (
  <button onClick={onClick} style={styles.numberButton}>
    {num}
  </button>
);

export default NumberButton;