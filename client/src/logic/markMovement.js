module.exports = function(piece) {
    const shouldMarkPiece = (['king', 'rook', 'pawn']).indexOf(piece.type) > -1;
    if (shouldMarkPiece) piece.hasMoved = true
    return piece
}