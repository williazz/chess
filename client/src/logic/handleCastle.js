//todo: ...actually finish this logic

const handleCastle = (start, end, king, blackKingRook, blackQueenRook, whiteKingRook, whiteQueenRook) => {
    const [[startRow, startCol],[endRow, endCol]] = [start, end];
    const {color, hasMoved, type} = king;
    return new Promise((reject, resolve) => {
        if (startCol !== 4 || type !== 'king' || hasMoved) reject(null)
        let relRook;
        if (color === 'white') {
            if (startRow !== 7) reject(null)
            if (endCol === 6) {
                relRook = whiteKingRook;
            } else if (endCol === 2) {
                relRook = whiteQueenRook;
            } else { reject(null) }
            if (!relRook.hasMoved) {
                resolve(relRook)
            }

        } else if (color == 'black') {
            if (startRow !== 0) reject(null)
        }
    })

    return null;
}