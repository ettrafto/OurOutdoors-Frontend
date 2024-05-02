import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';


import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from "../../shared/components/UIElements/Card";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";

const Auth = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();


    const [isLogin, setIsLogin] = useState(true);

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    },false);

    const authSubmitHandler = event => {
        event.preventDefault();
        //TODO replace with backend logic
        console.log(formState.inputs);

        if (isLogin) {
            auth.login();
            navigate('/profile');
        } else {
            auth.login();
            navigate('/profile');
        }
    };

    const switchModeHandler = () => {
        if(!isLogin){
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            },false);
        }
        setIsLogin(prevMode => !prevMode);
    };

    return (
    <Card className="authentification">
        <h2>Login Required</h2>
        <hr/>
        <form onSubmit={authSubmitHandler}>
            {!isLogin && (
            <Input 
                element="input" 
                id="name" 
                type="text" 
                label="Your Name" 
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
            
            />)}
            <Input 
                id="email"
                element='input' 
                type="email" 
                label="Email" 
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]} 
                errorText='Please enter a valid email.' 
                onInput={inputHandler}
            />

            <Input 
                id="password"
                element='input' 
                label="Password" 
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]} 
                errorText='Please enter a valid password, at least 5 characters.' 
                onInput={inputHandler}
            />


            <Button type='submit' disabled={!formState.isValid}>
                {isLogin ? 'LOGIN' : 'SIGNUP'}
            </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
            SWITCH TO {isLogin ? 'SIGNUP': 'LOGIN'}
        </Button>
    </Card>
)};
//add a form that renders a email and a password
export default Auth;



