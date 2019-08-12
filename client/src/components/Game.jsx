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
        let {isWhiteTurn} = this;
        isWhiteTurn = !isWhiteTurn
        this.setState({isWhiteTurn})
    }

    movePiece(start = [-1, -1], end = [-1, -1]) {

        const piece = this.get(...start)
        const dest = this.get(...end)
        if (piece === null || dest === null) return null
        
        const choices = getChoices(piece, start)
        console.log('choices: ', choices)
        let endIsChoice = choices.some(choice => choice.join('') === end.join(''))
        console.log('endisChoice: ', endIsChoice)
        if (endIsChoice) {
            const path = getPath(piece, start, end)
            console.log(`start: ${start}, end: ${end}, piece: ${JSON.stringify(piece)}`)
            console.log('path: ', path)
            if (path) {
                const pathIsClear = path.every(coor => this.get(...coor))
                console.log(`path is clear: `, pathIsClear)
                if (pathIsClear) {
                    const destHasPiece = dest instanceof Object;
                    console.log('destHasPiece: ', destHasPiece)
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
        // return
        let {selectedPiece} = this.state;
        if (!selectedPiece) this.setState({selectedPiece: [row, col]})
        else if (selectedPiece) this.movePiece(selectedPiece, [row, col]);
    }

    handleOutsideClick() {
        this.setState({selectedPiece: null})
    }

    render() {
        const {board} = this.state;
        return (
            <ul>
                <textarea id='src'></textarea>
                <textarea id='dest'></textarea>
                <h1 id='move' onClick={() => {
                    let src = JSON.parse($('#src').val());
                    let dest = JSON.parse($('#dest').val());
                    this.movePiece(src, dest)
                }}>Test Move!</h1>

                <h1 onClick={() => console.log(this.state)}>log state</h1>

                <Board board={board}
                       handleClick={this.handleClick}/>
                <CancelClick handleOutsideClick={this.handleOutsideClick} />
            </ul>
        )
    }
}


export default Game;