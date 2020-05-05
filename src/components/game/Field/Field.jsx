import React, { Component } from 'react';
import { connect } from 'react-redux';
import Square from '../Square/';
import './Field.scss';
import gameStatuses from '../../../configs/gameStatuses';
import playerTypes from '../../../configs/playerTypes';
import { gameActions, gameOperations } from '../../../store/game';
import getRandomInt from '../../../helpers/getRandomInt';

const colorsConfig = Object.freeze({
  GREY: 'grey',
  GREEN: 'green',
  RED: 'red',
  BLUE: 'blue',
});

const fieldSquareStatuses = Object.freeze({
  DEFAULT: 'default',
  HIGHLIGHTED: 'highlighted',
  TAKEN: 'taken',
  LOST: 'lost',
});

const animationStatuses = Object.freeze({
  scale: 'scale',
  bigScale: 'bigScale',
});

const fieldSquareConfig = {
  status: fieldSquareStatuses.DEFAULT,
  animation: '',
};

class Field extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldsMatrix: [],
      intervalId: null,
      highlightedFieldId: null,
    };
  }

  // Simply creates the game field
  createMatrix = (fieldSize) => {
    const matrix = [];
    let id = 0;
    for (let i = 0; i < fieldSize; i++) {
      let row = [];
      for (let j = 0; j < fieldSize; j++) {
        row.push({
          id: id,
          ...fieldSquareConfig,
        });
        id = ++id;
      }
      matrix.push(row);
    }
    return matrix;
  };

  // Creates fields matrix for initial render
  componentDidMount() {
    const matrix = this.createMatrix(this.props.gameConfig.mode.field);
    this.setState({ fieldsMatrix: matrix });
  }

  componentDidUpdate(prevProps) {
    // Creates matrix for all subsequent changes in the game's config.
    if (prevProps.gameConfig.mode.field !== this.props.gameConfig.mode.field) {
      const matrix = this.createMatrix(this.props.gameConfig.mode.field);
      this.setState({ fieldsMatrix: matrix });
    }

    // Checks if, there is a new game to be started, and if so - recreates the game
    // field matrix.
    if (
      (prevProps.gameStatus === gameStatuses.INITIAL ||
        prevProps.gameStatus === gameStatuses.FINISHED) &&
      prevProps.gameStatus !== this.props.gameStatus
    ) {
      const newMatrix = this.createMatrix(this.props.gameConfig.mode.field);
      this.setState({ fieldsMatrix: newMatrix, highlightedFieldId: null });
    }

    // Runs a game, if the game status has been changed to a corresponding one.
    if (
      prevProps.gameStatus !== this.props.gameStatus &&
      this.props.gameStatus === gameStatuses.STARTED
    ) {
      const intervalId = this.runGame();
      this.setState({ intervalId: intervalId });
    }

    // Pauses the game, if the game status has been changed to a corresponding one.
    if (
      prevProps.gameStatus !== this.props.gameStatus &&
      this.props.gameStatus === gameStatuses.PAUSED
    ) {
      this.pauseGame();
    }
  }

  // This method searches a fieldMatrix for the neccessary element and returns it.
  getSquareInMatrix = (id) => {
    let square;
    const matrix = [...this.state.fieldsMatrix];
    matrix.forEach((el) => {
      const searchResult = el.find((elem) => Number(elem.id) === Number(id));
      if (searchResult) {
        square = searchResult;
        return;
      }
    });
    return square;
  };

  // This method searches a fieldMatrix for the neccessary element, replaces it
  // with the new one and updates the component state.
  replaceSquareInMatrix = async (newElem) => {
    const matrix = [...this.state.fieldsMatrix];
    matrix.forEach((el) => {
      const searchResult = el.find((elem) => Number(elem.id) === Number(newElem.id));
      if (searchResult) {
        el[el.indexOf(searchResult)] = newElem;
        return;
      }
    });
    await this.setState({
      fieldsMatrix: matrix,
    });
  };

  // This method replaces passed prop of a matrix element with the passed id.
  replaceSquareProp = (id, prop, value) => {
    const square = this.getSquareInMatrix(id);
    const newSquare = {
      ...square,
      [prop]: value,
    };
    this.replaceSquareInMatrix(newSquare);
  };

  // This method filters matrix fields with the passed value, and returns a new
  // filtered array, if there is now value returns flattened array of matrix fields.
  filterMatrix = (filter) => {
    function filterFunc(elem) {
      return filter ? elem.status === filter : elem;
    }
    let filteredArr = [];
    this.state.fieldsMatrix.forEach((arr) => {
      const res = arr.filter(filterFunc);
      filteredArr = [...filteredArr, ...res];
    });
    return filteredArr;
  };

  // Runs scale animation.
  onMouseOverSquare = (e) => {
    this.replaceSquareProp(e.target.id, 'animation', animationStatuses.scale);
  };

  // Removes animation status.
  onAnimationEnd = (e) => {
    this.replaceSquareProp(e.target.id, 'animation', '');
  };

  // Highlights square with passed id.
  highlightSquare = (id) => {
    this.replaceSquareProp(id, 'status', fieldSquareStatuses.HIGHLIGHTED);
  };

  // Markes square with passed id as taken by computer.
  loseSquare = (id) => {
    this.replaceSquareProp(id, 'status', fieldSquareStatuses.LOST);
  };

  // Markes square with passes id as taken by user.
  takeSquare = (id) => {
    this.replaceSquareProp(id, 'status', fieldSquareStatuses.TAKEN);
  };

  onSquareClick = (e) => {
    // Runs big scale animation on click.
    this.replaceSquareProp(e.target.id, 'animation', animationStatuses.bigScale);

    // Checks if the clicked square is highlighted, if so - gives the square
    // to a user.
    const square = this.getSquareInMatrix(e.target.id);
    if (square.status === fieldSquareStatuses.HIGHLIGHTED) {
      this.takeSquare(square.id);
      this.setState({ highlightedFieldId: null });
    }
  };

  // Check if number of fields, that are taken by user or the ones taken by computer
  // exceeds the 50% of game field. Returns winner type, if so, or null if there is
  // no winner yet.
  checkWinner = () => {
    const allFields = this.filterMatrix();
    const userFields = this.filterMatrix(fieldSquareStatuses.TAKEN);
    const computerFields = this.filterMatrix(fieldSquareStatuses.LOST);
    const halfOfFields = Math.ceil(allFields.length / 2);
    if (userFields.length >= halfOfFields) {
      return playerTypes.USER;
    }
    if (computerFields.length >= halfOfFields) {
      return playerTypes.COMPUTER;
    }
    return null;
  };

  // Creates new game session interval.
  runGame = () => {
    const gameIteration = async () => {
      console.log(this.state, 'state before');
      // If there is a highlighted field, from the previous iteration - gives
      // it to computer.
      console.log(this.state.highlightedFieldId, 'highlighted id');
      if (this.state.highlightedFieldId !== null) {
        await this.loseSquare(this.state.highlightedFieldId);
      }

      // Checks if there is a winner, and if so - finish the game.
      const winner = this.checkWinner();
      if (winner) {
        this.finishGame(winner);
        return;
      }

      // Highlightes random square among the default ones.
      const defaultFields = this.filterMatrix(fieldSquareStatuses.DEFAULT);
      console.log(defaultFields, 'defaultFields');
      const randomFieldId = getRandomInt(defaultFields.length - 1);
      console.log(randomFieldId, 'randomFieldId');
      const field = defaultFields[randomFieldId];
      console.log(field, 'field object');
      this.highlightSquare(field.id);
      await this.setState({ highlightedFieldId: field.id });
      console.log(this.state, 'state after');
    };
    return setInterval(gameIteration, this.props.gameConfig.mode.delay);
  };

  // Clear game session interval.
  pauseGame = () => {
    clearInterval(this.state.intervalId);
  };

  // Changes game status to FINISHED in the redux store, updates winners list and
  // lastWinner prop.
  finishGame = (winner) => {
    clearInterval(this.state.intervalId);
    this.props.setGameStatus(gameStatuses.FINISHED);
    const winnerObj = {
      name: winner === playerTypes.USER ? this.props.gameConfig.playerName : winner,
      type: winner,
    };
    this.props.updateWinners(winnerObj);
  };

  render() {
    return (
      <div
        className={`game-field ${
          this.props.gameStatus && this.props.gameStatus === gameStatuses.STARTED
            ? ''
            : 'disabled'
        }`}
      >
        {this.state.fieldsMatrix.map((el) => {
          return (
            <div
              className="game-field__row"
              key={this.state.fieldsMatrix.indexOf(el)}
            >
              {el.map((el) => {
                // Set square color status, depending on it's status
                let color;
                switch (el.status) {
                  case fieldSquareStatuses.DEFAULT:
                    color = colorsConfig.GREY;
                    break;
                  case fieldSquareStatuses.HIGHLIGHTED:
                    color = colorsConfig.BLUE;
                    break;

                  case fieldSquareStatuses.TAKEN:
                    color = colorsConfig.GREEN;
                    break;

                  case fieldSquareStatuses.LOST:
                    color = colorsConfig.RED;
                    break;

                  default:
                    color = colorsConfig.GREY;
                    break;
                }
                return (
                  <Square
                    id={el.id}
                    color={color}
                    key={el.id}
                    animation={el.animation}
                    onClick={this.onSquareClick}
                    onMouseOver={this.onMouseOverSquare}
                    onAnimationEnd={this.onAnimationEnd}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameConfig: state.game.gameConfig,
  gameStatus: state.game.gameStatus,
  loading: state.game.loading,
});

const MapDispatchToProps = {
  setGameStatus: gameActions.setGameStatus,
  updateWinners: gameOperations.updateWinners,
};

export default connect(mapStateToProps, MapDispatchToProps)(Field);
