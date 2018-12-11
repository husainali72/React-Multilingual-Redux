import React from 'react';
import Icon from '../../components/Icon';
import Row from '../../components/Layout/row';

const Rating = (prop) => {
  const { rating, width, height, className, color, stroke } = prop;
  const totalStar = new Array(rating).fill(1);
  return (
    <Row align="center" justify="center" className={className}>
      {totalStar.map((value, index) => (
        <Icon color={color} stroke={stroke} key={index} width={width} height={height} name="star" />
      ))}
    </Row>
  );
};

export default Rating;
