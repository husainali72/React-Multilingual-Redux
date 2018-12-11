import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Icon from '../Icon';
import { translationText } from '../../helpers';
import { translationType } from '../../types';

const { arrayOf, oneOfType, string, number, object, func, shape, bool } = PropTypes;

export default class Select extends Component {
  static propTypes = {
    list: arrayOf(oneOfType([string, number, object])).isRequired,
    title: string,
    options: shape({
      closeOnEsc: bool,
      closeOnOutsideClick: bool,
      closeOnSelect: bool,
    }),
    onSelect: func,
    selectedItem: shape(),
    listItem: string,
    style: shape(),
    className: string,
    multiple: bool,
    hbwText: translationType,
  };

  static defaultProps = {
    title: 'Select Option',
    options: {
      closeOnEsc: true,
      closeOnOutsideClick: true,
      closeOnSelect: true,
    },
    onSelect: null,
    selectedItem: {},
    listItem: 'name',
    style: {},
    className: '',
    multiple: false,
    hbwText: null,
  };

  state = {
    listOpen: false,
    headerTitle: this.props.title,
    selected: this.props.multiple ? [] : this.props.selectedItem,
  };

  componentWillUnmount() {
    this.removeEventListener();
  }

  handleClick = (e) => {
    if (this.node && this.node.contains(e.target)) {
      return;
    }
    this.handleClickOutside();
  };

  handleKey = (e) => {
    if (e.key === 'Escape') {
      this.handleClickOutside();
    }
  };

  addEventListener() {
    if (this.props.options && this.props.options.closeOnOutsideClick) {
      document.addEventListener('mousedown', this.handleClick);
    }
    if (this.props.options && this.props.options.closeOnEsc) {
      document.addEventListener('keyup', this.handleKey);
    }
  }

  removeEventListener() {
    if (this.props.options && this.props.options.closeOnOutsideClick) {
      document.removeEventListener('mousedown', this.handleClick);
    }
    if (this.props.options && this.props.options.closeOnEsc) {
      document.removeEventListener('keyup', this.handleKey);
    }
  }

  itemSelected = (item) => {
    const { onSelect, multiple, options } = this.props;

    if (multiple) {
      const selectedItem = this.state.selected;
      const index = selectedItem.findIndex(o => o.id === item.id);
      if (index === -1) {
        selectedItem.push(item);
      } else {
        selectedItem.splice(index, 1);
      }
      if (onSelect) onSelect(selectedItem);
      this.setState({ selected: selectedItem });
    } else {
      if (onSelect) onSelect(item);
      this.setState({ selected: item });
    }
    if (options && options.closeOnSelect && !multiple) {
      this.handleClickOutside();
    }
  };

  handleClickOutside() {
    this.setState({
      listOpen: false,
    });
    this.removeEventListener();
  }

  toggleList() {
    if (this.state.listOpen) {
      this.removeEventListener();
    } else {
      this.addEventListener();
    }
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
    }));
  }

  render() {
    const { listOpen, headerTitle, selected } = this.state;
    const { list, listItem, style, className, multiple, hbwText } = this.props;

    return (
      <div
        className={`hbw-select ${className}`}
        ref={(node) => {
          this.node = node;
        }}
        style={style}
      >
        <div className="select-header" onClick={() => this.toggleList()}>
          <div className="select-header__title">
            {multiple
              ? `${selected.length} item selected`
              : !isEmpty(hbwText)
                ? translationText(hbwText, selected[listItem])
                : selected[listItem] || headerTitle}
          </div>
          <Icon name="arrow-down" className="select-header__icon" rotate={listOpen ? 180 : 0} />
        </div>

        {listOpen && (
          <ul className="select-list">
            {list.map(item => (
              <li
                className={classNames('select-list__item', {
                  selected: multiple ? selected.findIndex(o => o.id === item.id) !== -1 : selected.id === item.id,
                })}
                key={item.id}
                onClick={() => this.itemSelected(item)}
              >
                {!isEmpty(hbwText) ? translationText(hbwText, item[listItem]) : item[listItem]}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
