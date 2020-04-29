import React from 'react';
import './Square.scss';

export default function Square({ id, color }) {
  return <div className={`square ${color}`} id={id} />;
}
