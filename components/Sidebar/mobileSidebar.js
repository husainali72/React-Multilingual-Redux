import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Sidebar from './index';
import Icon from '../Icon';
import { Hr, Row, Avatar } from '../Layout';
import { translationText } from '../../helpers';

export default function MobileSidebar(prop) {
  const { hbwText, history, logout, user } = prop;
  const items = [
    {
      label: 'tab.main',
      url: '/home',
      icon: 'home',
    },
    {
      label: 'tab.study',
      url: '/study',
      icon: 'study',
    },
    {
      label: 'tab.profilePage',
      url: '/complete-profile',
      icon: 'user',
    },
    {
      label: 'home.pricingTitle',
      url: '/pricing',
      icon: 'dollar',
    },
    {
      label: 'tab.logOut',
      onClick: logout,
      faIcon: 'sign-out',
    },
  ];
  return (
    <Sidebar className="hbw-sidebar-mobile" offset="0px" onClose={prop.onClose}>
      <Row nowrap className="mtb-1 mlr-1">
        <Avatar url={user.profile_pic} />
        <div className="player-info">
          <div className="player-title">{user.name}</div>
          {!isEmpty(user.school) && <div className="player-score">{user.school.name}</div>}
        </div>
      </Row>
      <Hr />
      <ul className="hbw-list">
        {items.map((item, index) => (
          <li key={index} className={classNames({ active: item.url === history.location.pathname })}>
            {item.icon && <Icon name={item.icon} height="16px" />}
            {item.faIcon && <i className={`fa fa-${item.faIcon}`} />}
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                prop.onClose();
                if (item.url) history.push(item.url);
                if (item.onClick) item.onClick();
              }}
            >
              {translationText(hbwText, item.label)}
            </Link>
          </li>
        ))}
      </ul>
    </Sidebar>
  );
}
