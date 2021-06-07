import React, { useState } from 'react';
import Button from './button';
import { useEffect } from 'react';

const Board = () => {
  const [width, setWidth] = useState(3);
  const [player, setPlayer] = useState('X');
  const [squares, setSquares] = useState([]);
  const [widths, setWidths] = useState([3, 4, 6, 10, 20]);
  const [winner, setWinner] = useState('');

  useEffect(() => {
    const fields = Array(width * width).fill(null);
    setSquares(fields);
    setWinner('');
  }, [width]);

  const handleClick = (i) => {
    if (squares[i] === null) {
      squares[i] = player;
      setSquares(squares);
      var turn = player;
      player === 'X' ? (turn = 'O') : (turn = 'X');
      setPlayer(turn);
      calculateWinner();
    }
  };

  const calculateWinner = () => {
    const makeLines = (direction) => {
      while (direction.length > 0) {
        chunk = direction.splice(0, width);
        lines.push(chunk);
      }
    };

    const lines = [];
    var chunk;
    var i;
    var j;
    var squared = width * width + 1;
    var horizontals = [];

    //Horizontals
    for (i = 1; i < squared; i++) {
      horizontals.push(i);
    }
    makeLines(horizontals);

    //Verticals
    for (i = 1; i < width + 1; i++) {
      for (j = i; j < squared; j += width) {
        horizontals.push(j);
      }
    }
    makeLines(horizontals);

    //Diagonals
    for (i = 1; i < width + 1; i++) {
      for (j = i; j < i * width - 1; j += width - 1) {
        horizontals.push(j);
      }
    }
    for (i = 1; i < width + 1; i++) {
      chunk = horizontals.splice(0, i);
      lines.push(chunk);
    }

    //Diagonals II
    for (i = 1; i < width + 1; i++) {
      for (j = i; j < squared - (width * i - width); j += width + 1) {
        horizontals.push(j);
      }
    }
    for (i = width; i > 0; i--) {
      chunk = horizontals.splice(0, i);
      lines.push(chunk);
    }

    var printing = '';
    lines.forEach((line) => {
      line.forEach((l) => (printing = printing + squares[l - 1]));
      printing = printing + '-';
    });

    if (printing.includes('XXX')) {
      setWinner('X wins!');
    }
    if (printing.includes('OOO')) {
      setWinner('O wins!');
    }
  };

  return (
    <div>
      <div className='button-large' onClick={() => setWidth(3)}>
        New Game
      </div>
      {widths.map((width) => (
        <p key={width} onClick={() => setWidth(width)} className='button'>
          play {width}x{width}
        </p>
      ))}
      <div className='status'>Next player {player}</div>
      <div className='status'>{winner}</div>
      <div className={`board-container width-${width}`}>
        {squares.map((square, index) => (
          <Button
            value={squares[index]}
            key={index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
