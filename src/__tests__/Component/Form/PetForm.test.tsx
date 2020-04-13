import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import InvalidParameter from '../../../Model/Error/InvalidParameter';
import PetForm from '../../../Component/Form/PetForm';
import PetRequest from '../../../Model/Pet/PetRequest';
import PetResponse from '../../../Model/Pet/PetResponse';
import UnprocessableEntity from '../../../Model/Error/UnprocessableEntity';
import Vaccination from '../../../Model/Pet/Vaccination';

test('without error', () => {
    const submitPet: { (pet: PetRequest): void; } = (pet: PetRequest): void => { };

    const pet = new PetResponse({
        id: '4d783b77-eb09-4603-b99b-f590b605eaa9',
        createdAt: '2005-08-15T15:52:01+00:00',
        name: 'Brownie',
        vaccinations: [
            new Vaccination({ name: 'Rabies' })
        ]
    });

    const { container } = render(
        <PetForm submitPet={submitPet} pet={pet} />
    );

    expect(container.outerHTML).toBe(`
        <div>
            <form>
                <fieldset>
                    <div class="form-field">
                        <label>Name</label>
                        <input type="text" name="name">
                    </div>
                    <div class="form-field">
                        <label>Tag</label>
                        <input type="text" name="tag">
                    </div>
                    <div class="form-field">
                        <label>Vaccanations</label>
                        <div>
                            <fieldset>
                                <div class="form-field">
                                    <label>Name</label>
                                    <input type="text" name="vaccinations[0].name">
                                </div>
                                <button data-testid="remove-vaccination-0" type="button" class="btn-red">Remove</button>
                            </fieldset>
                            <button data-testid="add-vaccination" type="button" class="btn-green">Add</button>
                        </div>
                    </div>
                    <button data-testid="submit-pet" class="btn-blue">Save</button>
                </fieldset>
            </form>
        </div>
    `.replace(/\n/g, '').replace(/ {2,}/g, ''));
});

test('with error', () => {
    const submitPet: { (pet: PetRequest): any; } = (pet: PetRequest) => { };

    const pet = new PetResponse({
        id: '4d783b77-eb09-4603-b99b-f590b605eaa9',
        createdAt: '2005-08-15T15:52:01+00:00',
        name: '',
        vaccinations: [
            new Vaccination({ name: '' })
        ]
    });

    const invalidParameters: Array<InvalidParameter> = [
        { name: 'name', reason: 'Should not be empty' },
        { name: 'vaccinations[0].name', reason: 'Should not be empty' }
    ];

    const unprocessableEntity = new UnprocessableEntity({
        title: 'title',
        invalidParameters: invalidParameters
    });

    const { container } = render(
        <PetForm submitPet={submitPet} pet={pet} error={unprocessableEntity} />
    );

    expect(container.outerHTML).toBe(`
        <div>
            <form>
                <fieldset>
                    <div class="form-field error">
                        <label>Name</label>
                        <input type="text" name="name">
                        <ul>
                            <li>Should not be empty</li>
                        </ul>
                    </div>
                    <div class="form-field">
                        <label>Tag</label>
                        <input type="text" name="tag">
                    </div>
                    <div class="form-field">
                        <label>Vaccanations</label>
                        <div>
                            <fieldset>
                                <div class="form-field error">
                                    <label>Name</label>
                                    <input type="text" name="vaccinations[0].name">
                                    <ul>
                                        <li>Should not be empty</li>
                                    </ul>
                                </div>
                                <button data-testid="remove-vaccination-0" type="button" class="btn-red">Remove</button>
                            </fieldset>
                            <button data-testid="add-vaccination" type="button" class="btn-green">Add</button>
                        </div>
                    </div>
                    <button data-testid="submit-pet" class="btn-blue">Save</button>
                </fieldset>
            </form>
        </div>
    `.replace(/\n/g, '').replace(/ {2,}/g, ''));
});

test('add vaccination', async () => {
    const submitPet: { (pet: PetRequest): any; } = (pet: PetRequest) => { };

    const pet = new PetResponse({
        id: '4d783b77-eb09-4603-b99b-f590b605eaa9',
        createdAt: '2005-08-15T15:52:01+00:00',
        name: 'Brownie',
        vaccinations: [
            new Vaccination({ name: 'Rabies' })
        ]
    });

    const { container, findByTestId } = render(
        <PetForm submitPet={submitPet} pet={pet} />
    );

    const submitButton = await findByTestId('add-vaccination');

    fireEvent.click(submitButton);

    await findByTestId('add-vaccination');

    expect(container.outerHTML).toBe(`
        <div>
            <form>
                <fieldset>
                    <div class="form-field">
                        <label>Name</label>
                        <input type="text" name="name">
                    </div>
                    <div class="form-field">
                        <label>Tag</label>
                        <input type="text" name="tag">
                    </div>
                    <div class="form-field">
                        <label>Vaccanations</label>
                        <div>
                            <fieldset>
                                <div class="form-field">
                                    <label>Name</label>
                                    <input type="text" name="vaccinations[0].name">
                                </div>
                                <button data-testid="remove-vaccination-0" type="button" class="btn-red">Remove</button>
                            </fieldset>
                            <fieldset>
                                <div class="form-field">
                                    <label>Name</label>
                                    <input type="text" name="vaccinations[1].name">
                                </div>
                                <button data-testid="remove-vaccination-1" type="button" class="btn-red">Remove</button>
                            </fieldset>
                            <button data-testid="add-vaccination" type="button" class="btn-green">Add</button>
                        </div>
                    </div>
                    <button data-testid="submit-pet" class="btn-blue">Save</button>
                </fieldset>
            </form>
        </div>
    `.replace(/\n/g, '').replace(/ {2,}/g, ''));
});

