import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Modal extends Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    onClose: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    title: null,
    onClose: null,
    className: '',
  };

  componentWillMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'initial';
  }

  render() {
    const { title, children, onClose, className, ...rest } = this.props;
    return (
      <div className="hbw-modal">
        <div className="backdrop" onClick={onClose} />
        <div className={classNames('modal-wrapper', className)} {...rest}>
          {title && <header className="modal-header">{title}</header>}
          {title && <div className="hr" />}
          {children}
        </div>
      </div>
    );
  }
}
