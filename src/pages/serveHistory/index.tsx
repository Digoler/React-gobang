import React from 'react'
import './index.css'
import { Image, Modal, Button } from 'antd'
export const ServeHistory: React.FC<any> = ({
  serveHistorys,
  open,
  setOpen,
  setHistory,
  setServeHistorys,
  history,
  setRound,
}) => {
  function restoreBoard(index: number) {
    setHistory([...history, { squares: serveHistorys[index].squares }])
    setRound(serveHistorys[index].round)
  }

  function deleteRecord(index: number) {}
  return (
    <Modal
      title="Modal 1000px width"
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={1000}
    >
      <div className="lists">
        <div className="titles">
          <div className="order">序号</div>
          <div className="time">时间</div>
          <div className="image">棋盘图</div>
          <div className="action">操作</div>
        </div>
        {serveHistorys.map((item: any, index: number) => {
          return (
            <div className="item" key={index}>
              <div className="order">{index}</div>
              <div className="time">2023年7月30日23：25</div>
              <div className="image">
                <Image
                  width={100}
                  height={100}
                  src={item.image.src}
                  key={index}
                />
              </div>
              <div className="action">
                <Button
                  type="primary"
                  style={{ margin: '5px' }}
                  onClick={() => restoreBoard(index)}
                >
                  还原棋盘
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => deleteRecord(index)}
                >
                  删除记录
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}
