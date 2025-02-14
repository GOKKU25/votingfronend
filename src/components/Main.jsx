import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';


const Main = ({ child }) => {
  return (
    <div>
      <Navbar/>
      {child} 
      <Footer/>
    </div>
  );
};



export default Main;
