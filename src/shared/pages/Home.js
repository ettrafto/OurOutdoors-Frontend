import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const handleButtonClick = () => {
        if (auth.isLoggedIn) {
            navigate('/feed');
        } else {
            navigate('/auth');
        }
    };

    return (
        <div className="home-container">
            <h1>Welcome to Our Outdoors</h1>
            <button onClick={handleButtonClick} className="get-outside-button">
                Get Outside
            </button>
        </div>
    );
};

export default Home;