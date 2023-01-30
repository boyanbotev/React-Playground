import React, {useState} from 'react';


type BoardProps = {
  size: number;
};

export function Board(props: BoardProps) {
  const [isNext, setIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(props.size*props.size).fill(""));

  function handleClick(i: number){
    if (squares[i] !== "") return;
    const nextSquares = squares.slice();
    if (isNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    setIsNext(prev => !prev);
  }

  let rows: number[] = [];
  for (let i = 0; i < props.size; i++) {
    rows.push(i);
  }
  return (
    <>
      {rows.map((row, index) => <BoardRow size={props.size} number={index} squares={squares} onSquareClick={handleClick}/>)}
    </>
  );
}

type BoardRowProps = {
  size: number;
  number: number;
  squares: string[],
  onSquareClick: any,
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
  onSquareClick: any,
  number: number
}

function Square(props: SquareProps) {
  // console.log(props.number);
  return <button className='square' onClick={() => props.onSquareClick(props.number)}>{props.value}</button>;
}
