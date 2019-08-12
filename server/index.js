const express = require('express');
const port = 3000;

express()
    .use(express.static('./client/dist/'))
    .get('/', (req, res) => res.render('index.html'))
    .listen(port, () => console.log('listening at: ', port))