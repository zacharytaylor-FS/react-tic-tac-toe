import React, { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
  <button className="square" onClick={onSquareClick}>{value}</button>
  )
}

function Board({xIsNext, squares, onPlay}) {
    
  function handleClick(i){
    // Check if square has X or 0
    if(calculatorWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X'
      console.log(`O's turn`)
    } else {
      nextSquares[i] = 'O'
      console.log(`X's turn`)
    }
    onPlay(nextSquares)
    // setSquares(nextSquares)
    // setXIsNext(!xIsNext)
  }

  const winner = calculatorWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() =>handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() =>handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() =>handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() =>handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() =>handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() =>handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() =>handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() =>handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() =>handleClick(8)}/>
      </div>
    </div>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const currentSquares = history[history.length - 1]

  function handlePlay(nextSquares) {
    // TODO
    setHistory([...history, nextSquares])
    setXIsNext(!xIsNext)
  }

  function jumpTo(nextMove) {
    //TODO
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

 // Helper Function
function calculatorWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && [squares[a]] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}