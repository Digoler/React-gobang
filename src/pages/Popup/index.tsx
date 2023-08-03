import React from 'react'
import './index.less'
import 'animate.css'
export const Popup: React.FC<any> = ({ winner, setWinner, playAgain }) => {
  function goBack() {
    setWinner('')
  }
  function handlePlayAgain() {
    setWinner('')
    playAgain()
  }
  return (
    <div className="popup">
      <div className="content">恭喜{winner}方获胜</div>
      <div className="scoreAdd">
        积分：<span className="animate__bounceIn scores">+10</span>
      </div>
      <button className="button" onClick={handlePlayAgain}>
        再来一局
      </button>
      <button className="button" onClick={goBack}>
        返回
      </button>
    </div>
  )
}
