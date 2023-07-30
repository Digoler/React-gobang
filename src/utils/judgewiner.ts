export function judge(squares: any, index: number, type: string) {
  return (
    judgeVertical(squares, index, type) ||
    judgeLevel(squares, index, type) ||
    judgeTopLeftToBottomRight(squares, index, type) ||
    judgeLeftBottomToRightTop(squares, index, type)
  )
}
//1.判断竖直方向上
function judgeVertical(squares: any, index: number, type: string) {
  let chessCount: number = 1
  let chessType: string = type
  let upIndexs = [],
    downIndexs = []
  for (let i = 1; i < 5; i++) {
    index - 15 * i > 0 && upIndexs.push(index - 15 * i)
    index - 15 * i < 225 && downIndexs.push(index + 15 * i)
  }
  for (let i = 0; i < upIndexs.length; i++) {
    let tempIndex = upIndexs[i]
    if (squares[tempIndex] === chessType) {
      chessCount++
    } else {
      break
    }
  }
  for (let i = 0; i < downIndexs.length; i++) {
    let tempIndex = downIndexs[i]
    if (squares[tempIndex] === chessType) {
      chessCount++
    } else {
      break
    }
  }
  return chessCount === 5
}
//2.判断水平方向上
function judgeLevel(squares: any, index: number, type: string) {
  let chessCount: number = 1
  let chessType: string = type

  //定义水平方向上的边界值
  let leftConfine = Math.floor(index / 15) * 15
  let rightConfine = (Math.floor(index / 15) + 1) * 15
  let leftIndexs = [],
    rightIndexs = []
  for (let i = 1; i < 5; i++) {
    index - i > leftConfine && leftIndexs.push(index - i)
    index + i < rightConfine && rightIndexs.push(index + i)
  }
  for (let i = 0; i < leftIndexs.length; i++) {
    let tempIndex = leftIndexs[i]
    if (squares[tempIndex] === chessType) {
      chessCount++
    } else {
      break
    }
  }
  for (let i = 0; i < rightIndexs.length; i++) {
    let tempIndex = rightIndexs[i]
    if (squares[tempIndex] === chessType) {
      chessCount++
    } else {
      break
    }
  }
  return chessCount === 5
}
//3.判断从左上到右下
function judgeTopLeftToBottomRight(squares: any, index: number, type: string) {
  let chessCount: number = 1
  let chessType: string = type
  let topLeftLength = Math.min(computeTopLeftConfine(index), 4) //计算从当前棋子往其左上角走最多可能有几个棋子
  let rightBottomLength = Math.min(computeRightBottomConfine(index), 4)
  let topLeft = generatetopLeft(index, topLeftLength)
  let rightBottom = generateRightButtom(index, rightBottomLength)
  for (let i = 0; i < topLeftLength; i++) {
    let tempIndex = topLeft[i]
    if (squares[tempIndex] === chessType) {
      chessCount++
    } else {
      break
    }
  }
  for (let i = 0; i < rightBottomLength; i++) {
    let tempIndex = rightBottom[i]
    if (squares[tempIndex] === chessType) {
      chessCount++
    } else {
      break
    }
  }
  return chessCount === 5
}
function computeTopLeftConfine(index: number) {
  let leftLength = index - Math.floor(index / 15) * 15
  let topLength = Math.floor(index / 15)
  let minLength = Math.min(leftLength, topLength)
  return minLength
}
function generatetopLeft(index: number, length: number) {
  let difference = 1
  let result = []
  for (let i = 1; i <= length; i++) {
    result.push(index - 15 * i - difference)
    difference = difference + 1
  }
  return result
}
function computeRightBottomConfine(index: number) {
  let righLength = Math.ceil(index / 15) * 15 - index
  let buttomLength = 15 - Math.ceil(index / 15)
  let minLength = Math.min(righLength, buttomLength)
  return minLength
}
function generateRightButtom(index: number, length: number) {
  let difference = 1
  let result = []
  for (let i = 1; i <= length; i++) {
    result.push(index + 15 * i + difference)
    difference = difference + 1
  }
  return result
}
//4.判断从左下到右上方向
function judgeLeftBottomToRightTop(squares: any, index: number, type: string) {
  let chessCount: number = 1
  let chessType: string = type
  let leftBottomLength = Math.min(computeLeftBottomConfine(index), 4)
  let rightTopLength = Math.min(computeRightTopConfine(index), 4)
  let leftBottom = generateLeftBottom(index, leftBottomLength)
  let rightTop = generateRightTop(index, rightTopLength)
  for (let i = 0; i < leftBottomLength; i++) {
    let tempIndex = leftBottom[i]
    if (squares[tempIndex] === chessType) {
      chessCount++
    } else {
      break
    }
  }
  for (let i = 0; i < rightTopLength; i++) {
    let tempIndex = rightTop[i]
    if (squares[tempIndex] === chessType) {
      chessCount++
    } else {
      break
    }
  }
  return chessCount === 5
}
function computeLeftBottomConfine(index: number) {
  let leftLength = index - Math.floor(index / 15) * 15
  let bottomLength = 15 - Math.ceil(index / 15)
  let minLength = Math.min(leftLength, bottomLength)
  return minLength
}
function generateLeftBottom(index: number, length: number) {
  let difference = 1
  let result = []
  for (let i = 1; i <= length; i++) {
    result.push(index + 15 * i - difference)
    difference = difference + 1
  }
  return result
}
function computeRightTopConfine(index: number) {
  let righLength = Math.ceil(index / 15) * 15 - index
  let topLength = Math.floor(index / 15)
  let minLength = Math.min(righLength, topLength)
  return minLength
}
function generateRightTop(index: number, length: number) {
  let difference = 1
  let result = []
  for (let i = 1; i <= length; i++) {
    result.push(index - 15 * i + difference)
    difference = difference + 1
  }
  return result
}
