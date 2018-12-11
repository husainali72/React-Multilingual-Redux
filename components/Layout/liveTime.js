import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Time from './time';

export default class LiveTime extends Component {
  static propTypes = {
    value: PropTypes.string,
    rendered: PropTypes.bool,
    children: PropTypes.func,
    onUpdate: PropTypes.func,
  };

  static defaultProps = {
    rendered: false,
    children: null,
    value: null,
    onUpdate: null,
  };

  state = {
    time: this.props.value ? Math.floor((new Date() - new Date(this.props.value)) / 1000) : 0,
  };
  componentDidMount() {
    if (Math.abs(this.state.time) > 86200) {
      if (this.timer) clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        this.setState(
          prevState => ({
            time: prevState.time + 1,
          }),
          () => {
            if (this.props.onUpdate) this.props.onUpdate(this.state.time);
          },
        );
      }, 1000);
    }
  }
  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }
  render() {
    const { rendered, children } = this.props;
    return rendered ? (
      children ? (
        children({ value: this.state.time })
      ) : (
        ''
      )
    ) : (
      <Time value={Math.abs(this.state.time)} className={classNames({ withHour: Math.abs(this.state.time) >= 3600 })} />
    );
  }
}
