import React from 'react';
import AdminNav from './Navbar/AdminNav';
import Footer from './Footer';




const Main2 = ({ child2 }) => {
  return (
    <div>
      <AdminNav/>
      {child2} 
      <Footer/>
    </div>
  );
};



export default Main2;
