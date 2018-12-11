import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import { browserName, browserVersion, osName } from 'react-device-detect';
import Icon from '../Icon';
import { Row, Column, Hr, Button, Card, Checkbox, Avatar, ButtonGroup } from '../Layout';
import { translationType, userType, createClassType, errorType, productType } from '../../types';
import NavigationMenu from '../NavigationMenu';
import { translationText } from '../../helpers';
import { FRIENDS, CREATE_CLASS } from '../../redux/constants';
import { addToast, TOAST_TYPE } from '../Toast';
import { SubjectSemesterSelector } from '../SubjectSemesterSelector';

export class CreateClass extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
    user: userType.isRequired,
    friends: PropTypes.shape({
      offset: PropTypes.number,
      count: PropTypes.number,
      list: PropTypes.arrayOf(userType),
    }).isRequired,
    options: createClassType.isRequired,
    onClose: PropTypes.func.isRequired,
    getFriends: PropTypes.func.isRequired,
    selectedProduct: productType.isRequired,
    curriculum: PropTypes.arrayOf(PropTypes.object).isRequired,
    createClassRequest: PropTypes.func.isRequired,
    createClassResponse: PropTypes.shape().isRequired,
    currentResource: PropTypes.shape().isRequired,
    tutoringError: errorType.isRequired,
  };

  constructor(props) {
    super(props);
    const { folder_id, resource_id, title, description, class_type, resource_type } = props.options;
    const { user, selectedProduct, curriculum } = this.props;
    this.state = {
      selectedChapter: curriculum.length ? curriculum[0] : {},
      selectedFriends: [...props.friends.list.map(o => o.id)],
      isRtl: document.body.dir === 'rtl',
      isCreatingClass: false,
      isLoadingFriends: false,
      showSubjectDropDown: !isEmpty(selectedProduct),
      createClassParams: {
        product_id: selectedProduct.id || 0,
        resource_type: resource_type || 'folder',
        class_type: class_type || 'group',
        user_id: user.id,
        grade: user.grade,
        folder_id: folder_id || (curriculum.length ? curriculum[0].id : ''),
        resource_id,
        title: title || (curriculum.length ? curriculum[0].name : ''),
        description,
        difficulty: 1,
        no_of_question: 5,
        device: `${osName}:${browserName}:${browserVersion}`,
        preferred_teacher_gender: 'none',
        preferred_teacher_id: 0,
      },
      classTypes: [
        {
          name: 'group',
          label: 'classroom.groupTutoring',
          icon: 'group',
        },
        {
          name: 'private',
          label: 'classroom.privateTutoring',
          icon: 'user',
        },
      ],
    };
  }

  componentDidMount() {
    this.props.getFriends(0);
    if (!this.state.showSubjectDropDown) {
      setTimeout(() => {
        this.setState({ showSubjectDropDown: true });
      }, 500);
    }
  }

  componentWillReceiveProps({ createClassResponse, friends, tutoringError, curriculum }) {
    if (!isEmpty(createClassResponse) && createClassResponse !== this.props.createClassResponse) {
      /* eslint-disable react/prop-types */
      this.setState({ isCreatingClass: false });
      this.props.onClose();
      this.props.history.push(`/class/${createClassResponse.tutoring_logger_id}`);
    }
    if (!isEmpty(friends.list) && isEmpty(this.props.friends.list)) {
      this.setState({ selectedFriends: [...friends.list.map(o => o.id)] });
    }
    if (!isEmpty(friends) && friends !== this.props.friends) {
      this.setState({ isLoadingFriends: false });
    }
    if (
      !isEmpty(tutoringError) &&
      tutoringError.createClass &&
      tutoringError.createClass !== this.props.tutoringError.createClass
    ) {
      addToast(tutoringError.createClass, TOAST_TYPE.ERROR);
      this.setState({ isCreatingClass: false });
    }
    if (curriculum.length && curriculum !== this.props.curriculum) {
      this.selectChapter(curriculum[0], 0);
    }
  }

  onCreateClass = () => {
    const { createClassParams, selectedFriends } = this.state;
    const { selectedProduct } = this.props;
    this.setState({ isCreatingClass: true });
    this.props.createClassRequest({
      ...createClassParams,
      product_id: selectedProduct.id,
      user_ids: createClassParams.class_type === 'group' ? selectedFriends : [],
    });
  };

  setLevel = (level) => {
    if (level === this.state.createClassParams.difficulty || this.state.isCreatingClass) return;
    this.setState({
      createClassParams: {
        ...this.state.createClassParams,
        difficulty: level,
      },
    });
  };

  setQuestionCount = (count) => {
    if (count === this.state.createClassParams.no_of_question || this.state.isCreatingClass) return;
    this.setState({
      createClassParams: {
        ...this.state.createClassParams,
        no_of_question: count,
      },
    });
  };

  goBack = () => {
    const { createClassParams, isCreatingClass } = this.state;
    const { curriculum } = this.props;
    if (isCreatingClass) return;
    const index = curriculum.findIndex(o => o.id === createClassParams.folder_id);
    this.setState(
      {
        createClassParams: {
          ...this.state.createClassParams,
          resource_id: 0,
        },
      },
      () => this.scrollCard(index),
    );
  };

  selectLesson = (lesson) => {
    this.setState({
      createClassParams: {
        ...this.state.createClassParams,
        resource_id: lesson.id,
        description: lesson.name,
      },
    });
  };

  selectChapter = (selectedChapter, index) => {
    this.setState(
      {
        selectedChapter,
        createClassParams: {
          ...this.state.createClassParams,
          folder_id: selectedChapter.id,
          title: selectedChapter.name,
        },
      },
      () => {
        this.scrollCard(index);
      },
    );
  };

  selectType = (item) => {
    if (this.state.isCreatingClass) return;
    this.setState({
      createClassParams: {
        ...this.state.createClassParams,
        class_type: item.name,
      },
    });
  };

  scrollCard = (index) => {
    if (!document.getElementById('xxx12')) return;
    if (this.state.isRtl) {
      const itemWidth = (index + 2) * 160;
      document.getElementById('xxx12').scrollLeft = document.getElementById('xxx12').scrollWidth - itemWidth;
    } else {
      const itemWidth = index < 2 ? 0 : (index - 1) * 160;
      document.getElementById('xxx12').scrollLeft = itemWidth;
    }
  };

  handleChange = (e) => {
    const { name, checked } = e.target;
    if (this.state.isCreatingClass) return;
    if (name === 'select-all') {
      if (checked) {
        this.setState({ selectedFriends: [...this.props.friends.list.map(o => o.id)] });
      } else {
        this.setState({ selectedFriends: [] });
      }
      return;
    }
    if (checked) {
      this.setState({ selectedFriends: [...this.state.selectedFriends, Number(name)] });
    } else {
      this.setState({ selectedFriends: this.state.selectedFriends.filter(o => o !== Number(name)) });
    }
  };

  loadMoreFriends = () => {
    this.props.getFriends(this.props.friends.offset);
    this.setState({ isLoadingFriends: true });
  };

  render() {
    const { onClose, hbwText, friends, curriculum, selectedProduct } = this.props;
    const {
      selectedChapter,
      classTypes,
      selectedFriends,
      isRtl,
      isCreatingClass,
      isLoadingFriends,
      showSubjectDropDown,
    } = this.state;
    const {
      resource_id,
      resource_type,
      class_type,
      title,
      description,
      no_of_question,
      difficulty,
    } = this.state.createClassParams;

    return (
      <React.Fragment>
        <Row nowrap align="center" className="create-class-header">
          <div className={classNames('squircle-42', { competition: class_type === 'competition' })}>
            <Icon name={class_type === 'competition' ? 'start-competition' : 'tutoring'} height="24px" />
          </div>
          <Column flex="1">
            <div className="title">
              {translationText(
                hbwText,
                class_type === 'competition' ? 'heading.createCompetitionTitle' : 'heading.createTutoringTitle',
              )}
            </div>
            <div className="subtitle">
              {translationText(
                hbwText,
                class_type === 'competition' ? 'heading.createCompetitionSubTitle' : 'heading.createTutoringSubTitle',
              )}
            </div>
          </Column>
          <Icon name="plus" rotate="45" height="20px" onClick={onClose} />
        </Row>

        {!resource_id && (
          <Row className="create-class__subject-selection">
            {showSubjectDropDown && <SubjectSemesterSelector forceOpen />}
          </Row>
        )}

        {!isEmpty(selectedProduct) && !resource_id && (
          <Column nowrap flex="auto" className="create-class-body">
            <Row nowrap align="center" className="chapter-card-container" id="xxx12">
              {!!curriculum.length &&
                curriculum.map((chapter, i) => (
                  <Column
                    nowrap
                    justify="end"
                    key={chapter.id}
                    style={{
                      backgroundColor: selectedProduct.color_start,
                      backgroundImage:
                        chapter.image_thumbnail_uri || selectedProduct.background_image_uri
                          ? `url(${chapter.image_thumbnail_uri || selectedProduct.background_image_uri})`
                          : `linear-gradient(to top, ${selectedProduct.color_start}, ${selectedProduct.color_end})`,
                    }}
                    className={classNames('chapter-card-item', { active: selectedChapter.id === chapter.id })}
                    onClick={() => this.selectChapter(chapter, i)}
                  >
                    <small>{chapter.name.split(':')[0]}</small>
                    <span>{chapter.name.split(':').length > 1 && chapter.name.split(':')[1]}</span>
                  </Column>
                ))}
              <div style={{ height: '120px', minWidth: '10px' }} />
            </Row>
            <div className="lesson-card-container">
              {!isEmpty(selectedChapter) &&
                selectedChapter.nodes.map((lesson, i) => (
                  <React.Fragment key={lesson.id}>
                    <Row
                      align="center"
                      nowrap
                      className={classNames('lesson-card-item', 'animated', isRtl ? 'slideInRight' : 'slideInLeft')}
                      style={{ animationDelay: `${i * 0.05}s` }}
                      onClick={() => this.selectLesson(lesson)}
                    >
                      <p className="flex-1">
                        {`${selectedChapter.order}-${lesson.order}`} {lesson.name}
                      </p>
                      <Icon name="arrow-down" rotate={isRtl ? 90 : -90} className="mlr-05" height="16px" />
                    </Row>
                    <Hr />
                  </React.Fragment>
                ))}
            </div>
          </Column>
        )}

        {!isEmpty(selectedProduct) && !!resource_id && (
          <Column nowrap align="center" flex="auto" className="create-class-body">
            {class_type !== 'competition' && (
              <Card height="60px" width="28rem" className="depth-1 mt-2">
                <NavigationMenu
                  seperator
                  items={classTypes}
                  hbwText={hbwText}
                  activeTab={classTypes.findIndex(o => o.name === class_type)}
                  onSelect={this.selectType}
                />
              </Card>
            )}

            {resource_type === 'folder' && (
              <React.Fragment>
                <span className="subtitle text-color-light text-small mt-2">{title}</span>
                <span className="text-color-dark mb-2">{description}</span>
                <Column
                  justify="end"
                  className="chapter-card-item active"
                  style={{
                    backgroundColor: selectedProduct.color_start,
                    backgroundImage:
                      selectedChapter.image_thumbnail_uri || selectedProduct.background_image_uri
                        ? `url(${selectedChapter.image_thumbnail_uri || selectedProduct.background_image_uri})`
                        : `linear-gradient(to top, ${selectedProduct.color_start}, ${selectedProduct.color_end})`,
                  }}
                >
                  <small>{selectedChapter.name.split(':')[0]}</small>
                  <span>{selectedChapter.name.split(':').length > 1 && selectedChapter.name.split(':')[1]}</span>
                </Column>
              </React.Fragment>
            )}

            {/* {resource_type === 'flashcardImage' && (
              <React.Fragment>
                <span className="subtitle text-color-light text-small mt-2">{title}</span>
                <span className="text-color-dark mb-2">{description}</span>
                <Column
                  justify="end"
                  className="flashcard-item"
                  style={{ backgroundImage: `url(${currentResource.image_thumbnail_uri})` }}
                />
              </React.Fragment>
            )}

            {resource_type === 'question' && (
              <React.Fragment>
                <span className="subtitle text-color-light text-small mt-2">{title}</span>
                <span className="text-color-dark">{description}</span>
                <h5 className="question-item" dangerouslySetInnerHTML={{ __html: currentResource.question }} />
              </React.Fragment>
            )} */}

            {class_type === 'competition' && (
              <React.Fragment>
                <p className="mt-3">{translationText(hbwText, 'request.noOfQuestions')}</p>
                <ButtonGroup className="mt-1">
                  <Button
                    size="lg"
                    type={no_of_question === 5 ? 'primary' : 'default'}
                    onClick={() => this.setQuestionCount(5)}
                  >
                    5 {translationText(hbwText, 'question.question')}
                  </Button>
                  <Button
                    size="lg"
                    type={no_of_question === 10 ? 'primary' : 'default'}
                    onClick={() => this.setQuestionCount(10)}
                  >
                    10 {translationText(hbwText, 'question.question')}
                  </Button>
                  <Button
                    size="lg"
                    type={no_of_question === 15 ? 'primary' : 'default'}
                    onClick={() => this.setQuestionCount(15)}
                  >
                    15 {translationText(hbwText, 'question.question')}
                  </Button>
                </ButtonGroup>

                <p className="mt-3">{translationText(hbwText, 'request.level')}</p>
                <ButtonGroup className={classNames('mt-1', friends.count ? 'mb-3' : 'mb-10')} >
                  <Button size="lg" type={difficulty === 1 ? 'primary' : 'default'} onClick={() => this.setLevel(1)}>
                    {translationText(hbwText, 'difficulty.easy')}
                  </Button>
                  <Button size="lg" type={difficulty === 2 ? 'primary' : 'default'} onClick={() => this.setLevel(2)}>
                    {translationText(hbwText, 'difficulty.average')}
                  </Button>
                  <Button size="lg" type={difficulty === 3 ? 'primary' : 'default'} onClick={() => this.setLevel(3)}>
                    {translationText(hbwText, 'difficulty.hard')}
                  </Button>
                </ButtonGroup>
              </React.Fragment>
            )}

            {['group', 'competition'].includes(class_type) && !!friends.count && (
              <div className="friend-invite-container">
                <p className="text-center subtitle mb-1">{translationText(hbwText, 'label.inviteYourFriend')}</p>
                <Row align="center" justify="start">
                  <Checkbox
                    label={translationText(hbwText, 'label.all')}
                    name="select-all"
                    id="select-all"
                    checked={selectedFriends.length && friends.list.length === selectedFriends.length}
                    onChange={this.handleChange}
                  />
                </Row>
                <Column className="mt-2">
                  {friends.list
                    .filter(o => o.name !== null)
                    .map((friend, index) => (
                      <React.Fragment key={friend.id}>
                        <Row nowrap className="friend-list-item">
                          <Checkbox
                            id={`select-friend-${friend.id}`}
                            name={friend.id}
                            type="checkbox"
                            checked={selectedFriends.includes(friend.id)}
                            onChange={this.handleChange}
                          />
                          <Avatar url={friend.profile_pic} className="mlr-1" />
                          <div className="player-info">
                            <div className="player-title">{friend.name}</div>
                            {!isEmpty(friend.school) && <div className="player-subtitle">{friend.school.name}</div>}
                          </div>
                        </Row>
                        {friends.list.filter(o => o.name !== null).length !== index + 1 && <Hr />}
                      </React.Fragment>
                    ))}
                  {!!friends.list.length && friends.count > friends.list.length && (
                    <Button
                      fab
                      outlined
                      icon={isLoadingFriends ? '' : 'arrow-down'}
                      style={{ margin: '10px auto' }}
                      loading={isLoadingFriends}
                      onClick={this.loadMoreFriends}
                    />
                  )}
                </Column>
              </div>
            )}
            <div className="create-class-btn">
              <Button type="green" size="large" onClick={this.onCreateClass} loading={isCreatingClass}>
                {translationText(hbwText, 'button.confirm')}
              </Button>
              {resource_type === 'folder' && (
                <Button size="large" onClick={this.goBack}>
                  {translationText(hbwText, 'navigate.back')}
                </Button>
              )}
            </div>
          </Column>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  user: state.toJS().user.loggedUser,
  friends: state.toJS().user.friends,
  createClassResponse: state.toJS().tutoring.createClass,
  currentResource: state.toJS().dashboard.currentResource,
  selectedProduct: state.toJS().dashboard.selectedProduct,
  curriculum: state.toJS().elastic.curriculum,
  tutoringError: state.toJS().tutoring.error,
});

const mapDispatchToProps = dispatch => ({
  getFriends: offset => dispatch({ type: FRIENDS.REQUEST, payload: offset }),
  createClassRequest: data => dispatch({ type: CREATE_CLASS.REQUEST, payload: data }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateClass);
