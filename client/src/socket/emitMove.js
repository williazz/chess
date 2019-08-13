const emitMove = (start, end) => {
    if (start instanceof Array) start = JSON.stringify(start)
    if (end instanceof Array) end = JSON.stringify(end)
    var socket = io();
    socket.emit('chess-move', `${start}|${end}`);
}

module.exports = emitMove