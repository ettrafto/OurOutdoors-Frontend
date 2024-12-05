import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth as firebaseAuth } from "../../shared/context/firebase"; // Import Firebase auth instance

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { sendRequest } = useHttpClient(); // Custom hook for HTTP requests

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(""); // For handling Firebase errors

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    setError(""); // Reset error state before attempting authentication

    const email = formState.inputs.email.value;
    const password = formState.inputs.password.value;

    try {
      if (isLogin) {
        // Login
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
        console.log("Logged in user:", userCredential.user);

        // Optionally fetch MongoDB user details
        const mongoUser = await sendRequest(
          `http://localhost:5000/api/users/${userCredential.user.uid}`,
          "GET"
        );

        auth.login(userCredential.user.uid); // Update auth context with Firebase user ID
        navigate("/feed"); // Navigate to feed page upon success
      } else {
        // Signup
        const name = formState.inputs.name.value;

        // Create a Firebase user
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        console.log("Signed up user:", userCredential.user);

        // Save user to MongoDB
        const mongoUser = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({
            name,
            email,
            firebaseUid: userCredential.user.uid, // Firebase UID to link accounts
          }),
          { "Content-Type": "application/json" }
        );

        console.log("MongoDB user created:", mongoUser);

        auth.login(userCredential.user.uid); // Update auth context
        navigate("/feed"); // Navigate to feed page upon success
      }
    } catch (err) {
      setError(err.message); // Display Firebase or MongoDB error
    }
  };

  const switchModeHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <Card className="authentification">
      <h2>{isLogin ? "Login" : "Sign Up"} Required</h2>
      <hr />
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
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email."
          onInput={inputHandler}
        />

        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
        />

        {error && <p className="auth-error">{error}</p>} {/* Display errors */}

        <Button type="submit" disabled={!formState.isValid}>
          {isLogin ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLogin ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;
