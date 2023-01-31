import React from 'react';
import {calculateWinner} from './calculateWinner';

type BoardProps = {
  size: number;
  xIsNext: boolean,
  squares: string[],
  onPlay: any,
};

export function Board(props: BoardProps) {
  function handleClick(i: number){
    if (props.squares[i] !== "" || calculateWinner(props.squares)) return;
    const nextSquares = props.squares.slice();
    if (props.xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    props.onPlay(nextSquares)
  }

  let rows: number[] = [];
  for (let i = 0; i < props.size; i++) {
    rows.push(i);
  }

  const winner = calculateWinner(props.squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (props.xIsNext? "X" : "O");
  }
  return (
    <>
      <div className='status'>{status}</div>
      {rows.map((row, index) => <BoardRow size={props.size} number={index} squares={props.squares} onSquareClick={handleClick}/>)}
    </>
  );
}

type BoardRowProps = {
  size: number;
  number: number;
  squares: string[],
  onSquareClick: (i: number) => void,
};

function BoardRow(props: BoardRowProps) {
  let row: number[] = [];
  for (let i = 0; i < props.size; i++) {
    row.push(i);
  }
  return (
    <div className='board-row'>
      {row.map((item) => <Square value={props.squares[item + (props.number*props.size)]} number={item + (props.number*props.size)} onSquareClick={props.onSquareClick}/>)}
    </div>
  );
}

type SquareProps = {
  value: string,
  onSquareClick: (i: number) => void,
  number: number
}

function Square(props: SquareProps) {
  return <button className='square' onClick={() => props.onSquareClick(props.number)}>{props.value}</button>;
}