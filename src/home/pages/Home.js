import React from 'react';
import { useNavigate } from 'react-router-dom';


import './Home.css';
import HomeContent from '../components/HomeContent';
import Parrallax from '../components/parrallax/Parrallax';

const Home = () => {




    return (
        <div className="home-container">
            {/* <div className="parallax-wrapper">
                <Parrallax />
            </div> */}
            <Parrallax/>
            <HomeContent/>
        </div>
    );
};

export default Home;