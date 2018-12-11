import React from 'react';
import classNames from 'classnames';

export default function Card(prop) {
  const { spacing, padding, height, width, style, className, children, ...rest } = prop;
  return (
    <div
      style={{ padding: spacing || padding, height, width, ...style }}
      className={classNames('hbw-card', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
