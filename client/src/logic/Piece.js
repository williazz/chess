const pieceOptions = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];

const Piece = function(type, color) {
    type = type.toLowerCase()
    color = color.toLowerCase()
    const src = `./img/${color}-${type}.png`
    if (pieceOptions.indexOf(type) === -1) return null
    let res = {type, color, src}
    if (type === 'pawn') res.hasMoved = false
    return res
}

module.exports = Piece;