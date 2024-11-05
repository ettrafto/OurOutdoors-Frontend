import React from "react";
import './HomeContent.css';

const HomeContent = () => {

    const handleButtonClick = () => {
        if (auth.isLoggedIn) {
            navigate('/feed');
        } else {
            navigate('/auth');
        }
    };

    return(
        <>
            <div className="home-content-container">
                <div className="home-content-details">
                    <div>
                        Do you need a ride to get out of the frontcountry and into the woods with friends?
                    </div>
                    <div>
                        Do you want to find the people to explore the great outdoors and do the things you love?
                    </div>
                </div>
            
            <button onClick={handleButtonClick} className="get-outside-button">
                Get Outside
            </button>
            </div>

        
        </>
    )
}

export default HomeContent;