import React, { Component } from 'react';
import { connect } from 'react-redux';
import Square from '../Square/';
import './Field.scss';
import gameStatuses from '../../../configs/gameStatuses';
import playerTypes from '../../../configs/playerTypes';
import { gameActions, gameOperations } from '../../../store/game';

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

  componentDidMount() {
    const matrix = this.createMatrix(this.props.gameConfig.mode.field);
    this.setState({ fieldsMatrix: matrix });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gameConfig.mode.field !== this.props.gameConfig.mode.field) {
      const matrix = this.createMatrix(this.props.gameConfig.mode.field);
      this.setState({ fieldsMatrix: matrix });
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

  onMouseOverSquare = (e) => {
    this.replaceSquareProp(e.target.id, 'animation', animationStatuses.scale);
  };

  onAnimationEnd = (e) => {
    this.replaceSquareProp(e.target.id, 'animation', '');
  };

  onSquareClick = (e) => {
    this.replaceSquareProp(e.target.id, 'animation', animationStatuses.bigScale);
  };

  startGame = () => {};

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
