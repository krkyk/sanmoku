import React, { useState } from "react";
import Board from "./component/Board";
import GameInfo from "./component/GameInfo";

// default=メインの関数
export default function Game() {
  const [dogIsNext, setDogIsNext] = useState(true);
  /**
   * immutability(不変性)：元の配列を直接変更せずにfillでコピーしている
   * → 以前のデータの保持と再レンダリングの効率化(同じ場所は再レンダリングしない)
   */
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAsc, setIsAsc] = useState(true);
  const currentSquares = history[currentMove];

  //履歴を遡ったら履歴自体を更新
  function handlePlay(newSquares) {
    const newHistory = [...history.slice(0, currentMove + 1), newSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
    setDogIsNext(!dogIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setDogIsNext(nextMove % 2 === 0);
  }

  function toggleAsc() {
    setIsAsc(!isAsc);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          dogIsNext={dogIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <GameInfo
        history={history}
        currentMove={currentMove}
        jumpTo={jumpTo}
        isAsc={isAsc}
        toggleAsc={toggleAsc}
      />
    </div>
  );
}
