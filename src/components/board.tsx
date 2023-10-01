import {
  TileInfo
} from "../context/mine_board.ts"
import { Tile } from './tile.tsx'
import './board.css'



export const Board = ({rows, clickHandler, doFlag}: {rows: Array<Array<TileInfo>>, clickHandler: Function, doFlag: Function}) => {
  let jsxRows = new Array()
  let rowNum = 0
  for(let row of rows) {
    let tiles = new Array()
    let tileNum = 0
    for(let tile of row) {
      tiles.push((
        <Tile key={`tile${tileNum}`} clickHandler={clickHandler} tile={tile} />
      ))
      tileNum ++
    }
    jsxRows.push((
      <div key={`row${rowNum}`} className="row">
        {tiles}
      </div>
    ))
    rowNum ++
  }

  return (
    <>
      {jsxRows}
    </>
  )
}