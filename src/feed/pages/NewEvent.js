import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Modal from '../../shared/components/UIElements/Modal';
import { useHttpClient } from '../../shared/hooks/http-hook'; 
import ErrorModal from '../../shared/components/UIElements/ErrorModal'; 
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/auth-context';

const NewEvent = () => {
    const navigate = useNavigate();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [showModal, setShowModal] = useState(false);
    const { mongoUserId } = useContext(AuthContext); // MongoDB user ID from context

    const sports = ['Mountain-Biking', 'Hiking', 'Running', 'Skiing', 'Scuba-Diving', 'Kayaking', 'Other'];
    const skills = ['Beginner', 'Intermediate', 'Advanced'];

    const [formState, inputHandler] = useForm({
        title: { value: '', isValid: false },
        description: { value: '', isValid: false },
        date: { value: '', isValid: false },
        time: { value: '', isValid: false },
        sportId: { value: '', isValid: false },
        skill: { value: '', isValid: false },
        location: { value: '', isValid: false }
    }, false);

    


    const eventSubmitHandler = async event => {
        event.preventDefault();
        if (!formState.isValid) {
            console.log("Form is not valid:", formState);
            return;
        }
        try {
            await sendRequest(
                `http://localhost:5000/api/events/`,
                'POST',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    userId: mongoUserId, // Hardcoded user ID for the sake of example
                    datetime: `${formState.inputs.date.value}T${formState.inputs.time.value}:00Z`,
                    sportId: formState.inputs.sportId.value,
                    skill: formState.inputs.skill.value,
                    location: formState.inputs.location.value,
                    participants: [], // Initialize as empty or from state if needed
                    comments: [], // Initialize as empty or handle form input for comments
                    likes: [] // Initialize as empty
                }),
                { 'Content-Type': 'application/json' }
            );
            setShowModal(true);
            navigate('/feed'); // Navigate after successful creation
        } catch (err) {
            console.error('Failed to create the event:', err);
        }
    };

    const hideModal = () => {
        setShowModal(false);
    };

    const navigateToFeed = () => {
        hideModal();
        navigate('/feed');
    };

    //console.log(formState)

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
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} 
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
                        id="skill"
                        label="Skill Level"
                        validators={[VALIDATOR_REQUIRE()]} 
                        onInput={inputHandler}
                        options={skills} //dropdown options
                    />
                    <Input
                        element="input"
                        id="location"
                        type="text"
                        label="Location"
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