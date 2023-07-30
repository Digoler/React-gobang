import { useMemo, useState } from 'react'
import './App.css'
import { Board } from './pages/Board'
import { judge } from './utils/judgewiner'
import black from './assets/black.png'
import white from './assets/white.png'

function judgeWinner(
  squares: any,
  index: number,
  setScore: any,
  round: boolean,
  type: string,
) {
  let isWin = judge(squares, index, type)
  if (isWin) {
    if (round) {
      console.log('黑方赢啦')
      alert('黑方赢啦')
      setScore.setBlackStore((store: number) => store + 10)
    } else {
      console.log('白方赢啦')
      alert('白方赢啦')
      setScore.setWhiteStore((store: number) => store + 10)
    }
  }
}

function App() {
  const [isBegin, setBegin] = useState(false) //判断是否开始游戏
  const [blackStore, setBlackStore] = useState(0) //设置黑棋的分数
  const [whiteStore, setWhiteStore] = useState(0) //设置白棋的分数
  const [round, setRound] = useState(false) //false代表白棋、true代表黑棋
  let [history, setHistory] = useState([
    {
      squares: Array(226).fill(null),
    },
  ]) //历史记录列表：null表示空，black表示这格为黑色、white表示这格为白色
  //squares是history中的最新值
  const squares = useMemo(() => {
    return history[history.length - 1].squares
  }, [history])
  //用于设置分数的函数
  const setStore = {
    setBlackStore,
    setWhiteStore,
  }
  //改变回合触发的回调函数
  function changeRound(index: number) {
    //以下是添加新的历史值
    const tempSquares = [...squares]
    if (tempSquares[index]) {
      return
    }
    tempSquares[index] = round ? black : white
    const tempHistory = [
      ...history,
      {
        squares: tempSquares,
      },
    ]
    setHistory(tempHistory)
    //判断输赢
    setTimeout(() => {
      judgeWinner(squares, index, setStore, round, tempSquares[index])
    }, 100)
    setRound(!round) //改变回合
  }
  function handleClick() {
    setBegin(true)
  }
  function handleRegret() {
    setRound(!round) //改变回合
    setHistory((history) => {
      return [...history.slice(0, -1)]
    })
  }
  return (
    <div className="container">
      <div className="wrap">
        <div className="black-score">
          <div className="chess-black">
            <span>黑</span>
          </div>
          <div className="score">积分：{blackStore}</div>
        </div>
        <Board
          isBegin={isBegin}
          setStore={{ setBlackStore, setWhiteStore }}
          handleRegret={handleRegret}
          changeRound={changeRound}
          squares={squares}
        ></Board>
        <div className="white-score">
          <div className="chess-white">
            <span>白</span>
          </div>
          <div className="score">积分：{whiteStore}</div>
        </div>
      </div>
      <div className="buttons">
        <button className="btn1" onClick={handleClick}>
          <div className="text">开始</div>
        </button>
        <button className="btn2">
          <div className="text">保存棋盘</div>
        </button>
        <button className="btn3" onClick={handleRegret}>
          <div className="text">悔棋</div>
        </button>
      </div>
      <div className="float"></div>
    </div>
  )
}

export default App
