import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Redirect, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { fromJS } from 'immutable';
import configureStore from 'redux/store';
import { ProtectedRoute, GuestRoute, HBWRoute } from 'components/CustomRouter';
import Main from 'components/Main';
import Toast from 'components/Toast';
import Landing from 'routes/Landing';
import Global from 'routes/Global';
import Teacher from 'routes/Teacher';
import Egypt from 'routes/Egypt';
import Login from 'routes/Login';
import Signup from 'routes/Signup';
import CompleteProfile from 'routes/CompleteProfile';
import VerifyEmail from 'routes/VerifyEmail';
import PasswordReset from 'routes/PasswordReset';
import Home from 'routes/Home';
import NotFound from 'routes/NotFound';
import Test from 'routes/Test';
import { historyListener } from 'helpers';
import cacheInvalidator from 'helpers/cacheInvalidator';
import './styles/app.scss';

cacheInvalidator();
const history = createHistory();
const initialState = fromJS({});
const store = configureStore(initialState);
history.listen(historyListener);

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Main history={history}>
        <Toast top />
        <Switch>
          <Route exact path="/index.html" render={() => <Redirect to="/" />} />
          <HBWRoute exact path="/" component={Landing} noHeader noFooter />
          <HBWRoute exact path="/global" component={Global} noHeader />
          <HBWRoute exact path="/egypt" component={Egypt} noHeader />
          <HBWRoute exact path="/teacher-profile" component={Teacher} />
          <HBWRoute exact path="/home" component={Home} />
          <GuestRoute exact path="/login" component={Login} />
          <GuestRoute exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/complete-profile" component={CompleteProfile} />
          <HBWRoute exact path="/password-reset" component={PasswordReset} noFooter />
          <HBWRoute exact path="/verify-email" component={VerifyEmail} noFooter />
          <HBWRoute exact path="/test" component={Test} />
          <HBWRoute path="*" noHeader noFooter component={NotFound} />
        </Switch>
      </Main>
    </Router>
  </Provider>
);

const AppModule = hot(module)(App);
export { store, AppModule };
