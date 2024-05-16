import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import Modal from '../../shared/components/UIElements/Modal';
import { useHttpClient } from '../../shared/hooks/http-hook'; 
import ErrorModal from '../../shared/components/UIElements/ErrorModal'; 
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const EditEvent = () => {
    const eventId = useParams().eventId;
    const navigate = useNavigate();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [showModal, setShowModal] = useState(false);
    const [loadedEvent, setLoadedEvent] = useState(null);

    const [formState, inputHandler, setFormData] = useForm({
        title: { value: '', isValid: false },
        description: { value: '', isValid: false },
        date: { value: '', isValid: false },
        time: { value: '', isValid: false },
        sportId: { value: '', isValid: false },
        skill: { value: '', isValid: false },
        location: { value: '', isValid: false },
        participants: { value:[], isValid:false},
        comments: { value:[], isValid: false},
        likes: { value:[], isValid: false }
    }, false);

    const sports = ['Moutain-Biking', 'Hiking', 'Running', 'Skiing','Scuba-Diving','Kayaking'];
    const skill = ['Beginner', 'Intermediate', 'Advanced'];

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/events/${eventId}`);
                setLoadedEvent(responseData.event);
                const event = responseData.event;
                const date = event.datetime.split('T')[0];
                const time = event.datetime.split('T')[1].slice(0, 5);

                setFormData({
                    title: { value: event.title, isValid: true },
                    description: { value: event.description, isValid: true },
                    date: { value: date, isValid: true },
                    time: { value: time, isValid: true },
                    sportId: { value: event.sportId, isValid: true },
                    skill: { value: event.skill, isValid: true },
                    location: { value: event.location, isValid: true },
                    participants: { value:event.participants, isValid: true},
                    comments: { value: event.comments, isValid:true},
                    likes: { value:event.likes, isValid:true}

                }, true);
                //console.log(event.skill);
                //console.log("Fetched Event Data:", responseData.event);


            } catch (err) {
                console.error("Failed to fetch event data:", err);
            }
        };
        if (!loadedEvent) fetchEvent();
    }, [eventId, sendRequest, setFormData, loadedEvent]);

    const eventUpdateHandler = async event => {
        event.preventDefault();
        try {
            //console.log(formState.inputs.skill.value);

            await sendRequest(
                `http://localhost:5000/api/events/${eventId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    datetime: `${formState.inputs.date.value}T${formState.inputs.time.value}:00Z`,
                    sportId: formState.inputs.sportId.value,
                    skill: formState.inputs.skill.value,
                    location: formState.inputs.location.value,
                    participants: formState.inputs.participants.value,
                    comments: formState.inputs.comments.value,
                    likes: formState.inputs.likes.value
                }),
                { 'Content-Type': 'application/json' }
            );
            setShowModal(true);
        } catch (err) {
            console.error('Failed to update the event:', err);
        }
    };

    if (isLoading || !loadedEvent) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
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