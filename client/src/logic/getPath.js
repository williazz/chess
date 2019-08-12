const isOnBoard = require('./isOnBoard.js')

const getPath = (piece, start = [], end = [], isAttacking = false) => {
    if ( start.every((val, index) => val === end[index]) 
        || !isOnBoard(...start) 
        || !isOnBoard(...end) ) return null

    const {type} = piece;
    let path = [];

    if (type === 'knight') {
        return [end]
    } else if (start[0] === end[0] && (['queen', 'rook', 'king', 'pawn']).indexOf(type) > -1) {
        let distance = end[1] - start[1]
        for (let i = 1; i <= Math.abs(distance); i++) {
            let col = distance > 0 ? start[1] + i : start[1] - i;
            path.push([start[0], col])
        }
    } else if (start[1] === end[1] && (['queen', 'rook', 'king']).indexOf(type) > -1 || (type === 'pawn' && !isAttacking)) {
        let distance = end[0] - start[0]
        for (let i = 1; i <= Math.abs(distance); i++) {
            let row = distance > 0 ? start[0] + i : start[0] - i;
            path.push([row, start[1]])
        }
    } else if (type === 'bishop' || type === 'king' || type === 'queen' || (type === 'pawn' && isAttacking)) {
        const slope = ((start[1] - end[1]) / (start[0] - end[0]));
        const isDiagonal = Math.abs(slope) === 1;
        if (isDiagonal) {
            const distance = end[0] - start[0];
            if (slope === 1) {
                for (let i = 1; i <= Math.abs(distance); i++) {
                    let increment = distance > 0 ? i : -i;
                    path.push([start[0] + increment, start[1] + increment])
                }
            } else {
                for (let i = 1; i <= Math.abs(distance); i++) {
                    let incrementRow = distance < 0 ? -i : i;
                    let incrementCol = 0 - incrementRow;
                    path.push([start[0] + incrementRow, start[1] + incrementCol])
                }
            }
        }
    }

    return path.length ? path : null;
}

let output = getPath({type: 'bishop', color: 'white'}, [7,5], [5,7])
console.log(output)

module.exports = getPath;