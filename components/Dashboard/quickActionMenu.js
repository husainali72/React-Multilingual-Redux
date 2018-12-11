import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import {  } from '../../redux/constants';
import Icon from '../../components/Icon';
import { Button, Row } from '../../components/Layout';
import { CreateClass } from '../../components/Dashboard';
import { translationType } from '../../types';
import { SHOW_QUICK_ACTION_MENU } from '../../constants';
import { getObjectByProperty, translationText } from '../../helpers';
import Sidebar from '../Sidebar';
import { addToast, TOAST_TYPE } from '../Toast';
import { CREATE_CLASS_SIDEBAR } from '../../redux/constants';

class QuickActionMenu extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
    createClassOptions: PropTypes.shape().isRequired,
    curriculum: PropTypes.arrayOf(PropTypes.object).isRequired,
    openActionMenu: PropTypes.func.isRequired,
    closeActionMenu: PropTypes.func.isRequired,
    currentResource: PropTypes.shape().isRequired,
  };

  constructor(props) {
    /* eslint-disable react/prop-types */
    super(props);
    this.state = {
      showBtn: SHOW_QUICK_ACTION_MENU.includes(props.location.pathname.split('/')[1]),
      openMenu: false,
      showCreateClassSidebar: false,
    };
  }

  componentWillReceiveProps({ location, createClassOptions, curriculum }) {
    if (!isEmpty(location) && location.pathname !== this.props.location.pathname) {
      this.setState({
        showBtn: SHOW_QUICK_ACTION_MENU.includes(location.pathname.split('/')[1]),
      });
    }
    if (createClassOptions !== this.props.createClassOptions) {
      // if (!curriculum.length) {
      //   addToast('please select subject first', TOAST_TYPE.INFO, 5);
      //   this.closeMenu();
      //   return;
      // }
      if (isEmpty(createClassOptions)) {
        this.setState({ showCreateClassSidebar: false });
      } else {
        this.setState({ showCreateClassSidebar: true });
      }
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'initial';
  }

  toggleMenu = () => {
    this.setState(
      prevState => ({ openMenu: !prevState.openMenu }),
      () => {
        if (this.state.openMenu) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'initial';
        }
      },
    );
  };

  selectMenu = (type) => {
    const { curriculum } = this.props;
    // if (!curriculum.length) {
    //   addToast('please select subject first', TOAST_TYPE.INFO, 5);
    //   this.closeMenu();
    //   return;
    // }
    const { match, location, currentResource } = this.props;
    let folderData = {};
    let resourceData = {};
    const pathname = location.pathname.split('/')[1];
    if (curriculum.length && (pathname === 'flashcard' || pathname === 'practice')) {
      const folder_id = match.params.chapterId;
      const resource_id = match.params.lessonId;
      if (folder_id) {
        folderData = getObjectByProperty(curriculum, 'id', Number(folder_id));
        if (resource_id) {
          resourceData = getObjectByProperty(folderData.nodes, 'id', Number(resource_id));
        }
      }
    }

    this.props.openActionMenu({
      class_type: type === 'tutoring' ? 'group' : type,
      folder_id: folderData.id || 0, // resourceData.id,
      resource_id: !isEmpty(currentResource) ? resourceData.id || 0 : 0,
      title: folderData.name,
      description: resourceData.name,
      resource_type: 'folder',
    });
    // pathname === 'flashcard' ? 'flashcardImage' : pathname === 'practice' ? 'question' :
    this.closeMenu();
  };

  closeMenu = () => {
    this.setState({ openMenu: false });
    document.body.style.overflow = 'initial';
  };

  render() {
    const { hbwText, createClassOptions, closeActionMenu, history } = this.props;
    const { openMenu, showBtn, showCreateClassSidebar } = this.state;
    return (
      <React.Fragment>
        {showCreateClassSidebar && (
          <Sidebar onClose={() => closeActionMenu()}>
            <CreateClass history={history} options={createClassOptions} onClose={() => closeActionMenu()} />
          </Sidebar>
        )}
        <div className={classNames('quick-action-menu', { show: showBtn })}>
          {openMenu && <div className="quick-action-overlay" onClick={this.closeMenu} />}
          <div className="quick-action-list">
            <Row
              nowrap
              align="center"
              justify="end"
              className={classNames('list-item', { showItem: openMenu })}
              onClick={() => this.selectMenu('competition')}
            >
              <Button rounded type="voilet" size="md">
                {translationText(hbwText, 'button.competition')}
              </Button>
              <div className="list-icon voilet">
                <Icon name="start-competition" />
              </div>
            </Row>
            <Row
              nowrap
              align="center"
              justify="end"
              className={classNames('list-item', openMenu ? 'showItem' : 'hideItem')}
              onClick={() => this.selectMenu('tutoring')}
            >
              <Button rounded type="primary" size="md">
                {translationText(hbwText, 'button.tutoring')}
              </Button>
              <div className="list-icon blue">
                <Icon name="tutoring" />
              </div>
            </Row>
          </div>
          <div
            className={classNames('quick-action-btn', 'animated', showBtn ? 'zoomIn' : 'zoomOut', {
              active: openMenu,
            })}
            onClick={this.toggleMenu}
          >
            <Icon name="plus" rotate={openMenu ? 45 : 0} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  createClassOptions: state.toJS().dashboard.createClassSidebar,
  currentResource: state.toJS().dashboard.currentResource,
  curriculum: state.toJS().elastic.curriculum,
});

const mapDispatchToProps = dispatch => ({
  openActionMenu: data => dispatch({ type: CREATE_CLASS_SIDEBAR.OPEN, payload: data }),
  closeActionMenu: () => dispatch({ type: CREATE_CLASS_SIDEBAR.CLOSE }),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(QuickActionMenu),
);
