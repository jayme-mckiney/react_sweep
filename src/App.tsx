import { useState, useRef } from 'react'
import { Board } from './components/board.tsx'
import { MineBoard, TileInfo } from './context/mine_board.ts'
import './App.css'

function App() {
  const board = useRef(new MineBoard(9,9, 10))
  const [rows, setRows] = useState(Array.from(board.current.iterateRows()))

  const onClick = (coord) => {
    console.log(coord)
    board.current.checkCoord(coord)
    setRows(Array.from(board.current.iterateRows()))
  }
  return (
    <>
      <Board clickHandler={onClick} rows={rows} />
    </>
  )
}

export default App
