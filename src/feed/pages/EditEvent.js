import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Modal from '../../shared/components/UIElements/Modal';


const eventData = [{
    id:"e1",
    title: "Sample Event",
    description: "This is a detailed description of the event.",
    sportId: "Soccer",
    datetime: "2023-12-10T14:00:00Z",
    skill: "Intermediate",
    email: "author@example.com",
    location: "123 main rd",
    comments: ["Great event!", "Looking forward to this!"],
    likes: ['u1', 'u2'],
    participants: ['u1', 'u2']
},{
    id:"e2",
    title: "Sample Event 2",
    description: "This is a detailed description of the event.",
    sportId: "Soccer",
    datetime: "2023-12-10T14:00:00Z",
    skill: "Intermediate",
    email: "author@example.com",
    location: "123 main rd",
    comments: ["Great event!", "Looking forward to this!"],
    likes: ['u1', 'u2'],
    participants: ['u1', 'u2']
}];

const EditEvent = () => {
    const eventId = useParams().eventId;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    const [formState, inputHandler, setFormData] = useForm({
        title: { value: '', isValid: false },
        description: { value: '', isValid: false },
        date: { value: '', isValid: false },
        time: { value: '', isValid: false },
        sportId: { value: '', isValid: false },
        skill: { value: '', isValid: false },
        location: { value: '', isValid: false }
    }, false);

    const sports = ['Soccer', 'Basketball', 'Tennis', 'Baseball'];
    const skill = ['Beginner', 'Intermediate', 'Advanced'];

    const identifiedEvent = eventData.find(p => p.id === eventId);


    useEffect(() => {
        if(identifiedEvent){
            const date = identifiedEvent.datetime.split('T')[0]; //Extract Date
            const time = identifiedEvent.datetime.split('T')[1].slice(0, 5); // Extract Time HH:mm 
    
            setFormData({
                title: { value: identifiedEvent.title, isValid: true },
                description: { value: identifiedEvent.description, isValid: true },
                date: { value: date, isValid: true },
                time: { value: time, isValid: true },
                sportId: { value: identifiedEvent.sportId, isValid: true },
                skill: { value: identifiedEvent.skill, isValid: true },
                location: { value: identifiedEvent.location, isValid: true } 
            }, true);
        }
        setIsLoading(false);
    }, [setFormData, identifiedEvent]);


    const eventUpdateHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // replace with API call
        setShowModal(true);
    };
    
    console.log(formState.inputs)
    //console.log(formState.inputs.date.value)
    //console.log(formState.inputs.time.value)

    if(!identifiedEvent){
        return (
            <div className="center">
                <Card>
                    <h2>Could not find event!</h2>
                </Card>
            </div>
            );
    }

    if(isLoading){
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        );
    }



    return (
        <>
            <Modal
                show={showModal}
                onCancel={() => setShowModal(false)}
                header="Event Updated Successfully!"
                footer={<Button onClick={() => navigate('/feed')}>Go to Feed</Button>}
            >
                <p>Your event has been successfully updated and is now live!</p>
            </Modal>
            <Card>
                <form className="event-form" onSubmit={eventUpdateHandler}>
                    <Input 
                        element="input" 
                        id="title" 
                        type="text" 
                        label="Event Title"
                        validators={[VALIDATOR_REQUIRE()]} 
                        onInput={inputHandler}
                        initialValue={formState.inputs.title.value} 
                        initialValid={formState.inputs.title.isValid} />
                    <Input 
                        element="textarea" 
                        id="description" 
                        label="Description"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} 
                        onInput={inputHandler}
                        initialValue={formState.inputs.description.value} 
                        initialValid={formState.inputs.description.isValid} />
                    <Input 
                        element="input" 
                        id="date" type="date" 
                        label="Date"
                           validators={[VALIDATOR_REQUIRE()]} 
                           onInput={inputHandler}
                           initialValue={formState.inputs.date.value} 
                           initialValid={formState.inputs.date.isValid} />
                    <Input 
                        element="input" 
                        id="time" 
                        type="time" 
                        label="Time"
                           validators={[VALIDATOR_REQUIRE()]} 
                           onInput={inputHandler}
                           initialValue={formState.inputs.time.value} 
                           initialValid={formState.inputs.time.isValid} />
                    <Input 
                        element="select" 
                        id="sportId" 
                        label="Sport"
                           validators={[VALIDATOR_REQUIRE()]} 
                           onInput={inputHandler}
                           options={sports} 
                           initialValue={formState.inputs.sportId.value} 
                           initialValid={formState.inputs.sportId.isValid} />
                    <Input 
                        element="select" 
                        id="skill" 
                        label="Skill"
                        validators={[VALIDATOR_REQUIRE()]} 
                        onInput={inputHandler}
                        options={skill} 
                        initialValue={formState.inputs.skill.value} 
                        initialValid={formState.inputs.skill.isValid} />
                    <Input 
                        element="input" 
                        id="location" 
                        type="text" 
                        label="Location"
                        validators={[VALIDATOR_REQUIRE()]} 
                        onInput={inputHandler}
                        initialValue={formState.inputs.location.value} 
                        initialValid={formState.inputs.location.isValid} />
                <Button type="submit" disabled={!formState.isValid}>Update Event</Button>
                </form>
            </Card>
        </>
    );
};

export default EditEvent;