import React, { forwardRef } from 'react'

const GameBtn = forwardRef(({ color, border, bg, onClick }, ref) => (
  <button 
    color={color}
    className={`${border} ${bg} w25 btn`} 
    onClick={onClick}
    ref={ref}
  />
));

export default GameBtn