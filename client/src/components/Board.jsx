import React from 'react';

const Board = ({board, handleClick, selected}) => (
    <table id='board'>
        {board.map((row, rowIndex) => (
            <tr>{row.map((square, colIndex) => (
                <td key={`${rowIndex + colIndex}`} 
                    onClick={() => handleClick(rowIndex, colIndex)}
                    className={(function() {
                        let res = [];
                        if (selected) {
                            const shouldHiglight = selected[0] === rowIndex && selected[1] === colIndex;
                            if (shouldHiglight) {
                                // console.group(shouldHiglight, selected)
                                res.push('highlighted');
                            }
                        }
                        if (square instanceof Object) res.push('piece')
                        return res.join(' ')
                    })()}
                    > {square === true ? '' : <img src={square.src} />}</td>))}</tr>
        ))}
    </table>
);

export default Board;