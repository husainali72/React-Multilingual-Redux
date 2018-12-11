import React from 'react';
import classNames from 'classnames';

export default function Center(prop) {
  const { children, className, style, ...rest } = prop;
  return (
    <div className={classNames('flex-center', className)} style={style} {...rest}>
      {children}
    </div>
  );
}
