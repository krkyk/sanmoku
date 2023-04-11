export default function Square({ value, onSquareClick, highlightCells }) {
  return (
    <button
      className={highlightCells ? "square highlight" : "square"}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
