import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Modal from '../../shared/components/UIElements/Modal';

//import './EventForm.css'; 

const NewEvent = () => {
    // Example sports and skills
    const sports = ['Mountain-Biking', 'Hiking', 'Running', 'Scuba'];
    const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];

    const [formState, inputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        date: {
            value: '',
            isValid: false
        },
        time: {
            value: '',
            isValid: false
        },
        sportId: {
            value: '',
            isValid: false
        },
        skillLevel: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        }
    }, false);

    

    const [showModal, setShowModal] = useState(false);
    const [eventId, setEventId] = useState(null); 
    const navigate = useNavigate();

    const eventSubmitHandler = async (event) => {
        event.preventDefault();

        //testing
        // Simulate event creation
        console.log(formState.inputs); // Replace with your API call
        setEventId('123'); 

        setShowModal(true);
    };

    const hideModal = () => {
        setShowModal(false);
    };

    const navigateToFeed = () => {
        hideModal();
        navigate('/feed');
    };



    return (
        <>
            <Modal
                show={showModal}
                onCancel={hideModal}
                header="Event Created Successfully!"
                footerClass="event-form__modal-actions"
                footer={
                    <>
                        <Button onClick={navigateToFeed}>Go to Feed</Button>
                    </>
                }>
                <p>Your event has been successfully created and is now live!</p>
            </Modal>
            <Card>
                <form className="event-form" onSubmit={eventSubmitHandler}>
                    <Input
                        element="input"
                        id="title"
                        type="text"
                        label="Event Title"
                        validators={[VALIDATOR_REQUIRE()]} 
                        onInput={inputHandler}
                    />
                    <Input
                        element="textarea"
                        id="description"
                        label="Description"
                        validators={[VALIDATOR_REQUIRE()]} 
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="date"
                        type="date"
                        label="Date"
                        validators={[VALIDATOR_REQUIRE()]} 
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="time"
                        type="time"
                        label="Time"
                        validators={[VALIDATOR_REQUIRE()]} 
                        onInput={inputHandler}
                    />
                    <Input
                        element="select"
                        id="sportId"
                        label="Sport Type"
                        validators={[VALIDATOR_REQUIRE()]} 
                        onInput={inputHandler}
                        options={sports}  //dropdown options
                    />
                    <Input
                        element="select"
                        id="skillLevel"
                        label="Skill Level"
                        validators={[VALIDATOR_REQUIRE()]} 
                        onInput={inputHandler}
                        options={skillLevels} //dropdown options
                    />
                    <Input
                        element="input"
                        id="address"
                        type="text"
                        label="Address"
                        validators={[VALIDATOR_REQUIRE()]} 
                        onInput={inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        Create Event
                    </Button>
                </form>
            </Card>
        </>

    );
};

export default NewEvent;