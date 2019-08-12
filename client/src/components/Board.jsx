import React from 'react';

const Board = ({board, handleClick}) => (
    <table>
        {board.map((row, rowIndex) => (
            <tr>{row.map((square, colIndex) => (
                <td onClick={() => handleClick(rowIndex, colIndex)}>
                    {square === true ? '' : <img src={square.src} />}</td>))}</tr>
        ))}
    </table>
);

export default Board;