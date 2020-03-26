import React from 'react';
import { render } from '@testing-library/react';
import FormField from '../../../Component/Form/FormField';
import InvalidParameter from '../../../Type/Error/InvalidParameter';

test('default', () => {
    const register = () => {};

    const invalidParameters: Array<InvalidParameter> = [
        { name: 'name', reason: 'Should not be empty' }
    ];

    const { container } = render(
        <FormField register={register} name='name' label='label' invalidParameters={invalidParameters} />
    );

    expect(container.outerHTML).toBe(`
        <div>
            <div class="field error">
                <label>label</label>
                <input type="text" name="name">
                <div class="ui pointing red basic label">Should not be empty</div>
            </div>
        </div>
    `.replace(/\n {2,}/g, ''));
});
