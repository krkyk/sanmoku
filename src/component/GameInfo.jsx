export default function GameInfo({
  history,
  currentMove,
  jumpTo,
  isAsc,
  toggleAsc
}) {
  const moves = history.map((square, index) => {
    let description;
    if (currentMove === index) {
      description = { btnFlg: false, message: "You are at move #" + index };
    } else if (index > 0) {
      description = { btnFlg: true, message: "Go to move #" + index };
    } else {
      description = { btnFlg: true, message: "Go to game start" };
    }

    return (
      // mapなどループ処理でレンダリングするときは特定のためのkeyが必要
      <li key={index}>
        {description.btnFlg ? (
          <button className="move-btn" onClick={() => jumpTo(index)}>
            {description.message}
          </button>
        ) : (
          <span className="move-msg">{description.message}</span>
        )}
      </li>
    );
  });

  return (
    <div className="game-info">
      <button className="sort-btn" onClick={() => toggleAsc()}>
        asc ⇔ desc
      </button>
      <ol>{isAsc ? moves : moves.reverse()}</ol>
    </div>
  );
}
