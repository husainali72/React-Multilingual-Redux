import React from 'react';
import classNames from 'classnames';

export default function Flex(prop) {
  const { children, value, className, ref, ...rest } = prop;
  return (
    <div {...rest} className={classNames(`flex-${value || 'auto'}`, className)}>
      {children}
    </div>
  );
}
