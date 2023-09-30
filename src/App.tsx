import { useState, useRef, useEffect, MouseEvent } from 'react'
import { Board } from './components/board.tsx'
import { MineBoard, TileInfo } from './context/mine_board.ts'
import { Coord } from './context/grid.ts'
import './App.css'

function App() {
  const board = useRef(new MineBoard(9,9, 10))
  const [rows, setRows]: [rows: Array<Array<TileInfo>>, Function] = useState(Array.from(board.current.iterateRows()))

  const handleRightClick = (event) => {
    event.preventDefault()
    if(event.target.attributes['aria-contextmenu-coord']) {
      console.log(event.target.attributes['aria-contextmenu-coord'].value)
      let values: Array<number> = event.target.attributes['aria-contextmenu-coord'].value.split(',').map((x: string) => parseInt(x))
      let coord: Coord = [values[0], values[1]]
      board.current.flagCoord(coord)
      setRows(Array.from(board.current.iterateRows()))
    }
  }

  useEffect(() => {
    document.addEventListener("contextmenu", handleRightClick)
    return () => {
      document.removeEventListener("contextmenu", handleRightClick)
    };
  })

  const onClick = (coord: Coord) => {
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
