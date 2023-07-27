import React from 'react'
import './index.css'
import { Cell } from '../Cell'

export const Board: React.FC<any> = () => {
  return (
    <div className="board">
      <Cell></Cell>
    </div>
  )
}
