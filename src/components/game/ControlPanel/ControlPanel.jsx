import React, { Component } from 'react';
import gameModes from '../../../configs/gameModes';

const buttonText = Object.freeze({
  PLAY: 'Play',
  PAUSE: 'Pasue',
  PLAY_AGAIN: 'Play Again',
});

export default class ControlPanel extends Component {
  constructor() {
    super();
    this.state = {
      gameMode: '',
      playerName: '',
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form is submitted');
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <form className="control-panel" onSubmit={this.onFormSubmit}>
        <select
          id="gameMode"
          name="gameMode"
          className="control-panel__field control-panel__field--control"
          value={this.state.gameMode}
          onChange={this.onChange}
        >
          <option value="">Pick game mode...</option>
          <option value={gameModes.EASY}>{gameModes.EASY}</option>
          <option value={gameModes.NORMAL}>{gameModes.NORMAL}</option>
          <option value={gameModes.HARD}>{gameModes.HARD}</option>
        </select>
        <input
          type="text"
          id="player-name"
          name="playerName"
          className="control-panel__field control-panel__field--input"
          value={this.state.playerName}
          onChange={this.onChange}
        />
        <button type="submit" className="control-panel__button">
          {buttonText.PLAY}
        </button>
      </form>
    );
  }
}
