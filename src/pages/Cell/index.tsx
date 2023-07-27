import React from 'react'
import './index.css'

export const Cell: React.FC<any> = () => {
  const data = new Array(226).fill(0).map((num, index) => {
    if (index === 0) {
      return null
    } else if (index === 1) {
      return <div className="cell-top-left" key={index}></div>
    } else if (index > 1 && index < 15) {
      return <div className="cell-top" key={index}></div>
    } else if (index === 15) {
      return <div className="cell-top-right" key={index}></div>
    } else if (index % 15 === 1 && index !== 211) {
      return <div className="cell-left-center" key={index}></div>
    } else if (index > 15 && index % 15 > 1 && index < 211) {
      return <div className="cell-center" key={index}></div>
    } else if (index % 15 === 0 && index !== 225) {
      return <div className="cell-right-center" key={index}></div>
    } else if (index === 211) {
      return <div className="cell-bottom-left" key={index}></div>
    } else if (index > 211 && index < 225) {
      return <div className="cell-bottom" key={index}></div>
    } else if (index === 225) {
      return <div className="cell-bottom-right" key={index}></div>
    }
  })
  data.shift()
  return data
}
