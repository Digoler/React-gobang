import React from 'react'
import './index.css'
import { Image, Modal, Button, message, Popconfirm, Empty } from 'antd'
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

  function deleteRecord(index: number) {
    setServeHistorys((serveHistory: any) => {
      serveHistory.splice(index, 1)
      return [...serveHistory]
    })
    message.success('删除成功')
  }
  function deleteRecordCancel() {
    message.error('取消还原')
  }

  const confirm = (index: number) => {
    restoreBoard(index)
    setOpen(!open)
    message.success('还原成功')
  }

  const cancel = () => {
    message.error('取消删除')
  }
  return (
    <Modal
      title="保存记录"
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
        <Empty
          style={{ display: serveHistorys.length === 0 ? 'block' : 'none' }}
        ></Empty>
        {serveHistorys.map((item: any, index: number) => {
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
              <div className="action">
                <Popconfirm
                  title="还原记录"
                  description="你确定要还原这个记录吗?"
                  onConfirm={() => confirm(index)}
                  onCancel={deleteRecordCancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" style={{ margin: '5px' }}>
                    还原棋盘
                  </Button>
                </Popconfirm>
                <Popconfirm
                  title="还原记录"
                  description="你确定要还原这个记录吗?"
                  onConfirm={() => deleteRecord(index)}
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
