const express = require('express');
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);
const port = 3000;

// express()
//     .use(express.static('./client/dist/'))
//     .get('/', (req, res) => res.render('index.html'))
//     .listen(port, () => console.log('listening at: ', port));

// io.on('connection', function(socket){
//     socket.on('chess-move', function(move){
//         io.emit('chess-move', move);
//     });
// });
    


var app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('./client/dist'))
app.get('/', (req, res) => res.sendFile('index.html'))

io.on('connection', (socket) => {
    socket.on('chess-move', (move) => io.emit('chess-move', move));
    socket.on('chat message', (msg) => io.emit('chat message', msg));
});

http.listen(port, () => console.log('listening on: ', port));

