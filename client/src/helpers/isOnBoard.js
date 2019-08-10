const _ = require('underscore');

const board = _.range(8).map(row => _.range(8))

const isOnBoard =  (x, y) => {
    return !!(board[x] && typeof board[x][y] === 'number')
}

module.exports = isOnBoard;