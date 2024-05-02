import React from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import EventList from '../components/EventList'


const DUMMY_EVENTS = [
  
    {
        eventId: 'e1',
        userId: 'u1',
        authorName: 'humaen',
        sportId: 'Moutain Biking',
        title: 'Bolton Potholes',
        skill: 'easy',
        description: 'I am going to Bolton Potholes at 9am to do the sunrise trail, I have 3 seats in my car and a bike rack!',
        imageUrl: '',
        datetime: '4/20/24 4:00pm',
        location: '1 Bolton Valley Access Rd, Bolton, VT 05676', 
        participants: ['u2','u3','u4'],
        comments: 
            [
                //TODO: align datatype: user,comment
                'i love mountain biking',
                'im pumped',
                'ill be there'
            ],
          likes: [
              'u2','u3','u4'
          ]
    }, 
    {
        eventId: "e2",
        userId: "u2",
        authorName: "Alice",
        sportId: "Kayaking",
        title: "River Run Fun",
        description: "Join us for a thrilling morning of kayaking down the Green River. Meet at the dock at 8am. Space for two more in my van!",
        imageUrl: "",
        skill: 'easy',
        datetime: "5/15/24 8:00am",
        location: "Green River Dock, Greenfield, MA 01301",
        participants: ["u1", "u5", "u6"],
        comments:
            [
                "Can't wait to paddle with you all!",
                "Is it okay if I bring a friend?",
                "Looking forward to it!"
            ],
          likes: 
            [
              "u1", "u5"
            ]
        
    },
    {
        eventId: "e3",
        userId: "u3",
        authorName: "John",
        sportId: "Hiking",
        title: "Sunset Peak Trail Hike",
        description: "Hiking Sunset Peak this Saturday. We'll catch the sunset at the summit. Leaving from Trailhead Parking at 5pm.",
        imageUrl: "",
        skill: 'easy',
        datetime: "6/01/24 5:00pm",
        location: "Sunset Peak Trailhead, Lake Placid, NY 12946",
        participants: ["u2", "u4", "u7"],
        comments: [
                "I've always wanted to do this hike!",
                "Should we bring headlamps for the hike back down?",
                "I'll bring some snacks for everyone."
            ],
        likes: 
            [
                "u4", "u2", "u7"
            ]
        
    },
    {
        eventId: "e4",
        userId: "u4",
        authorName: "Daisy",
        sportId: "Rock Climbing",
        title: "Climb and Coffee",
        description: "Morning session at the cliffs, followed by coffee at the Grind. Meet at 7am sharp at the base.",
        imageUrl: "",
        skill: 'easy',
        datetime: "7/12/24 7:00am",
        location: "Big Rock Cliffs, Boulder, CO 80302",
        participants: ["u1", "u3", "u8"],
        comments: 
            [
                "Can't wait, see you at the top!",
                "First time climbing, any tips?",
                "I'll bring extra gear if anyone needs."
            ],
        likes: 
            [
                "u3", "u1"
            ]
        
    }
  ];

const Feed = () => {
    
    const navigate = useNavigate();

    const navigateToNewEvent = () => {
        navigate('/event/new');
    };
    
    //const eventId = useParams().eventId;
    const loadedEvents = DUMMY_EVENTS //.filter(place => place.creator === userId )
    return (
        <>
            <Button onClick={navigateToNewEvent}>New</Button>
            <EventList items={loadedEvents} /> 
        </>
    );
};

export default Feed;