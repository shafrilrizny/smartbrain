import React from 'react';
import './imgLink.css'; 

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='copy'>
        {'this magic brain will detect faces in your pictures. give it a go!'}
      </p>
    
      <div className='center urlCont'>
        <div className='form center pa4 br3'>
          <input 
              className='inputContainerIL' 
              type='text' 
              placeholder='enter url ending with .jpg only'
              onChange={onInputChange}/>
          <button 
              className='btnSubmit hover-red'
              onClick={onButtonSubmit}>detect</button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;