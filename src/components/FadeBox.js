import React from 'react'

function FadeBox({children, w}) {
  return (
    <div
        className={w == 'full' ? 'w-[100%]' : 'w-auto'}
        style={{
          background: 'linear-gradient(0deg, rgb(0, 0, 0) 50%, rgb(21, 21, 21) 100%)',
          alignItems: 'center', 
          border: '1px solid rgba(76, 76, 76, 0.5)',
          borderRadius: '10px'
        }}
    >
        {children}
    </div>
  )
}

export default FadeBox