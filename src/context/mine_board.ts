import {Grid, Coord} from "./grid.ts"

export type TileState = number | "bomb"
export type MaskState = "fog" | "clear" | "flag"
export type GameState = "active" | "boom" | "win"
export interface TileInfo {
  value: TileState | MaskState,
  coord: Coord
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

export class MineBoard {
  #width: number;
  #height: number;
  #bombCount: number;
  #flagged: number;
  #score: number;
  #gameState: GameState;
  #tiles: Grid<TileState>;
  #mask: Grid<MaskState>;
  constructor(width: number, height: number, bombCount: number, initialTileState: Array<TileState> = []) {
    this.#width = width
    this.#height = height
    this.#bombCount = bombCount
    this.#gameState = "active"
    this.#flagged = 0
    this.#score = 0
    this.#mask = new Grid<MaskState>(this.#width, this.#height, "fog")
    this.#tiles = new Grid<TileState>(this.#width, this.#height, 0)
    if(initialTileState.length == 0) {
      this.#plantBombs()
    } else {
      // this exists for testing purposes
      let i = 0
      for(let coord of this.#tiles.iterateCoords()) {
        this.#tiles.set(coord, initialTileState[i])
        i ++
      }
    }
    this.#numberTiles()
  }
  reset() {
    this.#gameState = "active"
    this.#flagged = 0
    this.#score = 0
    this.#mask = new Grid<MaskState>(this.#width, this.#height, "fog")
    this.#tiles = new Grid<TileState>(this.#width, this.#height, 0)
    this.#plantBombs()
    this.#numberTiles()
  }
  #plantBombs() {
    let coords = Array<Coord>()
    for(let coord of this.#tiles.iterateCoords()) {
      coords.push(coord)
    }
    for(let i = 0; i < this.#bombCount; i++) {
      let index = getRandomInt(coords.length)
      this.#tiles.set(coords[index], "bomb")
      coords.splice(index, 1)
    }
  }
  #numberTiles() {
    for(let coord of this.#tiles.iterateCoords()) {
      if(this.#tiles.get(coord) == "bomb")
        continue
      let neighborBombs = 0
      for(let neighborCoord of this.#tiles.iterateNeighborCoords(coord)) {
        if(this.#tiles.get(neighborCoord) == "bomb")
          neighborBombs ++
      }
      this.#tiles.set(coord, neighborBombs)
    }
  }
  clearFog() {
    for(let coord of this.#tiles.iterateCoords()) {
      if(this.#mask.get(coord) == "fog") {
        this.#mask.set(coord, "clear")
        if(this.#tiles.get(coord) == "bomb") {
          this.#gameState = "boom"
        }
      }
    }
    this.gameStateCheck()
  }
  unflagged() {
    return (this.#bombCount - this.#flagged)
  }
  score() {
    return this.#score
  }
  gameStateCheck() {
    if(this.#gameState == 'boom' || this.#flagged != this.#bombCount) {
      return
    }
    for(let coord of this.#mask.iterateCoords()) {
      if(this.#mask.get(coord) == 'fog') {
        return
      }
    }
    this.#gameState = "win"
  }
  gameState(): GameState {
    return this.#gameState
  }
  flagCoord(coord:Coord) {
    if(this.#mask.get(coord) == 'fog') {
      this.#mask.set(coord, 'flag')
      this.#flagged ++
    } else if(this.#mask.get(coord) == "flag") {
      this.#mask.set(coord, "fog")
      this.#flagged --
    }
  }
  checkCoord(coord: Coord) {
    if(this.#mask.get(coord) == 'fog') {
      this.#mask.set(coord, 'clear')
      if(this.#tiles.get(coord) == "bomb") {
        this.#gameState = "boom"
      } else if(this.#tiles.get(coord) == 0) {
        this.#colapseNeighbors(coord)
      }
      this.gameStateCheck()
    }
  }
  #colapseNeighbors(coord:Coord) {
    for(let neighborCoord of this.#tiles.iterateNeighborCoords(coord)) {
      if(this.#mask.get(neighborCoord) != "fog") {
        continue
      }
      this.#mask.set(neighborCoord, "clear")
      if(this.#tiles.get(neighborCoord) == 0) {
        this.#colapseNeighbors(neighborCoord)
      }
    }
  }
  *iterateRows(): IterableIterator<Array<TileInfo>> {
    let curRowCount = 0
    let row = Array<TileInfo>()
    for(let coord of this.#tiles.iterateCoords()) {
      if(curRowCount >= this.#width) {
        yield row
        curRowCount = 0
        row = Array<TileInfo>()
      }
      let maskState: MaskState = this.#mask.get(coord)
      let info: TileInfo
      if(maskState == "clear") {
        let value = this.#tiles.get(coord)
        info = {
          value: value,
          coord: coord
        }
      } else {
        info = {
          value: maskState,
          coord: coord
        }
      }
      row.push(info)
      curRowCount ++
    }
    yield row
  }
}