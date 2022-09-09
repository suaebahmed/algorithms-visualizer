import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar({Txt}) {
  return (
    <nav className="navbar">
      <div>
        <Link className='navbarlink' to='/'>
          Home
        </Link>
      </div>
      <div>
        {Txt}
      </div>
    </nav>
  )
}
export default Navbar;