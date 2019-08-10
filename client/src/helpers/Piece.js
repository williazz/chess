const pieceOptions = ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king'];

const Piece = function(type, color) {
    type = type.toLowerCase()
    color = color.toLowerCase()
    if (pieceOptions.indexOf(type) === -1) return null
    let res = {type, color}
    if (type === 'pawn') res.hasMoved = false
    return res
}

module.exports = Piece;