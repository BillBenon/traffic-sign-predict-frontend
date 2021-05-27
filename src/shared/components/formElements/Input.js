import React, { useReducer, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import { validate } from '../../utils/validators';
import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
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
        isTouched: false,
        isValid: props.initialValid || false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    const element =
        props.element === 'input' ? (
            <TextField
                id={props.id}
                type={props.type}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
                variant="outlined"
                label={props.label}
                fullWidth
            />
        ) : (
            <TextField
                id={props.id}
                type={props.type}
                label={props.label}
                multiline
                rows={props.rows || 3}
                variant="outlined"
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
                fullWidth
            />
        );

    return <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        {/* <label htmlFor={props.id}>{props.label}</label> */}
        {element}
        {!inputState.isValid && inputState.isTouched && <p><small>{props.errorText}</small></p>}
    </div>
};

export default Input;