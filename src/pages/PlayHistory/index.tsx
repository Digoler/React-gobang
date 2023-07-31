import React from 'react'
import './index.module.css'
import { Image, Modal, Button, message, Popconfirm, Empty } from 'antd'
export const PlayHistory: React.FC<any> = ({
  playOpen,
  setPlayOpen,
  playHistory,
  setPlayHistory,
}) => {
  const cancel = () => {
    message.error('取消删除')
  }

  function deleteHistory(index: number) {
    setPlayHistory((playHistory: any) => {
      playHistory.splice(index, 1)
      return [...playHistory]
    })
    message.success('删除成功')
  }
  return (
    <Modal
      title="历史记录"
      centered
      open={playOpen}
      onOk={() => setPlayOpen(false)}
      onCancel={() => setPlayOpen(false)}
      width={1000}
    >
      <div className="lists">
        <div className="titles">
          <div className="order">序号</div>
          <div className="time">时间</div>
          <div className="image">棋盘图</div>
          <div className="win">赢家</div>
          <div className="action">操作</div>
        </div>
        <Empty
          style={{ display: playHistory.length === 0 ? 'block' : 'none' }}
        ></Empty>
        {playHistory.map((item: any, index: number) => {
          return (
            <div className="item" key={index}>
              <div className="order">{index}</div>
              <div className="time">{item.time}</div>
              <div className="image">
                <Image
                  width={100}
                  height={100}
                  src={item.image.src}
                  key={index}
                />
              </div>
              <div className="win">
                {item.winner === 'black' ? '黑方' : '白方'}：积分+10
              </div>
              <div className="action">
                <Popconfirm
                  title="删除记录"
                  description="你确定要删除这个记录吗?"
                  onConfirm={() => deleteHistory(index)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" danger>
                    删除记录
                  </Button>
                </Popconfirm>
              </div>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}
