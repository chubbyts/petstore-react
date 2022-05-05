import { render } from '@testing-library/react';
import TextField from '../../../Component/Form/TextField';
import InvalidParameter from '../../../Model/Error/InvalidParameter';
import { UseFormRegisterReturn } from 'react-hook-form';

test('default', () => {
    const register = (name: string) => ({ ...({} as UseFormRegisterReturn), name });

    const invalidParameters: Array<InvalidParameter> = [{ name: 'name', reason: 'Should not be empty' }];

    const { container } = render(
        <TextField register={register} name="name" label="label" invalidParameters={invalidParameters} />,
    );

    expect(container.outerHTML).toBe(
        `
        <div>
            <div class="form-field error">
                <label>label</label>
                <input type="text" name="name" value="">
                <ul>
                    <li>Should not be empty</li>
                </ul>
            </div>
        </div>
    `
            .replace(/\n/g, '')
            .replace(/ {2,}/g, ''),
    );
});
