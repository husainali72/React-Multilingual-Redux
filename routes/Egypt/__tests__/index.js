import React from 'react';
import test from 'ava';
import configureStore from 'redux/store';
import { fromJS } from 'immutable';
import Egypt from '../index';

const initialState = fromJS({});
const store = configureStore(initialState);
const { expect, shallow } = testHelper;
const testProps = {
};

const shallowRenderer = (props = testProps) =>
    shallow(<Egypt store={store} {...props} />);

test('Renders a div', () => {
    const component = shallowRenderer();
    expect(component.find('div'));
});
