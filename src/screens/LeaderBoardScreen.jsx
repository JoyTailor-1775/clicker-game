import React from 'react';
import Table from '../components/leader-board/Table';

export default function LeaderBoardScreen() {
  return (
    <section className="leader-board">
      <h2 className="leader-board__title">Leader Board</h2>
      <Table />
    </section>
  );
}
