import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ControlPanel.scss';
import { gameActions, gameOperations } from '../../../store/game';
import gameStatuses from '../../../configs/gameStatuses';

const buttonTextConfig = Object.freeze({
  PLAY: 'Play',
  RESUME: 'Resume',
  PAUSE: 'Pause',
  PLAY_AGAIN: 'Play Again',
});

class ControlPanel extends Component {
  constructor() {
    super();
    this.state = {
      gameMode: '',
      playerName: '',
    };
  }

  // Here available game settings are requested from a server.
  async componentDidMount() {
    await this.props.requestGameSettings();
    console.log(this.props.availableSettings);
  }

  // This method created a new game config based on selected params by the user
  updateGameConfig = () => {
    const params = {
      mode: this.props.availableSettings[this.state.gameMode],
      playerName: this.state.playerName,
    };
    this.props.setGameConfig(params);
  };

  // This method defines new game status, based on a previous one
  // and the new one is passed to redux props.
  updateGameStatus = () => {
    let newStatus;
    switch (this.props.gameStatus) {
      case gameStatuses.INITIAL:
      case gameStatuses.PAUSED:
      case gameStatuses.FINISHED:
        newStatus = gameStatuses.STARTED;
        break;

      case gameStatuses.STARTED:
        newStatus = gameStatuses.PAUSED;
        break;

      default:
        newStatus = gameStatuses.INITIAL;
        break;
    }
    this.props.setGameStatus(newStatus);
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    // Primitive silent validation.
    if (!this.state.gameMode || !this.state.playerName) {
      return;
    }

    // Updates a game config, only if the game has been finished before.
    if (
      this.props.gameStatus === gameStatuses.INITIAL ||
      this.props.gameStatus === gameStatuses.FINISHED
    ) {
      this.updateGameConfig();
    }

    // In all the cases game status should be updated.
    this.updateGameStatus();
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    // Here inner content and appearance of the submit button is defined
    let submitButtonText, submitButtonStatusClass;
    switch (this.props.gameStatus) {
      case gameStatuses.INITIAL:
        submitButtonText = buttonTextConfig.PLAY;
        submitButtonStatusClass = 'start';
        break;

      case gameStatuses.PAUSED:
        submitButtonText = buttonTextConfig.RESUME;
        submitButtonStatusClass = 'start';
        break;

      case gameStatuses.STARTED:
        submitButtonText = buttonTextConfig.PAUSE;
        submitButtonStatusClass = 'pause';
        break;

      case gameStatuses.FINISHED:
        submitButtonText = buttonTextConfig.PLAY_AGAIN;
        submitButtonStatusClass = 'start';
        break;

      default:
        submitButtonText = buttonTextConfig.PLAY;
        submitButtonStatusClass = 'start';
        break;
    }

    return (
      <form className="control-panel" onSubmit={this.onFormSubmit}>
        <select
          id="gameMode"
          name="gameMode"
          disabled={
            this.props.loading || this.props.gameStatus === gameStatuses.STARTED
              ? true
              : false
          }
          className={`control-panel__field control-panel__field--select ${
            this.props.loading || this.props.gameStatus === gameStatuses.STARTED
              ? 'disabled'
              : ''
          }`}
          value={this.state.gameMode}
          onChange={this.onChange}
        >
          <option value="" disabled hidden>
            {this.props.loading ? 'Loading...' : 'Pick game mode'}
          </option>
          {!this.props.availableSettings
            ? []
            : Object.keys(this.props.availableSettings).map((el) => {
                return (
                  <option className="select-option" value={el} key={el}>
                    {el.slice(0, el.length - 4)}
                  </option>
                );
              })}
        </select>
        <input
          type="text"
          id="player-name"
          name="playerName"
          disabled={
            this.props.loading || this.props.gameStatus === gameStatuses.STARTED
              ? true
              : false
          }
          className={`control-panel__field control-panel__field--input ${
            this.props.loading || this.props.gameStatus === gameStatuses.STARTED
              ? 'disabled'
              : ''
          }`}
          maxLength="20"
          value={this.state.playerName}
          onChange={this.onChange}
        />
        <button
          type="submit"
          className={`control-panel__button ${submitButtonStatusClass} ${
            this.props.loading ? 'disabled' : 'active'
          }`}
          disabled={this.props.loading}
        >
          {submitButtonText}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  gameConfig: state.game.gameConfig,
  gameStatus: state.game.gameStatus,
  availableSettings: state.game.availableSettings,
  loading: state.game.loading,
});

const MapDispatchToProps = {
  setGameConfig: gameActions.setGameConfig,
  setGameStatus: gameActions.setGameStatus,
  requestGameSettings: gameOperations.requestGameSettings,
};

export default connect(mapStateToProps, MapDispatchToProps)(ControlPanel);
