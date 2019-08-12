import React from 'react';

const _ = require('underscore')
const $ = require('jquery')

const getChoices = require('../logic/getChoices.js')
const getPath = require('../logic/getPath.js')
const markPawnMovement = require('../logic/markPawnMovement');

import CancelClick from './CancelClick.jsx';
import Board from './Board.jsx';

const board = require('../logic/board.js');

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board,
            isWhiteTurn: true,
            selectedPiece: null,
        }
        this.get = this.get.bind(this);
        this.set = this.set.bind(this);
        this.toggleTurn = this.toggleTurn.bind(this);
        this.movePiece = this.movePiece.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    get(row, col) {
        const {board} = this.state;
        if (board[row] && board[row][col]) return board[row][col]
        else return null
    }

    set(row, col, val = true) {
        if (this.get(row, col) === null) return null
        let {board} = this.state
        board[row][col] = val
        this.setState({board})
        return true
    }

    toggleTurn() {
        let {isWhiteTurn} = this.state;
        isWhiteTurn = !isWhiteTurn
        this.setState({isWhiteTurn})
    }

    movePiece(start = [-1, -1], end = [-1, -1]) {

        let piece = this.get(...start)
        const dest = this.get(...end)
        const {type} = piece;
        if (piece === null || dest === null) return null
        
        let choices = type === 'pawn' && dest instanceof Object ? getChoices(piece, start, true) : getChoices(piece, start);
        console.log('choices: ', choices)
        let endIsChoice = choices.some(choice => choice.join('') === end.join(''))
        console.log('endisChoice: ', endIsChoice)
        if (endIsChoice) {
            const path = getPath(piece, start, end)
            console.log(`start: ${start}, end: ${end}, piece: ${JSON.stringify(piece)}`)
            console.log('path: ', path)
            if (path) {
                const pathIsClear = path.every((coor, index) => {
                    if (index === path.length - 1) return this.get(...coor)
                    else return this.get(...coor) === true
                })
                console.log(`path is clear: `, pathIsClear)
                if (pathIsClear) {
                    const destHasPiece = dest instanceof Object;
                    console.log('destHasPiece: ', destHasPiece)
                    if (destHasPiece) {
                        //handle capture
                        if (dest.type === 'king') return false
                        let offense = piece.color
                        let defense = dest.color
                        let canCapture = offense !== defense;
                        if (canCapture) {
                            this.set(...start, true)
                            this.set(...end, piece)
                            console.log('captured: ', dest)
                            this.toggleTurn()
                            this.setState({selectedPiece: null});
                            return dest;
                        }
                    } else {
                        if (type === 'pawn') piece = markPawnMovement(piece)
                        this.set(...start, true)
                        this.set(...end, piece)
                        console.log(`moved ${JSON.stringify(piece)} to ${end}`)
                        this.toggleTurn()
                        this.setState({selectedPiece: null});
                        return true;
                    }
                }
            }
        }
        return false;
    }

    handleClick(row, col) {
        let sel = this.get(row, col)
        let stopClick = sel === true || sel === null;
        let {selectedPiece, isWhiteTurn} = this.state;
        if (stopClick && !selectedPiece) return false
        const isWrongTeam = isWhiteTurn && sel.color === 'black' || !isWhiteTurn && sel.color === 'white';
        if (!selectedPiece && isWrongTeam) return false
        if (!selectedPiece) this.setState({selectedPiece: [row, col]})
        else if (selectedPiece) this.movePiece(selectedPiece, [row, col]);
    }

    handleOutsideClick() {
        this.setState({selectedPiece: null})
    }

    render() {
        const {board} = this.state;
        return (
            <div>


                <Board board={board}
                       handleClick={this.handleClick}/>

                <div>
                    <CancelClick />
                </div>
            </div>
        )
    }
}


export default Game;