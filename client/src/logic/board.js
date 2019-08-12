const Piece = require('./Piece.js')
const _ = require('underscore')

let board = _.range(8).map(row => _.range(8).map(square => true));

//pawns
board[1] = board[1].map(square => new Piece('pawn', 'black'))
board[6] = board[6].map(square => new Piece('pawn', 'white'))

//queens
board[7][3] = new Piece('queen', 'white');
board[0][3] = new Piece('queen', 'black');

//kings
board[7][4] = new Piece('king', 'white');
board[0][4] = new Piece('king', 'black');

//rooks
board[0][0] = new Piece('rook', 'black');
board[0][7] = new Piece('rook', 'black');

board[7][0] = new Piece('rook', 'white');
board[7][7] = new Piece('rook', 'white');

//bishops
board[0][2] = new Piece('bishop', 'black');
board[0][5] = new Piece('bishop', 'black');

board[7][2] = new Piece('bishop', 'white');
board[7][5] = new Piece('bishop', 'white');

//knights
board[0][1] = new Piece('knight', 'black');
board[0][6] = new Piece('knight', 'black');

board[7][1] = new Piece('knight', 'white');
board[7][6] = new Piece('knight', 'white');

module.exports = board;