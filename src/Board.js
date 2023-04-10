import React, { useState } from "react";
import Square from "./component/Square";

function calcWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

// default=メインの関数
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  /**
   * immutability(不変性)：元の配列を直接変更せずにfillでコピーしている
   * → 以前のデータの保持と再レンダリングの効率化(同じ場所は再レンダリングしない)
   */
  const [squares, setSquares] = useState(Array(9).fill(null));

  // マスをクリックしたときの関数
  function handleClick(index) {
    if (squares[index] || calcWinner(squares)) {
      return;
    }

    // ボード更新
    const newSquares = squares.slice();
    if (xIsNext) {
      newSquares[index] = "🐶";
    } else {
      newSquares[index] = "🐱";
    }
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calcWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "🐶" : "🐱");
  }

  return (
    <React.Fragment>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </React.Fragment>
  );
}
