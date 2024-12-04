import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import './HomeContent.css';
import { motion } from "framer-motion";
import { AuthContext } from '../../shared/context/auth-context';


const HomeContent = () => {
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
        <div className="home-content-container">
            <div className="home-content-details">
                <div>
                    Do you need a ride to get out of the frontcountry and into the woods with friends?
                </div>
                <div>
                    Do you want to find the people to explore the great outdoors and do the things you love?
                </div>
            </div>
        
            <div className="get-outside-container">
                <motion.div
                    className="get-outside-button"
                    whileHover={{
                        scale: 1.05,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                    }}
                    onClick={handleButtonClick}
                >
                    <div className="get-outside-background" />
                    <span>Get Outside</span>
                </motion.div>
            </div>
        </div>
    );
};

export default HomeContent;
