import React from 'react';

const CancelClick = ({handleOutsideClick}) => (
    <span onClick={handleOutsideClick}>
        <h1>handleOutsideClick</h1>
    </span>
)

export default CancelClick;