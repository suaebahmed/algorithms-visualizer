import React from 'react'
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import '../styles/home.css';

function Home() {
  return (
    <div className="container">
      <Navbar Txt={'Home'}></Navbar>
      
      Home
      <Card></Card>
      
      {/* Footer only has for Home */}
      <Footer></Footer> 
    </div>
  )
}

export default Home;