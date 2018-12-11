import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { store } from '../../app';
import { TOAST_DEFAULT_DISMISS_TIME } from '../../constants';
import { ADD_TOAST, REMOVE_TOAST } from '../../redux/constants';
import './toast.scss';

let id = 0;
export const addToast = (text, type, time) => {
  if (!text) {
    console.log('Error: empty text filed');
    return;
  }
  id++;
  store.dispatch({
    type: ADD_TOAST,
    payload: {
      id,
      text,
      type: type || 'info',
      time: time ? Number(time) * 1000 : TOAST_DEFAULT_DISMISS_TIME * 1000,
    },
  });
};

export const TOAST_TYPE = { SUCCESS: 'success', ERROR: 'error', INFO: 'info', WARNING: 'warning' };

class Toast extends Component {
  static propTypes = {
    toasts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
        type: PropTypes.oneOf(['error', 'success', 'info', 'warning']),
      }),
    ).isRequired,
    top: PropTypes.bool,
    right: PropTypes.bool,
    dismissToast: PropTypes.func.isRequired,
  };

  static defaultProps = {
    top: false,
    right: false,
  };

  render() {
    const { toasts, dismissToast, top, right } = this.props;
    return (
      <div className={classNames('toast-container', { top, right })}>
        {toasts.map(toast => (
          <div key={toast.id} className={classNames('toast animated pulse', toast.type)}>
            <p className="toast__content">{toast.text}</p>
            <button className="toast__dismiss" onClick={() => dismissToast(toast.id)}>
              x
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  toasts: state.toJS().toast.toasts,
});

const mapDispatchToProps = dispatch => ({
  dismissToast: id => dispatch({ type: REMOVE_TOAST, payload: id }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toast);
