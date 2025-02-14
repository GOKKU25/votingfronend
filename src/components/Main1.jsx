import React from 'react';
import Navvbar from './Navbar/Navvbar';
import Footer from './Footer';



const Main1 = ({ child1 }) => {
  return (
    <div>
      <Navvbar/>
      {child1} 
      <Footer/>
    </div>
  );
};



export default Main1;
