import React, { Component } from 'react';
import './Table.scss';

const testData = [
  {
    id: 0,
    name: 'Someone Someonov',
    date: '4 Jul 2018',
  },
  {
    id: 1,
    name: 'Someone Someonov',
    date: '2 Jan 2016',
  },
  {
    id: 2,
    name: 'Someone Someonov',
    date: '3 Jan 2017',
  },
];

export default class Table extends Component {
  render() {
    return (
      <ul className="leaders-table">
        {testData.map((el) => {
          return (
            <li className="leaders-table__row" key={el.id}>
              <span className="leaders-table__text name">{el.name}</span>
              <span className="leaders-table__text date">{el.date}</span>
            </li>
          );
        })}
      </ul>
    );
  }
}
