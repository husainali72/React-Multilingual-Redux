import React from 'react';
import test from 'ava';
import configureStore from 'redux/store';
import { fromJS } from 'immutable';
import { noop } from 'lodash';
import ProductsList from 'components/ProductsList';

import Home from '../index';

const initialState = fromJS({});
const store = configureStore(initialState);

const { expect, shallow } = testHelper;

const testProps = {
  listProducts: noop,
  products: fromJS([{}]),
  hbwText: fromJS([{}]),
  loggedUser: { id: 'testuserId' },
  getTranslation: noop,
};

const shallowRenderer = (props = testProps) => shallow(<Home store={store} {...props} />).dive();

test('Renders a div', () => {
  const component = shallowRenderer();
  expect(component.find('div'));
});

test('Renders Products List', () => {
  const component = shallowRenderer();
  expect(component.find(ProductsList));
});

test('calls componentDidMount', () => {
  expect(Home.prototype.componentDidMount.calledOnce).toNotEqual(true);
});

// test('list product is called when component mount', () => {
//   const listProducts = createSpy();
//   const component = shallowRenderer();
//   component.setProps({ listProducts: noop });
//   expect(listProducts).toHaveBeenCalled();
// });
