import { MouseEvent } from 'react';
import {
  TileInfo,
  // TileState,
  // Color
} from "../context/mine_board.ts"
import './tile.css'

export const Tile = ({tile, clickHandler}: {tile: TileInfo, clickHandler: Function}) => {
  const onClickHandle = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    clickHandler(tile['coord'])
  }
  return (
    <div className="tile" aria-contextmenu-coord={tile['coord']} onClick={onClickHandle}>
      {tile['value']}
    </div>
  )
}