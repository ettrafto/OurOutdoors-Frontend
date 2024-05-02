import React from "react";

import { NavLink } from 'react-router-dom';

const NavProfile = props => {
    return (
        <>
            <ul>
                <li>
                    <h3>{props.username}</h3>
                </li>
                <li>
                    <NavLink className='' to={`/profile/${props.userId}`}>
                        <div style={{
                            width: '50px', // Specify the size of the circle
                            height: '50px',
                            borderRadius: '50%', // This makes the div circular
                            overflow: 'hidden', // Ensures the image doesn't overflow the circular shape
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <img src={props.profilePic} style={{
                            width: 'auto',
                            height: '100%', // Adjusts the image height to fill the circle
                            display: 'block'
                        }} />
                    
                        </div>
                    </NavLink >
                </li>
            </ul>
        </>
        //TODO
        //profile image
    );
};

export default NavProfile;