import React, { Component } from 'react';
import Square from '../Square/';
import './Field.scss';

const colorsConfig = Object.freeze({
  GREY: 'grey',
  GREEN: 'green',
  RED: 'red',
});

const fieldSquareStatuses = Object.freeze({
  DEFAULT: 'default',
  TAKEN: 'taken',
  LOST: 'lost',
});

const animationStatuses = Object.freeze({
  scale: 'scale',
  bigScale: 'bigScale',
});

const fieldSquareConfig = {
  color: colorsConfig.GREY,
  status: fieldSquareStatuses.DEFAULT,
  animation: '',
};

export default class Field extends Component {
  constructor(props) {
    super(props);

    // Simply creating the game field
    const fieldSize = 5;
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

    this.state = {
      fieldsMatrix: matrix,
      animation: '',
    };
  }

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

  replaceAnimation = (id, animation) => {
    const square = this.getSquareInMatrix(id);
    const newSquare = {
      ...square,
      animation: animation,
    };
    this.replaceSquareInMatrix(newSquare);
  };

  onMouseOverSquare = (e) => {
    this.replaceAnimation(e.target.id, animationStatuses.scale);
  };

  onAnimationEnd = (e) => {
    this.replaceAnimation(e.target.id, '');
  };

  onSquareClick = (e) => {
    this.replaceAnimation(e.target.id, animationStatuses.bigScale);
  };

  render() {
    return (
      <div className="game-field">
        {this.state.fieldsMatrix.map((el) => {
          return (
            <div
              className="game-field__row"
              key={this.state.fieldsMatrix.indexOf(el)}
            >
              {el.map((el) => {
                return (
                  <Square
                    id={el.id}
                    color={el.color}
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
