import React from "react";
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card'; 

const Sports = () => {
    const DUMMY_SPORTS = [
        {
            id: 'Mountain-Biking',
            name: 'Mountain Biking',
            image: '/pictures/sports/mountainBiking.jpg',
            description: 'Shred down Mountains on a funny two-wheeled monkey invention'
        },
        {
            id: 'Hiking',
            name: 'Hiking',
            image: '/pictures/sports/hiking.jpg',
            description: 'Lose yourself on the trail'
        },
        {
            id: 'Scuba-Diving',
            name: 'Scuba Diving',
            image: '/pictures/sports/scuba.jpg',
            description: 'Disappear into the depths'
        },
        {
            id: 'Kayaking',
            name: 'Kayaking',
            image: '/pictures/sports/kayak.jpg',
            description: 'Float down a chill and chilly river'
        },
        {
            id: 'Running',
            name: 'Running',
            image: '/pictures/sports/running.jpg',
            description: 'The sport other sports use as punishment'
        },
        {
            id: 'Skiing',
            name: 'Skiing',
            image: '/pictures/sports/skiing.jpg',
            description: 'Fast as you can down a mountain on sticks'
        },
        {
            id: 'Other',
            name: 'Other',
            image: '/pictures/sports/other.jpg',
            description: 'Whatever your fancy is ;)'
        }

    ];

    return (
        <div>
            <ul style={{ listStyle: 'none', padding: 0 }}> {/* Remove list styling */}
                {DUMMY_SPORTS.map(sport => (
                    <li key={sport.id}>
                        <Card style={{ margin: 5 }}>
                            <Link to={`/sports/${sport.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ textAlign: 'center' }}>
                                    {/*<img src={sport.image} alt={sport.name} style={{ maxWidth: '100%', height: 'auto' }} />*/}
                                    <h3>{sport.name}</h3>
                                    <p>{sport.description}</p>
                                </div>
                            </Link>
                        </Card>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sports;