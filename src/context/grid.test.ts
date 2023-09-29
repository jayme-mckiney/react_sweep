import {Grid, TileState} from "./grid.ts"

describe("Grid class data structure",  () => {
  test("it should be create a properly sized grid", () => {
    let b = new Grid(5, 5, 0)
    let cells = []
    for(let cell of b.iterateCoords()) {
      cells.push(cell)
    }
    expect(cells.length).toEqual(25)
  })
  test("it should use the proper initial value", () => {
    let b = new Grid(2, 2, 1)
    for(let cell of b.iterateCoords()) {
      expect(b.get(cell)).toEqual(1)
    }
  })
  test("it should find all its neighbors but not itself", () => {
    let b = new Grid<TileState>(5,5, 1)
    let expected_neighbors = [
      "0,0", "0,1", "0,2",
      "1,0",        "1,2",
      "2,0", "2,1", "2,2"
    ]
    let neighbor_count = 0
    for(let coord of b.iterateNeighborCoords([1,1])) {
      let string_coord = `${coord[0]},${coord[1]}`
      neighbor_count ++
      expect(expected_neighbors.indexOf(string_coord)).toBeGreaterThan(-1)
    }
    expect(neighbor_count).toEqual(expected_neighbors.length)
  })
  test("it should respect bounds when finding neighbors upper left", () => {
    let b = new Grid<TileState>(5,5, 1)
    let expected_neighbors = [
             "0,1",
      "1,0", "1,1"
    ]
    let neighbor_count = 0
    for(let coord of b.iterateNeighborCoords([0,0])) {
      let string_coord = `${coord[0]},${coord[1]}`
      neighbor_count ++
      expect(expected_neighbors.indexOf(string_coord)).toBeGreaterThan(-1)
    }
    expect(neighbor_count).toEqual(expected_neighbors.length)
  })
  test("it should respect bounds when finding neighbors lower right", () => {
    let b = new Grid<TileState>(5,5, 1)
    let expected_neighbors = [
      "3,3", "3,4",
      "4,3"
    ]
    let neighbor_count = 0
    for(let coord of b.iterateNeighborCoords([4,4])) {
      let string_coord = `${coord[0]},${coord[1]}`
      neighbor_count ++
      expect(expected_neighbors.indexOf(string_coord)).toBeGreaterThan(-1)
    }
    expect(neighbor_count).toEqual(expected_neighbors.length)
  })
  test("it should allow getting and setting to proper coords", () => {
    let b = new Grid<TileState>(3,3,0)
    let i = 1
    for(let coord of b.iterateCoords()) {
      b.set(coord, i)
      i ++
    }
    i = 1
    for(let coord of b.iterateCoords()) {
      expect(b.get(coord)).toEqual(i)
      i++
    }
  })
  test("it should throw an error if set is used out of bounds", () => {
    let b = new Grid<TileState>(3,3,0)
    expect(() => {b.set([5,5], 3)}).toThrow()
  })
  test("it should throw an error if get is used out of bounds", () => {
    let b = new Grid<TileState>(3,3,0)
    expect(() => {b.get([5,5])}).toThrow()
  })
})