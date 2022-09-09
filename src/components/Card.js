import React from 'react'
import { Link } from 'react-router-dom';

function Card() {
  return (
    <div>
      <div>
        <Link to="/path-finding">Path Finding</Link>
      </div>
    </div>
  )
}

export default Card;