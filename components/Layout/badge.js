import React from 'react';
import classNames from 'classnames';

export default function Badge(prop) {
  const { type, color, size, rounded, value, style, className, children, ...rest } = prop;
  const classType = prop.type || prop.color ? `hbw-badge-${prop.type || prop.color}` : 'default';
  const classSize = prop.size ? `hbw-badge-${prop.rounded ? 'rounded-' : ''}${prop.size}` : '';
  const font = prop.value && prop.rounded ? prop.value.length * 0.09 : 0;
  return (
    <div
      className={classNames('hbw-badge', { 'hbw-badge-rounded': prop.rounded }, classType, classSize, prop.className)}
      style={{ fontSize: `${1.2 - font}rem`, ...prop.style }}
      {...rest}
    >
      {prop.value ? prop.value : prop.children}
    </div>
  );
}
