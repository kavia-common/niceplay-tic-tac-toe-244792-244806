import React, { useMemo, useState } from "react";

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function getWinner(squares) {
  for (const [a, b, c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

function isDraw(squares, winner) {
  return !winner && squares.every((v) => v !== null);
}

// PUBLIC_INTERFACE
export default function App() {
  /** Root component for NicePlay Tic Tac Toe. */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const { winner, line } = useMemo(() => getWinner(squares), [squares]);
  const draw = useMemo(() => isDraw(squares, winner), [squares, winner]);

  const status = winner
    ? `Winner: ${winner}`
    : draw
      ? "Draw game"
      : `Current player: ${xIsNext ? "X" : "O"}`;

  function handleSquareClick(idx) {
    if (winner || squares[idx] !== null) return;

    const next = squares.slice();
    next[idx] = xIsNext ? "X" : "O";
    setSquares(next);
    setXIsNext((v) => !v);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="page">
      <main className="card" aria-label="NicePlay Tic Tac Toe">
        <header className="header">
          <div className="brand">
            <div className="logo" aria-hidden="true">
              NP
            </div>
            <div>
              <h1 className="title">NicePlay</h1>
              <p className="subtitle">Tic Tac Toe</p>
            </div>
          </div>

          <button className="button" onClick={handleRestart} type="button">
            Restart
          </button>
        </header>

        <section className="status" role="status" aria-live="polite">
          <span
            className={[
              "statusPill",
              winner ? "statusPill--win" : "",
              draw ? "statusPill--draw" : ""
            ].join(" ")}
          >
            {status}
          </span>
        </section>

        <section className="board" aria-label="3 by 3 board">
          {squares.map((value, idx) => {
            const isWinningSquare = line ? line.includes(idx) : false;

            return (
              <button
                key={idx}
                type="button"
                className={[
                  "square",
                  value ? "square--filled" : "",
                  isWinningSquare ? "square--win" : ""
                ].join(" ")}
                onClick={() => handleSquareClick(idx)}
                aria-label={`Square ${idx + 1}${value ? `: ${value}` : ""}`}
              >
                <span className="squareValue">{value}</span>
              </button>
            );
          })}
        </section>

        <footer className="footer">
          <p className="help">
            Tap a square to play. First to get 3 in a row wins.
          </p>
        </footer>
      </main>
    </div>
  );
}
