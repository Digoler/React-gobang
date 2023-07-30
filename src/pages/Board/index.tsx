import React from 'react'
import './index.css'
import { Cell } from '../Cell'

export const Board: React.FC<any> = ({ isBegin, changeRound, squares }) => {
  return (
    <div className="board">
      {squares.map((item: string, index: number) => {
        if (index > 0) {
          return (
            <Cell
              key={index}
              index={index}
              bgImage={item}
              changeRound={changeRound}
              isBegin={isBegin}
              squares={squares}
            ></Cell>
          )
        }
        return <div key={index}></div>
      })}
    </div>
  )
}
