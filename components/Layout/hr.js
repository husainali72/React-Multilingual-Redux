import React from 'react';
import classNames from 'classnames';

export default function Hr(prop) {
  return (
    <span
      style={{ width: prop.width, ...prop.style }}
      data-text={prop.text}
      className={classNames(prop.text ? 'hr-or' : 'hr', prop.className)}
    >
      {prop.children}
    </span>
  );
}
