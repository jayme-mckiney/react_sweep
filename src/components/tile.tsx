import { MouseEvent } from 'react';
import {
  TileInfo,
  // TileState,
} from "../context/mine_board.ts"
import Bomb from "./svg/bomb.svg?react";
import Flag from "./svg/flag.svg?react";
import Fog from "./svg/fog.svg?react";
import Zero from "./svg/zero.svg?react";
import One from "./svg/1.svg?react";
import Two from "./svg/2.svg?react";
import Three from "./svg/3.svg?react";
import Four from "./svg/4.svg?react";
import Five from "./svg/5.svg?react";
import Six from "./svg/6.svg?react";
import Seven from "./svg/7.svg?react";
import Eight from "./svg/8.svg?react";


import './tile.css'

enum NumeralTileClass {
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight
}

const TileInfoToSVG = {
  0: Zero,
  1: One,
  2: Two,
  3: Three,
  4: Four,
  5: Five,
  6: Six,
  7: Seven,
  8: Eight,
  "bomb": Bomb,
  "flag": Flag,
  "fog": Fog
}

export const Tile = ({tile, clickHandler}: {tile: TileInfo, clickHandler: Function}) => {
  const onClickHandle = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    clickHandler(tile['coord'])
  }
  let className =  NumeralTileClass[tile['value']]
  if(className == undefined) {
    className = tile['value']
  }
  const SVG = TileInfoToSVG[tile['value']]
  return (
    <div className={`tile ${className}`} aria-contextmenu-coord={tile['coord']} onClick={onClickHandle}>
     <SVG aria-contextmenu-coord={tile['coord']} onClick={onClickHandle} />
    </div>
  )
}