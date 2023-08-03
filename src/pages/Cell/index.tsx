import React from 'react'
import './index.less'

export const Cell: React.FC<any> = ({
  index,
  changeRound,
  bgImage,
  isBegin,
}) => {
  const config = {
    getClassName,
    onClick: onDivClick,
  }
  /**
   * 返回 div索引为 index 对应的类名 。
   *
   * @param {number} index 为索引值。
   * @return {string} index 对应的类名。
   */
  function getClassName(index: number): string {
    if (index === 0) {
      return ''
    } else if (index === 1) {
      return 'cell-top-left'
    } else if (index > 1 && index < 15) {
      return 'cell-top'
    } else if (index === 15) {
      return 'cell-top-right'
    } else if (index % 15 === 1 && index !== 211) {
      return 'cell-left-center'
    } else if (index > 15 && index % 15 > 1 && index < 211) {
      return 'cell-center'
    } else if (index % 15 === 0 && index !== 225) {
      return 'cell-right-center'
    } else if (index === 211) {
      return 'cell-bottom-left'
    } else if (index > 211 && index < 225) {
      return 'cell-bottom'
    } else if (index === 225) {
      return 'cell-bottom-right'
    }
    return ''
  }
  let backgroundImage = {
    backgroundSize: '44px 44px',
    backgroundImage: `url(${bgImage})`,
  }
  function onDivClick(): any {
    if (isBegin) {
      changeRound(index)
    }
  }

  return (
    <div
      className={config.getClassName(index)}
      onClick={config.onClick}
      style={backgroundImage}
    ></div>
  )
}
