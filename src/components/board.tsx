import {
  TileInfo
} from "../context/mine_board.ts"
import { Tile } from './tile.tsx'
import './board.css'



export const Board = ({rows, clickHandler}: {rows: Array<Array<TileInfo>>, clickHandler: Function}) => {
  let jsxRows = new Array()
  for(let row of rows) {
    let tiles = new Array()
    for(let tile of row) {
      tiles.push((
        <Tile clickHandler={clickHandler} tile={tile} />
      ))
    }
    jsxRows.push((
      <div className="row">
        {tiles}
      </div>
    ))
  }

  return (
    <>
      {jsxRows}
    </>
  )
}