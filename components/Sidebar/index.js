import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Column } from '../Layout';

const Template = (prop) => {
  const isRtl = document.body.dir === 'rtl';
  return (
    <div className="hbw-sidebar" style={{ top: prop.offset }}>
      <div className="hbw-sidebar-overlay" onClick={prop.onClose} />
      <Column
        nowrap
        style={{ padding: prop.padding, ...prop.style }}
        className={classNames(
          'hbw-sidebar-wrapper',
          'animated',
          'faster',
          isRtl ? 'slideInRight' : 'slideInLeft',
          prop.className,
        )}
      >
        {prop.children}
      </Column>
    </div>
  );
};

const sidebarRoot = document.getElementById('sidebar-root');

export default class Sidebar extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    sidebarRoot.appendChild(this.el);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    sidebarRoot.removeChild(this.el);
    document.body.style.overflow = 'initial';
  }

  render() {
    return ReactDOM.createPortal(<Template {...this.props} />, this.el);
  }
}
