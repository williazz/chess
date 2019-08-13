//todo: ...actually finish this logic

const handleCastle = (start, end, king, blackRow, whiteRow) => {
    if (king.hasMoved) return false

    const [[startRow, startCol],[endRow, endCol]] = [start, end];
    if (startCol !== 4 || ([2, 6]).indexOf(endCol) === -1) return false
    if (startRow !== endRow) return false

    let relRook;
    let rookCoor = []
    if (startRow === 0) {
        if (endCol === 2) {
            relRook = blackRow[0];
            rookCoor = [0, 0]
        }
        else if (endCol === 6) {
            relRook = blackRow[7]
            rookCoor = [0, 7]
        }
    } else if (startRow === 7) {
        if (endCol === 2) {
            relRook = whiteRow[0]
            rookCoor = [7, 0]
        }
        else if (endCol === 6) {
            relRook = whiteRow[7]
            rookCoor = [7, 7]
        }
    }
    
    if (relRook === true || relRook.type !== 'rook') return false
    if (relRook.hasMoved) return false
    
    //must also handle clear path for king

    let rookDest;
    if (rookCoor[0] === 0) {
        if (rookCoor[1] === 7) rookDest = [0, 5]
        if (rookCoor[1] === 0) rookDest = [0, 3]
    } else if (rookCoor[0] === 7) {
        if (rookCoor[1] === 7) rookDest = [7, 5]
        if (rookCoor[1] === 0) rookDest = [7, 3]
    }

    return [rookCoor, rookDest];
}


module.exports = handleCastle