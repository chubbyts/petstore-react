import React from 'react';
import { Message } from 'semantic-ui-react';
import HttpErrorType from '../../Type/Error/HttpError';
import HttpErrorWithInvalidArguments from '../../Type/Error/HttpErrorWithInvalidArguments';
import InvalidParameter from '../../Type/Error/InvalidParameter';

type props = {
    httpError: HttpErrorType
};

const HttpError = ({ httpError }: props) => {
    return (
        <div data-testid='partial-http-error' className='row'>
            <Message negative className='attached segment'>
                <Message.Header>{httpError.title}</Message.Header>
                {httpError.detail ? (<p>{httpError.detail}</p>): ''}
                {httpError.instance ? (<p>{httpError.instance}</p>): ''}
                {httpError instanceof HttpErrorWithInvalidArguments ? (
                    <ul>
                        {httpError.invalidParameters.map((invalidParameter: InvalidParameter, i) => (
                            <li key={i}><strong>{invalidParameter.name}</strong>: {invalidParameter.reason}</li>
                        ))}
                    </ul>
                ) : ''}
            </Message>
        </div>
    );
};

export default HttpError;
