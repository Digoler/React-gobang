import { useMemo, useState } from 'react'
import './App.css'
import { Board } from './pages/Board'
import { Popup } from './pages/Popup'
import { judge } from './utils/judgewiner'
import black from './assets/black.png'
import white from './assets/white.png'
// import { Navigate } from './pages/Navigate'
import html2canvas from 'html2canvas'
import { ServeHistory } from './pages/serveHistory'

function judgeWinner(
  squares: any,
  index: number,
  setScore: any,
  round: boolean,
  type: string,
  setBegin: Function,
) {
  let isWin = judge(squares, index, type)
  if (isWin) {
    if (round) {
      setScore.setBlackStore((store: number) => store + 10)
      setBegin((v: boolean) => !v)
      return 'black'
    } else {
      setScore.setWhiteStore((store: number) => store + 10)
      setBegin((v: boolean) => !v)
      return 'white'
    }
  }
  return ''
}

function App() {
  const [isBegin, setBegin] = useState(false) //判断是否开始游戏
  const [blackStore, setBlackStore] = useState(0) //设置黑棋的分数
  const [whiteStore, setWhiteStore] = useState(0) //设置白棋的分数
  const [round, setRound] = useState(false) //false代表白棋、true代表黑棋
  let [winner, setWinner] = useState('')
  let [history, setHistory] = useState([
    {
      squares: Array(226).fill(null),
    },
  ]) //历史记录列表：null表示空，black表示这格为黑色、white表示这格为白色
  //保存的记录列表
  let [serveHistorys, setServeHistorys] = useState<any>([])
  //squares是history中的最新值
  const squares = useMemo(() => {
    return history[history.length - 1].squares
  }, [history])
  //点击打开保存记录
  const [open, setOpen] = useState(false)
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
      let _winner = judgeWinner(
        squares,
        index,
        setStore,
        round,
        tempSquares[index],
        setBegin,
      )
      setWinner(_winner)
    }, 100)
    setRound(!round) //改变回合
  }
  function handleClick() {
    setBegin(true)
    setHistory([
      {
        squares: Array(226).fill(null),
      },
    ])
  }
  //保存棋盘
  function saveChess() {
    let board = document.querySelector('.board') as HTMLElement
    html2canvas(board).then(function (canvas) {
      const image = new Image()
      // 将 Canvas 转换为图像
      image.src = canvas.toDataURL()
      image.style.width = '100px'
      image.style.height = '100px'
      setServeHistorys([
        ...serveHistorys,
        { squares: [...squares], image: image, round: round ? true : false },
      ])
    })
  }
  function handleRegret() {
    if (history.length <= 1 || !isBegin) {
      alert('没有棋子可以悔了哦')
      return
    }
    setRound(!round) //改变回合
    setHistory((history) => {
      return [...history.slice(0, -1)]
    })
  }
  function changeOpen() {
    setOpen(true)
  }
  return (
    <div className="container">
      {/* <Navigate setOpen={setOpen}></Navigate> */}
      <div className="features">
        <button className="serveBtn" onClick={changeOpen}>
          保存记录
        </button>
        <button className="serveBtn" onClick={changeOpen}>
          比赛记录
        </button>
      </div>
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
        <button className="btn1 button" onClick={handleClick}>
          <div className="text">开始</div>
        </button>
        <button className="btn2 button" onClick={saveChess}>
          <div className="text">保存棋盘</div>
        </button>
        <button className="btn3 button" onClick={handleRegret}>
          <div className="text">悔棋</div>
        </button>
      </div>
      <div className="float"></div>
      <div
        className="popup-winner"
        style={{ display: `${winner === '' ? 'none' : 'block'}` }}
      >
        <Popup
          winner={winner === 'black' ? '黑' : '白'}
          setWinner={setWinner}
          playAgain={handleClick}
        ></Popup>
      </div>
      <ServeHistory
        serveHistorys={serveHistorys}
        open={open}
        setOpen={setOpen}
        setHistory={setHistory}
        setServeHistorys={setServeHistorys}
        history={history}
        setRound={setRound}
      ></ServeHistory>
    </div>
  )
}

export default App
