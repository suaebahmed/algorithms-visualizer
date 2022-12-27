import React from 'react';
import '../styles/modal.css';

function Modal(props) {
  const {popupClickHandle} = props;
  return (
    <div id='popup' className='unActive'>
        <span onClick={popupClickHandle} className="close">&times;</span>
        <div className='modal-container'>
          {props.children}
        </div>
    </div>
  )
}

export default Modal;