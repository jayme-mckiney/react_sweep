import './digit.scss'

enum NumeralDigit {
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine
}

const Digit = ({number}: {number: string}) => {

  return (
    <div className={number}>
      <span className="d1"></span>
      <span className="d2"></span>
      <span className="d3"></span>
      <span className="d4"></span>
      <span className="d5"></span>
      <span className="d6"></span>
      <span className="d7"></span>
    </div>
  )
}

export const DigitalBar = ({number, minLength}: {number: number, minLength: number}) => {
  const numberStringArray: Array<string> = `${number}`.split("")
  let digits = numberStringArray.map((x, i) => {return <Digit key={`Digit${i}`} number={NumeralDigit[parseInt(x)]} />})
  while(digits.length < minLength) {
    digits.unshift(<Digit number="zero" />)
  }
  return (
    <div className="digits">
      {digits}
    </div>
  )
}