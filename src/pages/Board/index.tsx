import React, { useState } from 'react'
import './index.css'
import { Cell } from '../Cell'

export const Board: React.FC<any> = () => {
  const [round, setRound] = useState(false)
  const [squares, setSquares] = useState(
    new Array(226).fill(0).map(() => ({
      type: '',
      isSelected: false,
    })),
  )

  function changeRound(index: number) {
    setSquares((squares) => {
      squares[index].isSelected = true
      return squares
    })
    setRound((v) => !v)
  }

  return (
    <div className="board">
      {squares.map((num, index) => {
        if (index > 0) {
          return (
            <Cell
              key={index}
              index={index}
              round={round}
              isSelected={squares[index].isSelected}
              changeRound={changeRound}
            ></Cell>
          )
        }
        return <div key={index}></div>
      })}
    </div>
  )
}
