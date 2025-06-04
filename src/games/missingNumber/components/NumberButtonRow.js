const NumberButtonRow = ({ row, handleButtonClick }) => (
  <div className="button-row">
    {row.map((num) => (
      <button
        key={num}
        onClick={() => handleButtonClick(num)}
        className="number-button"
      >
        {num}
      </button>
    ))}
  </div>
);

export default NumberButtonRow;