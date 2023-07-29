import './App.css'
import { Board } from './pages/Board'

function App() {
  return (
    <div className="container">
      <div className="wrap">
        <div className="black-score">
          <div className="chess-black">
            <span>黑</span>
          </div>
          <div className="score">积分：999</div>
        </div>
        <Board></Board>
        <div className="white-score">
          <div className="chess-white">
            <span>白</span>
          </div>
          <div className="score">积分：9</div>
        </div>
      </div>
      <div className="buttons">
        <button className="btn1">
          <div className="text">开始</div>
        </button>
        <button className="btn2">
          <div className="text">保存棋盘</div>
        </button>
        <button className="btn3">
          <div className="text">悔棋</div>
        </button>
      </div>
      <div className="float"></div>
    </div>
  )
}

export default App
