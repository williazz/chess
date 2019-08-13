const pieceOptions = {
    'pawn': true, 'knight': true, 'bishop': true, 'rook': true, 'queen': true, 'king': true,
};

const Piece = function(type, color) {
    type = type.toLowerCase()
    color = color.toLowerCase()
    const src = `./img/${color}-${type}.png`
    if (!pieceOptions.hasOwnProperty(type)) return null
    let res = {type, color, src}
    if (type === 'pawn' || type === 'king' || type === 'rook') res.hasMoved = false
    return res
}

module.exports = Piece;