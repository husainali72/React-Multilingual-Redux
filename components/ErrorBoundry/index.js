import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundry extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  state = {
    error: false,
  };

  componentDidCatch(error) {
    console.log(error);
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      // Fallback UI
      return <h1 style={{ textAlign: 'center' }}>something went wrong!</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
