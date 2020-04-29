import React, { Component } from 'react';
import Field from '../Field/Field';

const gameMessages = Object.freeze({
  beforeStart: `Let's play, fellow!`,
  gameIsGoing: 'Good luck, mate!',
  gameIsWon: `Wow! You've beated me! Crazy guy!`,
  gameOver: `Oops, You've Lost! Wanna try again?`,
});

export default class Game extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="message">{gameMessages.beforeStart}</div>
        <Field />
      </>
    );
  }
}
