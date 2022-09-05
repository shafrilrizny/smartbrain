import React from 'react';
import Tilt from 'react-tilt';
import Five from './logo.png'

const Logo = () => {
  return (
    <div className='center logo'>
      <Tilt className="Tilt" options={{ max : 55 }} style={{ height: 250, width: 250 }} >
        <div className="Tilt-inner"><img alt="" src={Five}/> </div>
      </Tilt>
    </div>
  )
}

export default Logo;