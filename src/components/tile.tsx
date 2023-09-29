import {
  TileInfo,
  TileState,
  Color
} from "../context/mine_board.ts"
import './tile.css'

export const Tile = ({tile, clickHandler}) => {
  const onClick = (event) => {
    clickHandler(tile['coord'])
  }
  return (
    <div className="tile" onClick={onClick}>
      {tile['value']}
    </div>
  )
}