import React from 'react';
import '../styles/card.css';

function Card(props) {
  const [imgURL,text] = props.array;
  return (
    <div className='card-body'>
      <div>
        <img className='card-img' src={imgURL} alt=""></img>
      </div>
      <div className='card-bottom'>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Card;