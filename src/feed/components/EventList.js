import React from "react";

import Card from '../../shared/components/UIElements/Card';
import Event from './Event'
import Button from '../../shared/components/FormElements/Button';


const EventList = props => {
    if (props.items.length === 0){
        return <div className='event-list center'>
            <Card>
                <h2>No events found. Create one!</h2>
                <Button to="/event/new">New Event</Button>
            </Card>
        </div>
    }
    return <ul className='event-list'>
        {props.items.map(event => (
        <Event 
            key={event.eventId} 
            id={event.eventId}
            authorId={event.authorId}
            authorName={event.authorName} 
            sportId={event.sportId}
            skill={event.skill}
            //image={event.imageUrl} 
            title={event.title} 
            description={event.description} 
            location={event.location} 
            datetime={event.datetime}
            participants={event.participants}
            comments={event.comments} 
            likes={event.likes} 

            />
        ))}
    </ul>};

export default EventList;