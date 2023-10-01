import { MouseEventHandler } from 'react';
import { GameState } from './context/mine_board.ts'
import Smiley from "./svg/smiley.svg?react";
import Frown from "./svg/frown.svg?react";
import Shades from "./svg/shades.svg?react";
import './status_bar.css'


export const StatusBar = ({minesRemaining, score, gameState, clickHandler}: {minesRemaining: number, score: number, gameState: GameState, clickHandler: MouseEventHandler}) => {
  let svg
  console.log(gameState)
  switch(gameState) {
  case 'boom':
    svg = <Frown onClick={clickHandler} />
    break;
  case 'win':
    svg = <Shades onClick={clickHandler} />
    break;
  case 'active':
    svg = <Smiley onClick={clickHandler} />
    break
  }
  return (
    <div className="statusbar">
      <div className="mines-remaining">{minesRemaining}</div>
      <div className="smiley-button" onClick={clickHandler} >{svg}</div>
      <div className="score">{score}</div>
    </div>
  )
}