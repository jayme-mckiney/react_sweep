export type TileState = number | "bomb"
export type MaskState = "fog" | "clear" | "flag"
export type Coord = [number, number]


export class Grid<Type> {
  width: number;
  height: number;
  initial_value: Type;
  matrix: Map<string, Type>
  constructor(width: number, height: number, initial_value: Type) {
    this.width = width
    this.height = height
    this.initial_value = initial_value
    this.matrix = new Map<string, Type>()
    this.reset(initial_value)
  }
  reset(initial_value: Type) {
    this.matrix = new Map<string, Type>()
    let iter = this.iterateCoords()
    for(let coord of iter) {
      const string_coord:string = Grid.stringifyCoord(coord)
      this.matrix.set(string_coord, initial_value)
    }
  }
  get(coord: Coord): Type {
    const string_coord:string = Grid.stringifyCoord(coord)
    let entry: Type | undefined = this.matrix.get(string_coord)
    if(entry == undefined) {
      throw Error
    }
    return entry
  }
  set(coord: Coord, value: Type): void {
    if(!this.is_inbounds(coord)) {
      throw Error
    }
    const string_coord:string = Grid.stringifyCoord(coord)
    this.matrix.set(string_coord, value)
  }
  *iterateCoords(): IterableIterator<Coord> {
    for(let y = 0; y < this.height; y++) {
      for(let x = 0; x < this.width; x++) {
        let coord: Coord = [x,y]
        yield coord
      }
    }
  }
  *iterateNeighborCoords(coord: Coord): IterableIterator<Coord> {
    if(!this.is_inbounds(coord)) {
      throw Error
    }
    const {xTransform, yTransform} = this.createNeighborTransforms(coord)
    const [x, y] = coord
    for(let deltaX of xTransform) {
      for(let deltaY of yTransform) {
        if (deltaX == 0 && deltaY == 0) {
          continue
        }
        yield [x + deltaX, y + deltaY]
      }
    }
  }

  is_inbounds(coord: Coord): boolean {
    const [x, y] = coord
    if(x < 0) {
      return false
    } else if(x > this.width -1) {
      return false
    }
    if(y < 0) {
      return false
    } else if(y > this.height -1) {
      return false
    }
    return true
  }
  createNeighborTransforms(coord: Coord): {xTransform: Array<-1 | 0 | 1>, yTransform: Array<-1 | 0 | 1>} {
    const [x, y] = coord
    let xTransform: Array<-1 | 0 | 1> = [-1, 0, 1]
    let yTransform: Array<-1 | 0 | 1> = [-1, 0, 1]
    if(x == 0) {
      xTransform = xTransform.slice(1)
    } else if(x == this.width -1) {
      xTransform = xTransform.slice(0, -1)
    }
    if(y == 0) {
      yTransform = yTransform.slice(1)
    } else if(y == this.height -1) {
      yTransform = yTransform.slice(0, -1)
    }
    return {xTransform: xTransform, yTransform: yTransform}
  }
  static stringifyCoord(coord: Coord): string {
    return `${coord[0]},${coord[1]}`
  }
}


