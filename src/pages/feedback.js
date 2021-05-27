import React from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../shared/components/formElements/Input';
import Button from '../shared/components/formElements/Button';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../shared/utils/validators';
import { useForm } from '../shared/hooks/form-hook';
import { useHttpClient } from '../shared/hooks/http-hook';
import './feedback.css';

const Feedback = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [formState, inputHandler] = useForm({
        names: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: false
        },
        message: {
            value: '',
            isValid: false
        }
    }, false);

    const history = useHistory();

    const feedbackSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/feedback',
                'POST',
                JSON.stringify({
                    names: formState.inputs.names.value,
                    email: formState.inputs.email.value,
                    message: formState.inputs.message.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            history.push('/');
        } catch(err) {}
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className="feedback-form" onSubmit={feedbackSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    id="names"
                    element="input"
                    type="text"
                    label="Names*"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid name!"
                    onInput={inputHandler}
                />
                <Input
                    id="email"
                    element="input"
                    type="email"
                    label="E-Mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}
                />
                <Input
                    id="message"
                    element="textarea"
                    label="Your message*"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid message (atleast 5 characters)!"
                    onInput={inputHandler}
                />
                <Button blueBg type="submit" disabled={!formState.isValid}>Send feedback</Button>
            </form>
        </React.Fragment>
    );
}

export default Feedback;