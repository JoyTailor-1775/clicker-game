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

const fieldSquareConfig = {
  color: colorsConfig.GREY,
  status: fieldSquareStatuses.DEFAULT,
};

export default class Field extends Component {
  constructor() {
    super();
    this.state = {
      fieldsMatrix: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
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
    console.log({ matrix });
    return { fieldsMatrix: matrix };
  }
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
                return <Square id={el.id} color={el.color} key={el.id} />;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
