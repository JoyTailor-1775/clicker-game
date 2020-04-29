import React from "react"
import "./App.scss"

import GameScreen from "./screens/GameScreen"
import LeaderBoardScreen from "./screens/LeaderBoardScreen"

function App() {
  return (
    <main className="base-layout">
      <section className="base-layout__section">
        <GameScreen />
      </section>
      <section className="base-layout__section"></section>
      <LeaderBoardScreen />
    </main>
  )
}

export default App
