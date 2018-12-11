import React from 'react';
import test from 'ava';
import configureStore from 'redux/store';
import { fromJS } from 'immutable';
import { noop } from 'lodash';
import ProductsList from 'components/ProductsList';
import MobileBanner from 'components/MobileBanner';
import Landing from '../index';

const initialState = fromJS({});
const store = configureStore(initialState);

const { expect, shallow, createSpy } = testHelper;

const testProps = {
  listTeachers: noop,
  listProducts: noop,
  pinnedTeachers: fromJS([{}]),
  products: fromJS([{}]),
  hbwText: fromJS([{}]),
  getTranslation: noop,
  createUser: noop,
  isLoading: Boolean,
  loggedUser: { id: 'testuserId' },
  errorMessage: 'testErrorMessage',
  history: { push: noop },
};

const shallowRenderer = (props = testProps) => shallow(<Landing store={store} {...props} />).dive();

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component.find('div'));
});

test('Renders a Mobile Banner', () => {
  const component = shallowRenderer();
  expect(component.find(MobileBanner));
});

test('Renders Products List', () => {
  const component = shallowRenderer();
  expect(component.find(ProductsList));
});

test('Renders a section', () => {
  const component = shallowRenderer();
  expect(component.find('section'));
});

test('get translation is called when component mount', () => {
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

// test('simulate component did mount', () => {
//   const wrapper = mount(<Navigator />);
// });
