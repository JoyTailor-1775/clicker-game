import React from 'react';
import Table from '../components/leader-board/Table';
import './LeaderBoardScreen.scss';

export default function LeaderBoardScreen() {
  return (
    <div className="leader-board">
      <h2 className="leader-board__title">Leader Board</h2>
      <Table />
    </div>
  );
}
