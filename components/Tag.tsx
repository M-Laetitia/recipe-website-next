import React from 'react'
 
interface TagProps {
    text: string;
    bgColor? : string; 
}

const Tag = ({ text , bgColor = 'var(--accentColor)'}: TagProps) => {

    return (
         <div 
            style={{ 
                backgroundColor: bgColor,
                transition: 'background-color 150ms ease-in-out'
            }}
            className='inline-block border border-solid border-accentColor px-3 py-2 font-medium text-small lowercase tracking-widest cursor-pointer'
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e56b62'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = bgColor}
        >
            {text}
        </div>
    )
}

export default Tag