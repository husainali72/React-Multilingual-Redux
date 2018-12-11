import React, { Component } from 'react';
import { shape, string, oneOfType, arrayOf, element } from 'prop-types';

export default class Select extends Component {
  static propTypes = {
    style: shape(),
    className: string,
    children: oneOfType([arrayOf(element), element]).isRequired,
  };

  static defaultProps = {
    style: {},
    className: '',
  };

  componentWillUnmount() {}

  render() {
    const { style, className } = this.props;

    return (
      <div
        className={className}
        ref={(node) => {
          this.node = node;
        }}
        style={style}
      >
        {this.props.children}
      </div>
    );
  }
}
