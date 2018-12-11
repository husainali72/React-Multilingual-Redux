import React from 'react';
import '../../assets/icons/icons.svg';

const Icon = prop => (
  <svg
    onClick={prop.onClick}
    className={`icon icon-${prop.name} ${prop.className || ''}`}
    style={{
      display: 'inline-block',
      verticalAlign: 'middle',
      transformOrigin: '50% 50%',
      transform: `rotate(${prop.rotate || 0}deg)`,
      ...prop.style,
    }}
    width={prop.width || '32px'}
    height={prop.height || '32px'}
  >
    <use
      xlinkHref={`#icons_${prop.name}`}
      fill={prop.gradientFill ? `url(#icons_gradient-${prop.gradientFill})` : prop.color || prop.fill}
      stroke={prop.gradientStroke ? `url(#icons_gradient-${prop.gradientStroke})` : prop.stroke}
    />
  </svg>
);

export default Icon;
