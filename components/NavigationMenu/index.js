import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Row, Vr } from '../Layout';
import Icon from '../Icon';
import { translationText } from '../../helpers';
import { translationType } from '../../types';

class NavigationMenu extends Component {
  static propTypes = {
    activeTab: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelect: PropTypes.func,
    hbwText: translationType,
    noUnderline: PropTypes.bool,
    seperator: PropTypes.bool,
    isDisabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.shape(),
    sideIcon: PropTypes.bool,
  };

  static defaultProps = {
    activeTab: null,
    onSelect: null,
    hbwText: null,
    noUnderline: false,
    seperator: false,
    isDisabled: false,
    className: '',
    style: {},
    sideIcon: false,
  };

  constructor(props) {
    super(props);

    /* eslint-disable react/prop-types */
    const { history, activeTab, items } = this.props;
    if (history.location.pathname === '/') {
      this.state = {
        activeTab: activeTab || items.findIndex(o => history.location.pathname === o.url),
      };
    } else {
      this.state = {
        activeTab:
          activeTab ||
          items.findIndex((o) => {
            if (o.url === '/') return false;
            return o.exact ? o.url === history.location.pathname : history.location.pathname.search(o.url) !== -1;
          }),
      };
    }
  }

  componentWillReceiveProps({ history, activeTab, items }) {
    if (history.location.pathname) {
      if (history.location.pathname === '/') {
        this.setState({
          activeTab: activeTab || items.findIndex(o => history.location.pathname === o.url),
        });
      } else {
        this.setState({
          activeTab:
            activeTab ||
            items.findIndex((o) => {
              if (o.url === '/') return false;
              return o.exact ? o.url === history.location.pathname : history.location.pathname.search(o.url) !== -1;
            }),
        });
      }
    }
  }

  tabClicked = (item, isDisabled) => {
    if (!isDisabled) {
      if (this.props.onSelect) this.props.onSelect(item);
      // if (item.url) this.props.history.push({ pathname: item.url });
    }
  };

  render() {
    const { items, hbwText, noUnderline, seperator, className, style, isDisabled, sideIcon } = this.props;
    const { activeTab } = this.state;
    const itemWidth = 100 / items.length;
    const isRtl = document.body.dir === 'rtl';
    return (
      <Row align="center" justify="start" className={classNames('hbw-navigation-menu', className)} style={style}>
        {items.map((item, index) => (
          <React.Fragment key={item.label || index}>
            <Link
              className={classNames('hbw-navigation-menu__item', {
                active: activeTab === index,
                disabled: isDisabled,
                sideIcon,
              })}
              to={!isDisabled ? item.url || '#' : '#'}
              onClick={() => this.tabClicked(item, isDisabled)}
            >
              {!!item.icon && <Icon name={item.icon} />}
              {!!item.faIcon && !item.icon && <span className={`fa fa-${item.faIcon} fa-lg`} />}
              {item.label && <span>{hbwText ? translationText(hbwText, item.label) : item.label}</span>}
            </Link>
            {items.length !== index + 1 && seperator && <Vr />}
          </React.Fragment>
        ))}
        {!noUnderline && (
          <span
            className="active-indicator"
            style={{ width: `${itemWidth}%`, transform: `translateX(${activeTab * (isRtl ? -100 : 100)}%)` }}
          />
        )}
      </Row>
    );
  }
}

export default withRouter(NavigationMenu);
