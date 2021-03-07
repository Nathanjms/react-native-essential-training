import React from 'react';
import Game from './Game';

class App extends React.Component {
  state = {
    gameId: 1,
    winStreak: 0,
  };
  resetGame = (gameStatus) => {
    this.setState((prevState) => {
      return { gameId: prevState.gameId + 1 };
    });

    this.setState((prevState) => {
      if (gameStatus === 'WON') {
        return { winStreak: prevState.winStreak + 1 };
      }

      return { winStreak: 0 };
    });
  }
  render() {
    return (
      <Game
        key={this.state.gameId}
        onPlayAgain={this.resetGame}
        randomNumberCount={6}
        initialSeconds={12}
        winStreak={this.state.winStreak}
        globalWin={this.state.winStreak === 5}
      />
    );
  }
}

export default App;
