import React, { Component } from "react";
import Button from "./button";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 3,
      squares: Array(9).fill(null),
      widths: [3,4,6,10],
      player: "X",
      winner: ""
    };
  }
  handleClick(i) {
    const squares = this.state.squares;
    if (squares[i] === null) {
      squares[i] = this.state.player;
      this.setState({squares});
      var player = this.state.player;
      player === "X" ? player = "O" : player = "X"
      this.setState({player});
    }
  }
  updateArray(number) {
    const squares = Array(number * number).fill(null)
    this.setState({squares});
    this.setState({ width:number });
  }

  calculateWinner() {
    const squares = this.state.squares;
    const lines = [];

    //VERTICAL
    var width = this.state.width;
    var horizontals = [];
    for (var i, i = 0; i < (width*width); i++) {
      horizontals.push(i);
    }
    var chunk
    while (horizontals.length > 0) {
      chunk = horizontals.splice(0,width)
      lines.push(chunk)
    }

    var verticals = [];
    for (var i, i = 0; i < width; i++) {
      for (var j, j = i; j < (width*width); j+=(width)) {
        verticals.push(j);
      }
    }
    var chunk
    while (verticals.length > 0) {
      chunk = verticals.splice(0,width)
      lines.push(chunk)
    }


    //DIAGONALS
    var diagonals = [];
    var row = 3

    // here we only want top right
    for (var i, i = (row - 1); i < width; i++) {
      for (var j, j = i; j < (width*width); j+=(width-1)) {
      }
    }

    // top left
    for (var i, i = 0; i < (width - row + 1); i++) {
      for (var j, j = i; j < (width*width); j+=(width+1)) {
      }
    }


    var printing = "";

    lines.forEach(function(line) {
      printing = printing + "-";
      line.forEach(function(item) {
        if (squares[item] !== null) {
          printing = printing + squares[item];
        }
      });
    })
    var winner = "";
    console.log(printing)

    if (printing.includes("XXX")) {
      return winner = "X made 3!";
      console.log(winner)
    }
    if (printing.includes("XXXX")) {
      return winner = "X made 4!";
    }
    if (printing.includes("XXXXX")) {
      return winner = "X made 5!";
    }
    if (printing.includes("OOO")) {
      return winner = "O made 3!";
    }
    if (printing.includes("OOOO")) {
      return winner = "O made 4!";
      console.log(winner)
    }
    if (printing.includes("OOOOO")) {
      return winner = "O made 5!";
    }
  }

  render () {
    var winner = this.calculateWinner();
    let nextturn = 'Next player: ' + this.state.player;
    return(
      <div>
        <button onClick={() => this.updateArray(3)}>New Game</button>

        {this.state.widths.map(width =>
          <p onClick={() => this.updateArray(width)}>play {width}x{width}</p>
        )}

        <div className="status">{nextturn}</div>
        <div className="status">{winner}</div>
        <div className={`board-container width-${this.state.width}`}>
          {this.state.squares.map((square,index) =>
            <Button
              onClick={() => this.handleClick(index)}
              value={this.state.squares[index]}
              key={index}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Board;
