import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL } from '../../shared/util/validators';

const DUMMY_USER = [{
    id: "u1",
    name: { value: 'John Doe', isValid: true },
    about: { value: 'Love to travel and write.', isValid: true },
    email: { value: 'john@example.com', isValid: true }
},{
    id: "u2",
    name: { value: 'John Doe 2', isValid: true },
    about: { value: 'Love to travel and write.', isValid: true },
    email: { value: 'john@example.com', isValid: true }
}]


const EditProfile = () => {
    
    const navigate = useNavigate();
    const userId = useParams().userId;
    const [isLoading, setIsLoading] = useState(true);



    const [formState, inputHandler, setFormData] = useForm({
        name: { value: '', isValid: false },
        about: { value: '', isValid: false },
        email: { value: '', isValid: false }
    }, false);

    const identifiedUser = DUMMY_USER.find(p => p.id === userId);


    useEffect(() => {
        if(identifiedUser){

            // replace w/ API call
            setFormData({
                name: { value: identifiedUser.name.value, isValid: true },
                about: { value: identifiedUser.about.value, isValid: true },
                email: { value: identifiedUser.email.value, isValid: true }
            }, true);
        }
        setIsLoading(false);
    }, [setFormData,identifiedUser]); 

    const profileUpdateSubmitHandler = event => {
        event.preventDefault();
        //TODO API Call
        console.log(formState.inputs);
        navigate('/profile');
    };

    console.log(formState.inputs.name.value)
    if(!identifiedUser){
        return (
            <div className="center">
                <Card>
                    <h2>Could not find user!</h2>
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
        <Card>
            <form onSubmit={profileUpdateSubmitHandler}>
                <Input
                    id="name"
                    element="input"
                    type="text"
                    label="Your Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid name."
                    onInput={inputHandler}
                    initialValue={formState.inputs.name.value}
                    initialValid={formState.inputs.name.isValid}
                />
                <Input
                    id="about"
                    element="textarea"
                    label="About"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid about section."
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
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}
                    initialValue={formState.inputs.email.value}
                    initialValid={formState.inputs.email.isValid}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    Update Profile
                </Button>
            </form>
        </Card>
    );
};

export default EditProfile;