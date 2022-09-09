import React from 'react'
import '../styles/navbar.css';

function Navbar({msg}) {
  return (
    <nav className="navbar">
      <div>
        <a className='navbarlink' href='/'>
          Home
        </a>
      </div>
      <div className="nav-title">
        <div className="nav-title-hd">{msg}</div>
      </div>
    </nav>
  )
}
export default Navbar;