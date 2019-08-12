import React from 'react';

const CancelClick = ({handleOutsideClick}) => (
    <div onClick={handleOutsideClick}>
        <h1>handleOutsideClick</h1>
    </div>
)

export default CancelClick;