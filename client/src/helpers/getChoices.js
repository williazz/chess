const isOnBoard = require('./isOnBoard')

let defaultPiece = {
    type: null, 
    color: null, 
    hasMoved: null
};

const getMoveChoices = (piece = defaultPiece, start, attacking = false) => {
    const {type, color} = piece;
    let choices = [];

    if (type === 'pawn') {
        if (color === 'white') {
            choices.push([start[0] - 1, start[1]])
        } else {
            choices.push([start[0] + 1, start[1]])
        }
        if (!piece.hasMoved) {
            if (color === 'white') {
                choices.push([start[0] - 2, start[1]])
            } else {
                choices.push([start[0] + 2, start[1]])
            }
        }
        if (attacking) {
            if (color === 'white') {
                choices.push([start[0] - 1, start[1] + 1])
                choices.push([start[0] - 1, start[1] - 1])
            } else {
                choices.push([start[0] + 1, start[1] + 1])
                choices.push([start[0] + 1, start[1] - 1])
            }
        }

    } else if (type === 'knight') {
        let longJump = [-2, 2]
        let sideHop = [-1, 1]
        longJump.forEach(long => {
            sideHop.forEach(side => {
                choices.push([start[0] + long, start[1] + side])
                choices.push([start[0] + side, start[1] + long])
            })
        })
    
    //not using 'else' here to include queen
    } if (type === 'bishop' || type === 'queen') {
        for (let i = 1; i < 8; i++) {
            choices.push([start[0] + i, start[1] + i])
            choices.push([start[0] + i, start[1] - i])
            choices.push([start[0] - i, start[1] + i])
            choices.push([start[0] - i, start[1] - i])
        }
    } if (type === 'rook' || type === 'queen') {
        for (let i = 1; i < 8; i++) {
            choices.push([start[0], start[1] + i]);
            choices.push([start[0], start[1] - i]);
            choices.push([start[0] + i, start[1]]);
            choices.push([start[0] - i, start[1]]);
        }
    } else if (type === 'king') {
        let directions = [-1, 1]
        directions.forEach(first => {
            choices.push([start[0] + first, start[1]])
            choices.push([start[0], start[1] + first])
            directions.forEach(second => {
                choices.push([start[0] + first, start[1] + second])
            })
        })
    }

    return choices.filter(coordinates => isOnBoard(...coordinates));
}

let aPiece = {
    type: 'queen', 
    color: 'white', 
    hasMoved: true
}

let output = getMoveChoices(aPiece, [0, 0], false)

console.log(output)

module.exports = getMoveChoices;