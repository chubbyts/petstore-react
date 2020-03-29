import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { CreatePet } from '../../../ApiClient/Pet';
import { Link, useHistory } from 'react-router-dom';
import HttpError from '../../../Model/Error/HttpError';
import HttpErrorPartial from '../../Partial/HttpError';
import PetForm from '../../Form/PetForm';
import UnprocessableEntity from '../../../Model/Error/UnprocessableEntity';
import PetRequest from '../../../Model/Pet/PetRequest';

const Create: React.FC = () => {

    const history = useHistory();

    const [httpError, setHttpError] = useState<HttpError>();

    document.title = 'Create Pet';

    const submitPet = async (pet: PetRequest) => {
        const response = await CreatePet(pet);

        if (response instanceof HttpError) {
            setHttpError(response);
        } else {
            setHttpError(undefined);

            history.push('/pet');
        }
    };

    return (
        <main className='ui padded grid'>
            {httpError instanceof HttpError ? (
                <HttpErrorPartial httpError={httpError} />
            ) : ''}
            <div className='row'>
                <h1 className='ui huge dividing header'>Create Pet</h1>
            </div>
            <div className='row'>
                <div className='ui attached segment'>
                    <PetForm submitPet={submitPet} error={httpError instanceof UnprocessableEntity ? httpError : undefined} />
                </div>
            </div>
            <div className='row'>
                <Button as={Link} to='/pet'>List</Button>
            </div>
        </main>
    );
};

export default Create;
