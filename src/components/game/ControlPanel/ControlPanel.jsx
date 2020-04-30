import React, { Component } from 'react';
import gameModes from '../../../configs/gameModes';
import './ControlPanel.scss';

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
          className="control-panel__field control-panel__field--select"
          value={this.state.gameMode}
          onChange={this.onChange}
        >
          <option value="" disabled hidden>
            Pick game mode
          </option>
          <option className="select-option" value={gameModes.EASY}>
            Easy
          </option>
          <option className="select-option" value={gameModes.NORMAL}>
            Normal
          </option>
          <option className="select-option" value={gameModes.HARD}>
            Hard
          </option>
        </select>
        <input
          type="text"
          id="player-name"
          name="playerName"
          className="control-panel__field control-panel__field--input"
          maxLength="20"
          value={this.state.playerName}
          onChange={this.onChange}
        />
        <button type="submit" className="control-panel__button start">
          {buttonText.PLAY}
        </button>
      </form>
    );
  }
}
