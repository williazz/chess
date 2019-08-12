const isOnBoard = (x, y) => {
    return 0 <= x && x <= 7 && 0 <= y && y <= 7;
}

module.exports = isOnBoard;