import React from 'react';
import { connect } from 'react-redux';
import Field from '../Field/Field';
import './Game.scss';
import gameStatuses from '../../../configs/gameStatuses';
import playerTypes from '../../../configs/playerTypes';

const gameMessages = Object.freeze({
  beforeStart: `Let's play, fellow!`,
  gameIsGoing: 'Good luck, mate!',
  resumeGame: `Don't stop, mate!`,
  gameIsWon: `Wow! You've beated me! Crazy guy!`,
  gameOver: `Oops, You've Lost! Wanna try again?`,
});

function Game(props) {
  // Define a game message depending on the game status.
  let message;
  switch (props.gameStatus) {
    case gameStatuses.INITIAL:
      message = gameMessages.beforeStart;
      break;
    case gameStatuses.PAUSED:
      message = gameMessages.resumeGame;
      break;
    case gameStatuses.STARTED:
      message = gameMessages.gameIsGoing;
      break;
    case gameStatuses.FINISHED:
      if (props.lastWinner === playerTypes.COMPUTER) {
        message = gameMessages.gameOver;
      } else if (props.lastWinner === playerTypes.USER) {
        message = gameMessages.gameIsWon;
      }
      break;
    default:
      message = gameMessages.beforeStart;
      break;
  }
  return (
    <div className="game__wrapper">
      <h2 className="game__message">{message}</h2>
      <Field />
    </div>
  );
}

const mapStateToProps = (state) => ({
  gameStatus: state.game.gameStatus,
  lastWinner: state.game.lastWinner,
});

export default connect(mapStateToProps)(Game);
