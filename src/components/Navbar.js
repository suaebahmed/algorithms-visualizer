import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar({msg}) {
  return (
    <nav className="navbar">
      <div>
        <Link className='navbarlink' to='/'>
          Home
        </Link>
      </div>
      <div className="nav-title">
        <div className="nav-title-hd">{msg}</div>
      </div>
    </nav>
  )
}
export default Navbar;