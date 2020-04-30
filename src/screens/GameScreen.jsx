import React from 'react';
import ControlPanel from '../components/game/ControlPanel/';
import Game from '../components/game/Game/';
import './GameScreen.scss';

export default function GameScreen() {
  return (
    <>
      <header className="game-screen__header">
        <ControlPanel />
      </header>
      <main className="game-screen__content">
        <Game />
      </main>
    </>
  );
}
