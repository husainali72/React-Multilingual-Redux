import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row } from '../Layout';

// you can use only these sizes for squircle effect.
const squircleSizes = ['36px', '42px', '72px', '96px', '126px'];

export const AvatarGroup = prop => (
  <Row align="center" className="hbw-avatar-group">
    {prop.list.map((student, index) => (
      <Avatar
        className="animated zoomIn"
        key={index}
        rounded
        noShadow
        size={prop.size || '26px'}
        url={student.profile_pic}
        gender={student.gender}
      />
    ))}
    {!!prop.count && <span className="avatar-group-count">{prop.count}+</span>}
  </Row>
);

const Avatar = (props) => {
  const bg =
    props.url && props.url !== 'null'
      ? `url(${props.url})`
      : `url(${`/assets/images/${props.gender ? props.gender : 'random'}-${
        props.teacher ? 'teacher' : 'student'
      }.gif`})`;
  return (
    <div
      style={{ height: props.size, width: props.size }}
      className={classNames('hbw-avatar-wrapper', { 'avatar-shadow': !props.noShadow }, props.className)}
      onClick = {props.onClick}
    >
      <div
        className={classNames('hbw-avatar')}
        style={{
          backgroundImage: bg,
          height: props.size,
          width: props.size,
          clipPath: props.rounded ? '' : squircleSizes.includes(props.size) ? `url(#icons_squircle-${props.size})` : '',
          borderRadius: props.rounded ? '50%' : '12px',
          ...props.style,
        }}
      />
      {props.showChild && <span className="sideicon">{props.children}</span>}
      {props.loading && <span className="hbw-btn-loader" />}
    </div>
  );
};

Avatar.propTypes = {
  url: PropTypes.string,
  gender: PropTypes.string,
  size: PropTypes.string,
  rounded: PropTypes.bool,
  teacher: PropTypes.bool,
  style: PropTypes.shape(),
  className: PropTypes.string,
  noShadow: PropTypes.bool,
  showChild: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.element,
  onClick: PropTypes.func,
};

Avatar.defaultProps = {
  url: null,
  gender: 'random',
  size: '36px',
  rounded: false,
  teacher: false,
  style: {},
  className: null,
  noShadow: false,
  showChild: false,
  children: null,
  loading: false,
  onClick: () => {},
};

export default Avatar;
