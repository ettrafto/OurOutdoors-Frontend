import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import TriangleButton from '../UIElements/TriangleButton';

import './HomeNavigation.css';



const HomeNavigation = () => {

    const navigate = useNavigate();


    const navToLogin =() =>{
        navigate('/auth')
    }
  return (
    <header className="home-navigation">
      <div className="home-navigation-title">
        {/* <TriangleButton fontSize={'50%'}children={'Login'} onClick={navToLogin}/> */}

        
      </div>
      {/* Add any home-specific links or design here */}
    </header>
  );
};

export default HomeNavigation;
