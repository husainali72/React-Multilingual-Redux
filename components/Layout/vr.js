import React from 'react';
import classNames from 'classnames';

export default function Vr(prop) {
  return (
    <span
      style={{ height: prop.height, ...prop.style }}
      data-text={prop.text}
      className={classNames(prop.text ? 'vr-or' : 'vr', prop.className)}
    >
      {prop.children}
    </span>
  );
}
