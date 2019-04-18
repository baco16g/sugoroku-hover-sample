// NOTE: マス目のDOM要素を全て取得します
const cells = document.querySelectorAll('.cell')

// NOTE: マス目のDOM要素情報を使って、マス目の範囲情報を作成します. x0<x<x1 && y0<y<y1であればマス目の上にコマが乗っていることになる
const cellPositions = Array.from(cells).map(cell => {
  const { x, y, width, height } = cell.getBoundingClientRect()
  return {
    element: cell,
    position: {
      x0: x,
      y0: y,
      x1: x+width,
      y1: y+height
    }
  }
})

// NOTE: コマのDOM要素を取得します
const piece = document.querySelector('.piece')

// NOTE: コマの幅、高さを取得します
const pieceWidth = piece.getBoundingClientRect().width
const pieceHeight = piece.getBoundingClientRect().height

// NOTE: デスクトップPC用ですが、コマがドラッグされている状態にあるか否かのフラグを用意します
let dragging = false

function bindEvents() {
  // NOTE: デスクトップPCはマウスイベントでドラッグを判定します
  piece.addEventListener('mousedown', onMouseDownPiece)
  piece.addEventListener('mousemove', onMouseMovePiece)
  piece.addEventListener('mouseup', onMouseUpPiece)

  // NOTE: スマートフォン端末では、タッチイベントでドラッグを判定します
  piece.addEventListener('touchmove', onTouchMovePiece)
}

function onMouseDownPiece() {
  dragging = true
}

function onMouseMovePiece(event) {
  if (!dragging) return
  const { pageX, pageY } = event
  setPiecePosition(pageX, pageY)
  hoverCell(pageX, pageY)
}

function onMouseUpPiece(event) {
  if (!dragging) return
  dragging = false
}

function onTouchMovePiece(event) {
  if (event.targetTouches.length !== 1) return
  const { pageX, pageY } = event.targetTouches[0]
  setPiecePosition(pageX, pageY)
  hoverCell(pageX, pageY)
}

// NOTE: 引数で渡ってきた座標情報を元に、コマの位置を変動させます
function setPiecePosition(x, y) {
  piece.style.transform = 'translate(' + (x - pieceWidth/2) + 'px, ' + (y - pieceHeight/2) + 'px)'
}

// NOTE: マス目の上にコマが存在するか否かを判定し、マスの背景色を変更させます
function hoverCell(x, y) {
  cellPositions.forEach(({ element, position }) => {
    const { x0, x1, y0, y1 } = position
    if (x0 <= x && x <= x1 && y0 <= y && y <= y1) {
      element.style.background = 'blue'
    } else {
      element.style.background = '#ddd'
    }
  })
}

bindEvents()