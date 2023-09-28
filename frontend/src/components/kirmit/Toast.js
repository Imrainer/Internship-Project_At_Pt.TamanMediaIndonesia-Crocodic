import React from 'react'


const Toast = ({pesan, type}) => {
  return (
    <div className={`toast ${type}`}>
    {pesan}
  </div>
  )
}

export default Toast