const _ = require('underscore')
const getChoices = require('./getChoices.js')
const getPath = require('./getPath.js')
const Piece = require('./Piece.js');
const markPawnMovement = require('./markPawnMovement')

class Game {
    constructor() {
        this.board = _.range(8).map(row => _.range(8).map(square => true))
        this.isWhiteTurn = true;
        this.board[3][3] = new Piece('queen', 'white')
        this.board[6][3] = new Piece('queen', 'black')
    }

    get(row, col) {
        if (this.board[row] && typeof this.board[row][col]) return this.board[row][col]
        else return null
    }

    set(row, col, val = true) {
        if (this.get(row, col) === null) return null
        this.board[row][col] = val
        return true
    }

    toggleTurn() {
        const {isWhiteTurn} = this;
        this.isWhiteTurn = !isWhiteTurn;
    }

    movePiece(start = [-1, -1], end = [-1, -1]) {

        const piece = this.get(...start)
        const dest = this.get(...end)
        if (piece === null || dest === null) return null
        
        const choices = getChoices(piece, start)
        // console.log('choices: ', choices)
        let endIsChoice = choices.some(choice => choice.join('') === end.join(''))
        // console.log('endisChoice: ', endIsChoice)
        if (endIsChoice) {
            const path = getPath(piece, start, end)
            // console.log('path: ', path)
            if (path) {
                const pathIsClear = path.every(coor => this.get(...coor))
                // console.log(`path is clear: `, pathIsClear)
                if (pathIsClear) {
                    const destHasPiece = dest instanceof Object;
                    // console.log('destHasPiece: ', destHasPiece)
                    const {type} = piece;
                    if (destHasPiece) {
                        //handle capture
                        let offense = piece.color
                        let defense = dest.color
                        let canCapture = offense !== defense;
                        if (canCapture) {
                            if (type === 'pawn') piece = markPawnMovement(piece)
                            this.set(...start, true)
                            this.set(...end, piece)
                            // console.log('captured: ', dest)
                            this.toggleTurn()
                            return dest;
                        }
                    } else {
                        if (type === 'pawn') piece = markPawnMovement(piece)
                        this.set(...start, true)
                        this.set(...end, piece)
                        // console.log(`moved ${JSON.stringify(piece)} to ${end}`)
                        this.toggleTurn()
                        return true;
                    }
                }
            }
        }
        return false;
    }
}

// let my = new Game()
// let output = my.movePiece([3,3], [6,3])
// console.log(`did move piece: `, output)

module.exports = Game;