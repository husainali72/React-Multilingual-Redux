import React from 'react';
import PropTypes from 'prop-types';

const SignalIndicator = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ margin: props.margin }}
    height={props.height}
    width={props.width}
    viewBox="0 0 24.205 19.313"
  >
    <g id="Group_21279" transform="rotate(-90 -3319.816 12982.184)">
      <path
        id="Path_71250"
        fill={props.value > 80 ? props.activeColor : props.baseColor}
        d="M425.191 13.047a17.539 17.539 0 0 1-.874 4.324 16.525 16.525 0 0 1-3.161 5.546c-.263.309-.539.611-.828.9a.71.71 0 0 1-1.045.079.721.721 0 0 1 .066-1.078 14.718 14.718 0 0 0 4.028-7.32 15.175 15.175 0 0 0-3.785-14.075c-.105-.112-.217-.217-.315-.335a.707.707 0 0 1 .013-1.005.69.69 0 0 1 1 .033 16.354 16.354 0 0 1 2.786 3.68 17.919 17.919 0 0 1 2.05 6.545 14.892 14.892 0 0 1 .065 2.706z"
        transform="translate(9237.144 16302.115)"
      />
      <path
        id="Path_71252"
        fill={props.value > 60 ? props.activeColor : props.baseColor}
        d="M377.259 54.036a10.957 10.957 0 0 0-3.213-7.517.709.709 0 1 1 1-.986A11.889 11.889 0 0 1 378 50.357a12.429 12.429 0 0 1-2.8 12.682 2.2 2.2 0 0 1-.276.276.7.7 0 0 1-.979-.986c.315-.348.644-.69.933-1.058a11.451 11.451 0 0 0 2.381-7.235z"
        transform="translate(9279.473 16259.741)"
      />
      <path
        id="Path_71253"
        fill={props.value > 40 ? props.activeColor : props.baseColor}
        d="M332.158 96.621a8.377 8.377 0 0 1-2.392 5.868.725.725 0 0 1-.8.243.679.679 0 0 1-.473-.578.782.782 0 0 1 .283-.67 6.788 6.788 0 0 0 1.884-3.784 6.873 6.873 0 0 0-1.656-5.7c-.079-.092-.164-.177-.243-.263a.705.705 0 1 1 1-.979 8.318 8.318 0 0 1 2.195 4.041 9.041 9.041 0 0 1 .202 1.822z"
        transform="translate(9321.774 16217.483)"
      />
      <path
        id="Path_71251"
        fill={props.value > 5 ? props.activeColor : props.baseColor}
        d="M195.537 120.2a3.332 3.332 0 1 1-3.337 3.322 3.337 3.337 0 0 1 3.337-3.322zm.01 1.1a2.223 2.223 0 1 0 2.208 2.228 2.24 2.24 0 0 0-2.207-2.228z"
        transform="translate(9450.854 16190.579)"
      />
    </g>
  </svg>
);

SignalIndicator.propTypes = {
  baseColor: PropTypes.string,
  activeColor: PropTypes.string,
  value: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string,
  margin: PropTypes.string,
};

SignalIndicator.defaultProps = {
  baseColor: '#ddd',
  activeColor: '#04c5f6',
  value: 0,
  height: '36px',
  width: '30px',
  margin: '0',
};

export default SignalIndicator;
