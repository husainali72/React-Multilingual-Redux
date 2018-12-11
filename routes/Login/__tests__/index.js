import React from 'react';
import test from 'ava';
import { noop } from 'lodash';
import configureStore from 'redux/store';
import { fromJS } from 'immutable';
import Login from '../index';

const initialState = fromJS({});
const store = configureStore(initialState);

const { expect, shallow, createSpy } = testHelper;

const testProps = {
  history: { push: noop },
  getTranslation: noop,
  loginUser: noop,
};

const shallowRenderer = (props = testProps) => shallow(<Login store={store} {...props} />).dive();

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component.find('div'));
});

test('get translation is not called when component mount', () => {
  const getTranslation = createSpy();
  shallowRenderer({
    ...testProps,
    getTranslation,
  });
  const translation = {
    locale: 'en',
    button: ['signup'],
  };
  expect(getTranslation).toNotHaveBeenCalled(translation);
});
