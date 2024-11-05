import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

import './Home.css';
import HomeContent from '../components/HomeContent';
import Parrallax from '../components/parrallax/Parrallax';

const Home = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);



    return (
        <div className="home-container">
            
            <Parrallax/>
            
            {/* <HomeContent/> */}

        </div>
    );
};

export default Home;