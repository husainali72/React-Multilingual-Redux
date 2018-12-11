import React from 'react';
import classNames from 'classnames';

export default function Flexbox(prop) {
  const { direction, dir, flex, justify, align, className, nowrap, reverse, spacing, children, ...rest } = prop;
  const $align = align ? `align-${align}` : '';
  const $justify = justify ? `justify-${justify}` : '';
  const $flex = flex ? `flex-${flex}` : '';

  return (
    <div
      className={classNames(
        (direction || dir) === 'column' ? 'flex-column' : 'flex-row',
        $align,
        $justify,
        $flex,
        { 'flex-nowrap': !!nowrap, reverse },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
