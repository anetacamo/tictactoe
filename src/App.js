import React, { Component } from "react";
import Board from "./components/board";
import './App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Board/>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
      </React.Fragment>
    );
  };
};

export default App;
