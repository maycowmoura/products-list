import React from 'react';
import './style.css'
import { IconContext } from 'react-icons'
import { AiOutlineLoading } from 'react-icons/ai'

export default function SpinnerLoader() {
  return (
    <IconContext.Provider value={{ className: 'spinner-loader' }}>
      <AiOutlineLoading />
    </IconContext.Provider>
  );
}
