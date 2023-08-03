import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { Board } from './pages/Board'
import { Popup } from './pages/Popup'
import { LoadText } from './pages/LoadText'
import { judge } from './utils/judgewiner'
import black from './assets/black.png'
import white from './assets/white.png'
import html2canvas from 'html2canvas'
import { ServeHistory } from './pages/serveHistory'
import { PlayHistory } from './pages/PlayHistory'
import dayjs from 'dayjs'
import background from './assets/background.jpeg'
import { Progress } from 'antd'

function judgeWinner(squares: any, index: number, type: string) {
  return judge(squares, index, type)
}

function App() {
  const [isBegin, setBegin] = useState(false) //判断是否开始游戏
  const [blackScore, setBlackScore] = useState(0) //设置黑棋的分数
  const [whiteScore, setWhiteScore] = useState(0) //设置白棋的分数
  const [round, setRound] = useState(false) //false代表白棋、true代表黑棋
  const [winner, setWinner] = useState('')
  const [history, setHistory] = useState([
    {
      squares: Array(226).fill(null),
    },
  ]) //历史记录列表：null表示空，black表示这格为黑色、white表示这格为白色
  //保存的记录列表
  const [serveHistorys, setServeHistorys] = useState<any>([])
  //比赛记录
  const [playHistory, setPlayHistory] = useState<any>([])
  //控制进度条的数值
  const [percent, setPercent] = useState(0)
  const [loading, setLoading] = useState(true)
  //squares是history中的最新值
  const squares = useMemo(() => {
    return history[history.length - 1].squares
  }, [history])
  //点击打开保存记录
  const [open, setOpen] = useState(false)
  //点击打开比赛记录
  const [playOpen, setPlayOpen] = useState(false)
  //用于设置分数的函数
  const setScore = {
    setBlackScore,
    setWhiteScore,
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
    let isWin = judgeWinner(squares, index, tempSquares[index])
    let _winner = ''
    if (isWin) {
      if (round) {
        setScore.setBlackScore((Score: number) => Score + 10)
        _winner = 'black'
      } else {
        setScore.setWhiteScore((Score: number) => Score + 10)
        _winner = 'white'
      }
      setBegin((v: boolean) => !v)
    }
    setWinner(_winner)
    setRound(!round) //改变回合
  }
  useEffect(() => {
    if (winner) {
      let board = document.querySelector('.board') as HTMLElement
      html2canvas(board).then(function (canvas) {
        const image = new Image()
        // 将 Canvas 转换为图像
        image.src = canvas.toDataURL()
        image.style.width = '100px'
        image.style.height = '100px'
        setPlayHistory([
          ...playHistory,
          {
            squares: [...squares],
            image: image,
            winner: winner,
            time: dayjs(new Date()).format('YYYY年MM月DD日H:mm:ss'),
          },
        ])
      })
    }
  }, [blackScore, whiteScore])
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
        {
          squares: [...squares],
          image: image,
          round: round ? true : false,
          time: dayjs(new Date()).format('YYYY年MM月DD日H:mm:ss'),
        },
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
  useEffect(() => {
    const loadingFn = async () => {
      await setTimeout(() => setPercent(percent + 1), 80)
    }
    if (percent <= 100) {
      loadingFn()
    }
    if (percent === 101) {
      setLoading(false)
    }
  }, [percent])
  return (
    <div className="container">
      <div className="img" style={{ display: loading ? '' : 'none' }}>
        <img src={background} alt="" width="100%" height="100%" />
        <LoadText></LoadText>
        <div className="process">
          <Progress percent={percent} strokeColor="#fff" />
        </div>
      </div>
      <div style={{ display: loading ? 'none' : 'block' }}>
        <div className="features">
          <button className="serveBtn" onClick={changeOpen}>
            保存记录
          </button>
          <button className="serveBtn" onClick={() => setPlayOpen(true)}>
            比赛记录
          </button>
        </div>
        <div className="wrap">
          <div className="black-score">
            <div className="chess-black">
              <span>黑</span>
            </div>
            <div className="score">积分：{blackScore}</div>
          </div>
          <Board
            isBegin={isBegin}
            changeRound={changeRound}
            squares={squares}
          ></Board>
          <div className="white-score">
            <div className="chess-white">
              <span>白</span>
            </div>
            <div className="score">积分：{whiteScore}</div>
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
      <PlayHistory
        playHistory={playHistory}
        playOpen={playOpen}
        setPlayOpen={setPlayOpen}
        setPlayHistory={setPlayHistory}
      ></PlayHistory>
    </div>
  )
}

export default App
