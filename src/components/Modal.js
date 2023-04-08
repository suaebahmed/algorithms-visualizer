import React from 'react';
import '../styles/modal.css';

function Modal(props) {
  const {popupClickHandle, style} = props;
  return (
    <div style={style} id='popup' className='unActive'>
        <span onClick={popupClickHandle} className="close">&times;</span>
        <div className='modal-container'>
          {props.children}
        </div>
    </div>
  )
}

export default Modal;