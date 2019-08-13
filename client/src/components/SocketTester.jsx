import React from 'react'
const $ = require('jquery');
// const io = require('socket.io')

const socketTester = ({emitMove}) => (
    <div>
        <textArea id='emitStart' />
        <textArea id='emitEnd' />
        <h5 onClick={() => {
            let start = $('#emitStart').val()
            let end = $('#emitEnd').val()
            console.log('start is: ', start)
            console.log('end is: ', end)
            emitMove(start, end)
            }}>Emit Move</h5>
    </div>
)

export default socketTester;