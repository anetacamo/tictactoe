import React from 'react';

const Button = ({ onClick, value }) => (
  <div className='square' onClick={() => onClick()}>
    <p>{value}</p>
  </div>
);

export default Button;
