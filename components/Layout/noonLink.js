import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import Icon from '../Icon';

export function HBWLink(prop) {
  const type = `hbw-btn-${prop.type || 'default'}`;
  const size = prop.size ? `hbw-btn-${prop.size}` : '';
  const fabsize = prop.fab && prop.size ? `hbw-btn-fab-${prop.size}` : '';
  // const
  return (
    <a
      type={prop.htmlType}
      style={prop.style}
      disabled={prop.loading || prop.disabled}
      href={prop.href || prop.to}
      className={classNames(
        'hbw-btn',
        type,
        prop.fab ? fabsize : size,
        {
          'hbw-btn-rounded': prop.rounded,
          'hbw-btn-fab': prop.fab,
          'hbw-btn-link': prop.link,
          'hbw-btn-outlined': prop.outlined,
          'hbw-btn-block': prop.block,
        },
        prop.className,
      )}
      onClick={
        prop.to
          ? (e) => {
              e.preventDefault();
              prop.history.push(prop.to);
            }
          : prop.onClick
      }
    >
      {prop.icon && <Icon name={prop.icon} rotate={prop.rotate} />}
      {prop.faIcon && !prop.icon && <span className={classNames('fa fa-fw fa-lg', `fa-${prop.faIcon}`)} />}
      {prop.value ? prop.value : prop.children}
      {prop.loading && <span className="hbw-btn-loader" />}
    </a>
  );
}

export default withRouter(HBWLink);
