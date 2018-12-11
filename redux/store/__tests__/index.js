import test from 'ava';
import configureStore from 'redux-mock-store';

const middlewares = [];
const mockStore = configureStore(middlewares);
const { expect } = testHelper;

// You would import the action from your codebase in a real scenario
const addTodo = () => ({ type: 'ADD_TODO' });

test('should dispatch action', () => {

  // Initialize mockstore with empty state
  const initialState = {};
  const store = mockStore(initialState);

  // Dispatch the action
  store.dispatch(addTodo());

  // Test if your store dispatched the expected actions
  const actions = store.getActions();
  const expectedPayload = { type: 'ADD_TODO' };
  expect(actions).toEqual([expectedPayload]);
});
