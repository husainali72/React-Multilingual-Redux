import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const ProgressSpinner = (props) => {
  let progress = (props.progress || 0) % 100;
  progress = props.antiClockwise ? -progress : progress;
  const circleLength = 2 * 3.14 * props.radius;
  const progressPrecenatge = (circleLength * (100 - progress)) / 100;
  const halfThickness = props.thickness / 2;
  let point = {};
  if (!props.noPointer) {
    const x = props.radius * Math.sin(3.6 * progress * (Math.PI / 180));
    const y = props.radius * Math.cos(3.6 * progress * (Math.PI / 180));
    point = {
      x: (props.radius + x).toFixed(1),
      y: (props.radius - y).toFixed(1),
      size: props.thickness * 4,
    };
  }
  const className = ClassNames('progress-spinner', props.className);

  return (
    <div
      className={className}
      style={{
        height: `${props.radius + props.radius + 10}px`,
        width: `${props.radius + props.radius + 10}px`,
        ...props.style,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: props.color,
          fontSize: `${Math.max(props.radius / 22, 0.6)}rem`,
          direction: 'ltr',
        }}
      >
        {props.text}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={props.radius + props.radius + 10}
        width={props.radius + props.radius + 10}
        viewBox={`0 0 ${props.radius + props.radius + 10} ${props.radius + props.radius + 10}`}
      >
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient-blue">
          <stop stopColor="#01c3f9" offset="0%" />
          <stop stopColor="#07c8f4" offset="10%" />
          <stop stopColor="#0ecdef" offset="20%" />
          <stop stopColor="#14d2ea" offset="30%" />
          <stop stopColor="#1ad7e5" offset="40%" />
          <stop stopColor="#20dde1" offset="50%" />
          <stop stopColor="#27e2dc" offset="60%" />
          <stop stopColor="#2de7d7" offset="70%" />
          <stop stopColor="#33ecd2" offset="80%" />
          <stop stopColor="#3af1cd" offset="90%" />
          <stop stopColor="#40f6c8" offset="100%" />
        </linearGradient>
        <filter id="dropshadow" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="1" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <circle
          fill={props.fill}
          strokeWidth="0"
          cx={props.radius + 5}
          cy={props.radius + 5}
          r={props.radius - halfThickness}
        />
        <circle
          fill="none"
          stroke={props.baseColor}
          strokeWidth={props.thickness > 3 ? props.thickness - 1 : props.thickness}
          cx={props.radius + 5}
          cy={props.radius + 5}
          r={props.radius}
          filter={props.noShadow ? '' : 'url(#dropshadow)'}
        />
        <circle
          fill="none"
          stroke={props.activeColor ? props.activeColor : 'url(#gradient-blue)'}
          strokeDasharray={circleLength}
          strokeDashoffset={progressPrecenatge}
          strokeWidth={props.thickness}
          cx={props.radius + 5}
          cy={props.radius + 5}
          r={props.radius}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      {!props.noPointer && (
        <div
          className="progress-spinner__pointer"
          style={{
            width: `${point.size}px`,
            height: `${point.size}px`,
            margin: props.thickness < 3 ? '0 0 0 0' : `-${props.thickness - 1}px 0 0 -${props.thickness - 1}px`,
            transform: `translate(${point.x}px, ${point.y}px)`,
          }}
        />
      )}
    </div>
  );
};

ProgressSpinner.propTypes = {
  baseColor: PropTypes.string,
  activeColor: PropTypes.string,
  color: PropTypes.string,
  progress: PropTypes.number,
  style: PropTypes.shape(),
  radius: PropTypes.number,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),
  thickness: PropTypes.number,
  antiClockwise: PropTypes.bool,
  fill: PropTypes.string,
  noPointer: PropTypes.bool,
  noShadow: PropTypes.bool,
  className: PropTypes.string,
};

ProgressSpinner.defaultProps = {
  baseColor: '#01C3F94d',
  activeColor: '',
  color: 'rgb(24, 162, 213)',
  progress: 100,
  style: {},
  radius: 50,
  text: '',
  thickness: 4,
  fill: '#fff',
  antiClockwise: false,
  noPointer: false,
  className: '',
  noShadow: false,
};

export default ProgressSpinner;
