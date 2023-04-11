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

  const MAX_ROW = 3;
  const MAX_COL = 3;
  // 全てのマスを入れる配列
  const squareBoard = [];
  for (let row = 0; row < MAX_ROW; row++) {
    // マス一列分の配列
    const rowBoard = [];
    for (let col = 0; col < MAX_COL; col++) {
      const index = MAX_COL * row + col;
      rowBoard.push(
        <Square
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          highlightCells={setStatus?.line.includes(index)}
          key={col}
        />
      );
    }
    squareBoard.push(
      <div className="board-row" key={row}>
        {rowBoard}
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="status">{status}</div>
      {squareBoard}
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
