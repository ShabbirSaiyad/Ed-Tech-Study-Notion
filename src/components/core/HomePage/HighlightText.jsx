import React from 'react'

const HighlightText = ({text}) => {
  return (
   
    <span className='font-bold bg-gradient-to-b from-[#2E86C1] to-[#2874A6] text-transparent bg-clip-text'>
        {" "}
        {text}
    </span>
  )
}

export default HighlightText