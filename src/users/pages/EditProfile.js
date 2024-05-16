import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../../shared/util/validators';
import Modal from '../../shared/components/UIElements/Modal';
import { useHttpClient } from '../../shared/hooks/http-hook'; 
import ErrorModal from '../../shared/components/UIElements/ErrorModal'; 
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const EditProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [showModal, setShowModal] = useState(false);
    const [loadedUser, setLoadedUser] = useState(null);

    const [formState, inputHandler, setFormData] = useForm({
        name: { value: '', isValid: false },
        about: { value: '', isValid: false },
        email: { value: '', isValid: false }
    }, false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/users/${userId}`);
                setLoadedUser(responseData.user);
                setFormData({
                    name: { value: responseData.user.name, isValid: true },
                    about: { value: responseData.user.about, isValid: true },
                    email: { value: responseData.user.email, isValid: true }
                }, true);
            } catch (err) {
                console.error("Failed to fetch user data:", err);
            }
        };
        if (!loadedUser) fetchUser();
    }, [userId, sendRequest, setFormData, loadedUser]);

    const profileUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5000/api/users/${userId}`,
                'PATCH',
                JSON.stringify({
                    name: formState.inputs.name.value,
                    about: formState.inputs.about.value,
                    email: formState.inputs.email.value
                }),
                { 'Content-Type': 'application/json' }
            );
            setShowModal(true);
        } catch (err) {
            console.error('Failed to update the user:', err);
        }
    };

    if (isLoading || !loadedUser) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <Modal
                show={showModal}
                onCancel={() => setShowModal(false)}
                header="Profile Updated Successfully!"
                footer={<Button onClick={() => navigate(`/profile/${userId}`)}>Go to Profile</Button>}
            >
                <p>Your profile has been successfully updated!</p>
            </Modal>
            <Card>
                <form onSubmit={profileUpdateSubmitHandler}>
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        initialValue={formState.inputs.name.value}
                        initialValid={formState.inputs.name.isValid}
                    />
                    <Input
                        id="about"
                        element="textarea"
                        label="About"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        initialValue={formState.inputs.about.value}
                        initialValid={formState.inputs.about.isValid}
                    />
                    <Input
                        id="email"
                        element="input"
                        type="email"
                        label="Email"
                        validators={[VALIDATOR_EMAIL()]}
                        onInput={inputHandler}
                        initialValue={formState.inputs.email.value}
                        initialValid={formState.inputs.email.isValid}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        Update Profile
                    </Button>
                </form>
            </Card>
        </>
    );
};

export default EditProfile;