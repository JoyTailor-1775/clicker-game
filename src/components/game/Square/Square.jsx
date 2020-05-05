import React from 'react';
import './Square.scss';

export default function Square({
  id,
  color,
  animation,
  onClick,
  onMouseOver,
  onAnimationEnd,
}) {
  return (
    <div
      className={`square ${color} ${animation}`}
      id={id}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onAnimationEnd={onAnimationEnd}
    />
  );
}
