import React from 'react';
import classNames from 'classnames';

export default function Row(prop) {
  const { flex, justify, align, className, nowrap, reverse, children, ...rest } = prop;
  const $align = align ? `align-${align}` : '';
  const $justify = justify ? `justify-${justify}` : '';
  const $flex = flex ? `flex-${flex}` : '';

  return (
    <div
      className={classNames('flex-row', $align, $justify, $flex, { 'flex-nowrap': !!nowrap, reverse }, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
