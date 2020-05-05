import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Table.scss';
import { gameOperations } from '../../store/game';

class Table extends Component {
  async componentDidMount() {
    await this.props.requestWinners();
  }
  render() {
    return (
      <ul className="leaders-table">
        {this.props.winners &&
          this.props.winners.reverse().map((el) => {
            return (
              <li className="leaders-table__row" key={el.id}>
                <span className="leaders-table__text name">{el.winner}</span>
                <span className="leaders-table__text date">{el.date}</span>
              </li>
            );
          })}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  winners: state.game.winners,
});

const mapDispatchToProps = {
  requestWinners: gameOperations.requestWinners,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
