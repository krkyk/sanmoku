import React from "react";
import Square from "./Square";

export default function Board({ dogIsNext, squares, onPlay }) {
  // マスをクリックしたときの関数
  function handleClick(index) {
    if (squares[index] || calcWinner(squares)) {
      return;
    }

    // ボード更新、配列をコピー
    const newSquares = squares.slice();
    if (dogIsNext) {
      newSquares[index] = "🐶";
    } else {
      newSquares[index] = "🐱";
    }
    onPlay(newSquares);
  }

  const setStatus = calcWinner(squares);
  let status;
  if (setStatus) {
    if (setStatus.isDraw) {
      status = "Draw";
    } else {
      status = "Winner: " + setStatus.winner;
    }
  } else {
    status = "Next player: " + (dogIsNext ? "🐶" : "🐱");
  }

  return (
    <React.Fragment>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          highlightCells={setStatus?.line.includes(0)}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          highlightCells={setStatus?.line.includes(1)}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          highlightCells={setStatus?.line.includes(2)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          highlightCells={setStatus?.line.includes(3)}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          highlightCells={setStatus?.line.includes(4)}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          highlightCells={setStatus?.line.includes(5)}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          highkightCells={setStatus?.line.includes(6)}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          highkightCells={setStatus?.line.includes(7)}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          highkightCells={setStatus?.line.includes(8)}
        />
      </div>
    </React.Fragment>
  );
}

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
      return {
        winner: squares[a],
        isDraw: false,
        line: [a, b, c]
      };
    }
  }

  // 未入力欄が無いとき
  if (squares.filter((element) => !element).length === 0) {
    return {
      winner: null,
      isDraw: true,
      line: []
    };
  }

  return null;
}
