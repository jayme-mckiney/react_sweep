import { useState, useRef, useEffect, MouseEvent } from 'react'
import { Board } from './components/board.tsx'
import { StatusBar } from './components/status_bar.tsx'
import { MineBoard, TileInfo, GameState } from './context/mine_board.ts'
import { Coord } from './context/grid.ts'
import './App.css'

function App() {
  const board = useRef(new MineBoard(9,9, 10))
  const [rows, setRows]: [rows: Array<Array<TileInfo>>, Function] = useState(Array.from(board.current.iterateRows()))
  const [score, setScore]: [number, Function] = useState(board.current.score())
  const [minesRemaining, setMinesRemaining]: [number, Function] = useState(board.current.unflagged())
  const [gameState, setGameState]: [GameState, Function] = useState(board.current.gameState())

  const doFlag = (coord:Coord) => {
    board.current.flagCoord(coord)
    updateAll()
  }

  const updateAll = () => {
    setMinesRemaining(board.current.unflagged())
    setRows(Array.from(board.current.iterateRows()))
    setScore(board.current.score())
    setGameState(board.current.gameState())
  }

  const check = (coord: Coord) => {
    if (gameState != 'active') return
    board.current.checkCoord(coord)
    updateAll()
  }
  const smileyClick = (e: MouseEvent) => {
    e.preventDefault()
    board.current.reset()
    updateAll()
  }

  return (
    <>
      <StatusBar minesRemaining={minesRemaining} score={score} gameState={gameState} clickHandler={smileyClick} />
      <Board doFlag={doFlag} doCheck={check} rows={rows} />
    </>
  )
}

export default App
