import {MineBoard, TileInfo} from './mine_board'

describe("MineBoard minesweeaper tile data structure", () => {
  test("it creates a properly shaped board", () => {
    let board = new MineBoard(5,4,3)
    let rows = Array.from(board.iterateRows())
    expect(rows[0].length).toEqual(5)
    expect(rows.length).toEqual(4)
  })
  test("it should clear the fog and properly number", () => {
    let board = new MineBoard(3,3,3, ["bomb",0,0,0,0,0,0,0,"bomb"])
    board.clearFog()
    let rows = Array.from(board.iterateRows())
    let rowOneValues = rows[0].map((tile:TileInfo) => (tile['value']))
    let rowTwoValues = rows[1].map((tile:TileInfo) => (tile['value']))
    let rowThreeValues = rows[2].map((tile:TileInfo) => (tile['value']))
    expect(rowOneValues).toEqual(["bomb",1,0])
    expect(rowTwoValues).toEqual([1,2,1])
    expect(rowThreeValues).toEqual([0,1,"bomb"])
  })
  test("it should count all adjacent tiles for bombs", () => {
    let board = new MineBoard(3,3,3, ["bomb","bomb","bomb","bomb",0,"bomb","bomb","bomb","bomb"])
    board.clearFog()
    let rows = Array.from(board.iterateRows())
    expect(rows[1][1]['value']).toEqual(8)
  })
  test("it should handle larger numbering", () => {
    let board = new MineBoard(3,3,3, ["bomb","bomb","bomb",0,0,0,0,0,"bomb"])
    board.clearFog()
    let rows = Array.from(board.iterateRows())
    let rowOneValues = rows[0].map((tile:TileInfo) => (tile['value']))
    let rowTwoValues = rows[1].map((tile:TileInfo) => (tile['value']))
    let rowThreeValues = rows[2].map((tile:TileInfo) => (tile['value']))
    expect(rowOneValues).toEqual(["bomb","bomb","bomb"])
    expect(rowTwoValues).toEqual([2,4,3])
    expect(rowThreeValues).toEqual([0,1,"bomb"])
  })
  test("it should assign the right amount of bombs", () => {
    let board = new MineBoard(3,3,4)
    board.clearFog()
    let rows = Array.from(board.iterateRows())
    let tiles = new Array<TileInfo>().concat(...rows)
    let bombs = 0
    for(let tile of tiles) {
      if(tile['value'] == "bomb")
        bombs++
    }
    expect(bombs).toEqual(4)
  })
  test("it should flag to chosen tile", () => {
    let board = new MineBoard(3,3,4)
    board.flagCoord([0,0])
    board.flagCoord([2,2])
    let rows = Array.from(board.iterateRows())
    let tiles = new Array<TileInfo>().concat(...rows)
    expect(tiles[0]['value']).toEqual("flag")
    expect(tiles[tiles.length-1]['value']).toEqual("flag")
  })
  test("it should check a chosen tile", () => {
    let board = new MineBoard(3,3,0)
    board.checkCoord([0,0])
    board.checkCoord([2,2])
    let rows = Array.from(board.iterateRows())
    let tiles = new Array<TileInfo>().concat(...rows)
    expect(tiles[0]['value']).toEqual(0)
    expect(tiles[tiles.length-1]['value']).toEqual(0)
  })
  test("it shouldnt flag a cleared tile", () => {
    let board = new MineBoard(3,3,0)
    board.checkCoord([0,0])
    board.flagCoord([0,0])
    let rows = Array.from(board.iterateRows())
    let tiles = new Array<TileInfo>().concat(...rows)
    expect(tiles[0]['value']).toEqual(0)
  })
  test("it should know to collapse empty areas when checked", () => {
    let board = new MineBoard(3,3,1,["bomb",0,0,0,0,0,0,0,0])
    board.checkCoord([2,2])
    let rows = Array.from(board.iterateRows())
    let tileValues = (new Array<TileInfo>().concat(...rows)).map((tile) => (tile['value']))
    expect(tileValues).toEqual(["fog", 1, 0, 1, 1, 0, 0, 0, 0])
  })
  test("it should know the game is over if your check a bomb tile", () => {
    let board = new MineBoard(3,3,9)
    board.checkCoord([0,0])
    expect(board.gameState()).toEqual("boom")
  })
  test("it should know the game is over if your clear the fog and reveal a bomb", () => {
    let board = new MineBoard(3,3,1)
    board.clearFog()
    expect(board.gameState()).toEqual("boom")
  })
  test("it should know when the game is won", () => {
    let board = new MineBoard(3,3,1, ["bomb",0,0,0,0,0,0,0,0])
    board.flagCoord([0,0])
    board.clearFog()
    expect(board.gameState()).toEqual("win")
  })
})