test('remove vaccination', async () => {
    const submitPet: { (pet: PetRequest): any; } = (pet: PetRequest) => { };

    const pet = new PetResponse({
        id: '4d783b77-eb09-4603-b99b-f590b605eaa9',
        createdAt: '2005-08-15T15:52:01+00:00',
        name: 'Brownie',
        vaccinations: [
            new Vaccination({ name: 'Rabies' })
        ]
    });

    const { container, findByTestId } = render(
        <PetForm submitPet={submitPet} pet={pet} />
    );

    const submitButton = await findByTestId('remove-vaccination-0');

    fireEvent.click(submitButton);

    await findByTestId('submit-pet');

    expect(container.outerHTML).toBe(`
        <div>
            <form>
                <fieldset>
                    <div class="form-field">
                        <label>Name</label>
                        <input type="text" name="name">
                    </div>
                    <div class="form-field">
                        <label>Tag</label>
                        <input type="text" name="tag">
                    </div>
                    <div class="form-field">
                        <label>Vaccanations</label>
                        <div>
                            <button data-testid="add-vaccination" type="button" class="btn-green">Add</button>
                        </div>
                    </div>
                    <button data-testid="submit-pet" class="btn-blue">Save</button>
                </fieldset>
            </form>
        </div>
    `.replace(/\n/g, '').replace(/ {2,}/g, ''));
});

test('submit minimal', async () => {
    const submitPet: { (pet: PetRequest): any; } = jest.fn((pet: PetRequest) => { });

    const pet = new PetResponse({
        id: '4d783b77-eb09-4603-b99b-f590b605eaa9',
        createdAt: '2005-08-15T15:52:01+00:00',
        name: 'Brownie'
    });

    const { container, findByTestId } = render(
        <PetForm submitPet={submitPet} pet={pet} />
    );

    const submitButton = await findByTestId('submit-pet');

    fireEvent.click(submitButton);

    await findByTestId('submit-pet');

    expect(container.outerHTML).toBe(`
        <div>
            <form>
                <fieldset>
                    <div class="form-field">
                        <label>Name</label>
                        <input type="text" name="name">
                    </div>
                    <div class="form-field">
                        <label>Tag</label>
                        <input type="text" name="tag">
                    </div>
                    <div class="form-field">
                        <label>Vaccanations</label>
                        <div>
                            <button data-testid="add-vaccination" type="button" class="btn-green">Add</button>
                        </div>
                    </div>
                    <button data-testid="submit-pet" class="btn-blue">Save</button>
                </fieldset>
            </form>
        </div>
    `.replace(/\n/g, '').replace(/ {2,}/g, ''));

    expect(submitPet.mock.calls.length).toBe(1);
});

test('submit maximal', async () => {
    const submitPet: { (pet: PetRequest): any; } = jest.fn((pet: PetRequest) => { });

    const pet = new PetResponse({
        id: '4d783b77-eb09-4603-b99b-f590b605eaa9',
        createdAt: '2005-08-15T15:52:01+00:00',
        name: 'Brownie',
        tag: '0001-000',
        vaccinations: [
            new Vaccination({ name: 'Rabies' })
        ]
    });

    const { container, findByTestId } = render(
        <PetForm submitPet={submitPet} pet={pet} />
    );

    const submitButton = await findByTestId('submit-pet');

    fireEvent.click(submitButton);

    await findByTestId('submit-pet');

    expect(container.outerHTML).toBe(`
        <div>
            <form>
                <fieldset>
                    <div class="form-field">
                        <label>Name</label>
                        <input type="text" name="name">
                    </div>
                    <div class="form-field">
                        <label>Tag</label>
                        <input type="text" name="tag">
                    </div>
                    <div class="form-field">
                        <label>Vaccanations</label>
                        <div>
                            <fieldset>
                                <div class="form-field">
                                    <label>Name</label>
                                    <input type="text" name="vaccinations[0].name">
                                </div>
                                <button data-testid="remove-vaccination-0" type="button" class="btn-red">Remove</button>
                            </fieldset>
                            <button data-testid="add-vaccination" type="button" class="btn-green">Add</button>
                        </div>
                    </div>
                    <button data-testid="submit-pet" class="btn-blue">Save</button>
                </fieldset>
            </form>
        </div>
    `.replace(/\n/g, '').replace(/ {2,}/g, ''));

    expect(submitPet.mock.calls.length).toBe(1);
});
