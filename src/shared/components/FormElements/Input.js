import React, { useReducer, useEffect } from "react";
import { validate } from "../../util/validators";
import './Input.css';

const inputReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            };
        default:
            return state;
    }
};

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '', 
        isValid: props.initialValid || false,
        isTouched: false
    });

    const { id, onInput, element, type, placeholder, options } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    };

    const touchHandler = () => {
        dispatch({ type: 'TOUCH' });
    };

    let inputElement = null;

    if (element === 'input') {
        inputElement = <input id={id} type={type} placeholder={placeholder} onChange={changeHandler} onBlur={touchHandler} value={value} />;
    } else if (element === 'textarea') {
        inputElement = <textarea id={id} rows={props.rows || 3} onChange={changeHandler} onBlur={touchHandler} value={value} />;
    } else if (element === 'select') {
        inputElement = (
            <select id={id} onChange={changeHandler} onBlur={touchHandler} value={value}>
                {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
        );
    }

    return (
        <div className={`form-control ${!isValid && inputState.isTouched ? 'form-control--invalid' : ''}`}>
            <label htmlFor={id}>{props.label}</label>
            {inputElement}
            {!isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    );
};

export default Input;