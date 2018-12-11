import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import Products from '../Products';
import {
  PROFILE,
  SEARCH_REGIONS,
  SEARCH_CITIES,
  SEARCH_SCHOOL,
  UPLOAD_FILE,
  FRIEND_SEARCH_MODAL,
} from '../../redux/constants';
import { addToast, TOAST_TYPE } from '../Toast';
import { translationText, addTranslation } from '../../helpers';
import { translationType, schoolListType, errorType, userType } from '../../types';
import Icon from '../../components/Icon';
import { Row, Button, Input, Column, Avatar, Card, Search } from '../../components/Layout';
import NavigationMenu from '../NavigationMenu';
import { getCountryId } from '../../constants';

export class CompleteProfileForm extends Component {
  static propTypes = {
    hbwText: translationType.isRequired,
    user: userType.isRequired,
    userError: errorType.isRequired,
    updateUser: PropTypes.func.isRequired,
    searchRegion: PropTypes.func.isRequired,
    searchCity: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    searchSchool: PropTypes.func.isRequired,
    regionsList: PropTypes.arrayOf(PropTypes.object),
    citiesList: PropTypes.arrayOf(PropTypes.object),
    schoolsList: schoolListType.isRequired,
    uploadImageUrls: PropTypes.shape(),
    profile: PropTypes.shape(),
    openFriendSearchModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    regionsList: [],
    citiesList: [],
    uploadImageUrls: {},
    profile: {},
  };

  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      user: {
        id: user.id || 0,
        profile_pic: user.profile_pic || '',
        gender: user.gender || '',
        region: user.region || '',
        region_id: user.region_id || 0,
        city: user.city || '',
        city_id: user.city_id || 0,
        grade: user.grade || 0,
        grade_array: (user.grade) ? user.grade.split('.') : [],
        school_name: !isEmpty(user.school) ? user.school.name : '',
        school_id: user.school_id || 0,
        email: '',
        subject: user.subject || '',
      },
      formErrors: {
        gender: '',
        region: '',
        city: '',
        grade: '',
        school_name: '',
        email: '',
      },
      listViewArray: [],
      genderList: [
        {
          name: 'male',
          label: 'form.male',
          icon: 'male',
        },
        {
          name: 'female',
          label: 'form.female',
          icon: 'female',
        },
      ],
      showModalFor: '',
      showGrades: false,
      currentCountry: getCountryId(),
      isSearching: false,
      page: 1,
      limit: 20,
      isUploading: false,
    };
  }

  componentDidMount() {
    const { schoolsList, regionsList, citiesList } = this.props;
    if (!isEmpty(regionsList)) {
      this.setList(regionsList, 'region');
    } else if (!isEmpty(citiesList)) {
      this.setList(citiesList, 'city');
    } else if (!isEmpty(schoolsList)) {
      this.setList(schoolsList, 'school_name');
    } else {
      this.searchByString('school_name', 1);
    }
    addTranslation('notify.profileUpdated');
  }

  componentWillReceiveProps({ userError, user, schoolsList, regionsList, citiesList, uploadImageUrls, fileError, hbwText, product }) {
    if (!isEmpty(user) && user !== this.props.user && user.grade && user.school_id && !user.get_email && this.props.history.location.pathname !== '/profile') {
      this.props.history.push('/home');
      localStorage.newUser = true;
      this.props.openFriendSearchModal();
    }
    if (!isEmpty(user) && user !== this.props.user && user.grade && user.school_id && this.props.history.location.pathname === '/profile') {
      addToast(translationText(hbwText, 'notify.profileUpdated'), TOAST_TYPE.SUCCESS);
      this.props.history.push('/home');
    }
    if (!this.state.user.id) {
      // populate data once
      this.setState({
        user: {
          id: user.id,
          email: user.get_email ? '' : user.email,
          profile_pic: user.profile_pic,
          update_email: user.get_email,
          gender: user.gender,
          region: user.region,
          region_id: user.region_id,
          city: user.city,
          city_id: user.city_id,
          grade: user.grade,
          subject: user.subject,
          grade_array: (user.grade) ? user.grade.split('.') : [],
          school_name: !isEmpty(user.school) ? user.school.name : '',
          school_id: user.school_id,
        },
      });
    }
    if (!isEmpty(userError) && userError.profile !== this.props.userError.profile) {
      console.log(userError.profile);
    }
    if (!isEmpty(regionsList) && regionsList !== this.props.regionsList) {
      this.setState({
        listViewArray: regionsList,
        isLoadMore: regionsList.length === (this.state.limit * this.state.page),
      });
    }
    if (!isEmpty(citiesList) && citiesList !== this.props.citiesList) {
      this.setState({
        listViewArray: citiesList,
        isLoadMore: citiesList.length === (this.state.limit * this.state.page),
      });
    }
    if (!isEmpty(schoolsList) && schoolsList !== this.props.schoolsList) {
      this.setState({
        listViewArray: schoolsList,
        isLoadMore: schoolsList.length === (this.state.limit * this.state.page),
      });
    }
    if (!isEmpty(schoolsList) && schoolsList !== this.props.schoolsList) {
      this.setState({
        listViewArray: schoolsList,
        isLoadMore: schoolsList.length === (this.state.limit * this.state.page),
      });
    }
    if (isEmpty(regionsList) || isEmpty(citiesList) || isEmpty(schoolsList)) {
      this.setState({ isLoadMore: false });
    }
    if (
      regionsList !== this.props.regionsList ||
      citiesList !== this.props.citiesList ||
      schoolsList !== this.props.schoolsList
    ) {
      this.setState({ isSearching: false });
    }
    if (!isEmpty(uploadImageUrls)) {
      const updatedUser = this.state.user;
      updatedUser.profile_pic = uploadImageUrls.small_url;
      this.setState({ user: updatedUser, isUploading: false });
    }
    if (!isEmpty(fileError) && fileError.uploadImageUrls !== this.props.fileError.uploadImageUrls) {
      this.setState({ isUploading: false });
      addToast('Network Error', TOAST_TYPE.ERROR);
    }
  }

  onSelectProduct = (product) => {
    const { user } = this.state;
    const updatedUser = user;
    updatedUser.subject = product.slug.split('_')[0];
    this.setState({ user: updatedUser });
  };

  setList(list, type) {
    if (type === 'region' || type === 'city' || type === 'school_name') {
      this.setState({ listViewArray: list });
    }
  }

  fileChangedHandler = (e) => {
    // User cancelled
    const { user } = this.state;
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const fd = new FormData();
    fd.append('destination', 'user_profile_pic');
    fd.append('user_id', user.id);
    const nameSplit = file.name.split('.');
    const ext = nameSplit[nameSplit.length - 1];
    const originalName = nameSplit[0];
    fd.append('file_name', `${originalName}_${user.email}.${ext}`);
    fd.append('fileUpl', file, file.name);
    this.setState({ isUploading: true });
    this.props.uploadImage(fd);
    e.preventDefault();
  };

  handleUserInput = (e) => {
    const { name, value } = e.target;
    if (name === 'region' || name === 'city' || name === 'school_name') {
      this.debouncedSearchByString(name, 1, value);
    } else {
      this.setState(prevState => ({ user: { ...prevState.user, [name]: value } }));
    }
    e.preventDefault();
  };

  debouncedSearchByString = debounce(this.searchByString, 500);

  searchByString(name, page, s) {
    const country_id = this.state.currentCountry;
    const data = { country_id, page, limit: this.state.limit };
    const { user } = this.state;
    if (s && s.length >= 2) {
      data.s = s;
    }
    if (user && user.region_id) {
      data.region_id = user.region_id;
      data.region = user.region;
    }
    if (user && user.city_id) {
      data.city_id = user.city_id;
      data.city = user.city;
    }
    if (page === 1) {
      this.setState({ listViewArray: [], isSearching: true, page });
    } else {
      this.setState({ isSearching: true, page });
    }
    if (name === 'region') {
      this.props.searchRegion(data);
    } else if (name === 'city') {
      this.props.searchCity(data);
    } else if (name === 'school_name') {
      this.props.searchSchool({
        ...data,
        section: user.gender ? (user.gender === 'female' ? 'girls' : 'boys') : '',
        grade: user.grade,
      });
    }
  }

  toggleModal(modalFor) {
    const { showModalFor } = this.state;
    if (showModalFor === modalFor) {
      this.setState({ showModalFor: '' });
    } else {
      this.setState({ showModalFor: modalFor });
      this.searchByString(modalFor, 1);
    }
  }

  selectOption(modalFor, item) {
    const { user } = this.state;
    const updatedUser = user;
    if (modalFor === 'school_name') {
      updatedUser.school_name = item.name;
      updatedUser.school_id = item.id;
    } else if (modalFor === 'region') {
      if (item.id !== user.region_id) {
        updatedUser.city = '';
        updatedUser.city_id = 0;
        updatedUser.school_name = '';
        updatedUser.school_id = 0;
      }
      updatedUser.region = item.name;
      updatedUser.region_id = item.id;
    } else if (modalFor === 'city') {
      if (item.id !== user.city_id) {
        updatedUser.school_name = '';
        updatedUser.school_id = 0;
      }
      updatedUser.city = item.name;
      updatedUser.city_id = item.id;
    }
    this.setState({ user: updatedUser, showModalFor: '' });
    this.setState({ formErrors: { ...this.state.formErrors, school_name: !user.school_name ? 'validation.schoolRequired' : '' } });
  }

  selectGrade(grade) {
    const { user } = this.state;
    const updatedUser = user;
    const gradeIndex = updatedUser.grade_array.indexOf(grade);
    if (gradeIndex === -1) {
      updatedUser.grade_array.push(grade);
    } else {
      updatedUser.grade_array.splice(gradeIndex, 1);
    }
    this.setState(
      { user: updatedUser, showGrades: false, formErrors: { ...this.state.formErrors, grade: '' } });
  }

  selectGender = (gender) => {
    this.setState({
      user: { ...this.state.user, gender: gender.name },
    });
  };

  submitProfile = (ev) => {
    ev.preventDefault();
    const { user } = this.state;
    user.grade = user.grade_array.sort().join('.');
    if (user.school_id && user.grade_array.length && user.subject) {
      this.props.updateUser(user);
    } else {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          school_name: !user.school_name ? 'validation.schoolRequired' : '',
          grade: !user.grade ? 'validation.gradeRequired' : '',
          subject: !user.subject ? 'validation.subjectRequired' : '',
        },
      });
    }
  }

  loadMore = () => {
    this.searchByString(this.state.showModalFor, this.state.page + 1);
  }

  render() {
    const {
      user,
      formErrors,
      showModalFor,
      listViewArray,
      showGrades,
      genderList,
      isSearching,
      isLoadMore,
      isUploading,
    } = this.state;
    const gradesList = [6, 7, 8, 9, 10, 11, 12];
    const { hbwText, history } = this.props;

    console.log(user);
    return (
      <div className="login-form complete-profile-form">
        <form
          noValidate
          onSubmit={this.submitProfile}
        >
          <div className="outer-form-wrapper">
            <Column nowrap align="center" className={classNames('main-form-view', { active: showModalFor === '' })}>
              <div className="upload-image">
                <input id="uploadPic" type="file" onChange={this.fileChangedHandler} />
                <label htmlFor="uploadPic">
                  {user.profile_pic ? (
                    <Avatar url={user.profile_pic} size="80px" />
                  ) : (
                    <div className="upload-icon">
                      <Icon name={isUploading ? 'loader' : 'user-upload'} fill="#696969" height="50px" width="50px" />
                    </div>
                  )}
                </label>
              </div>

              <Card height="60px" width="280px" className="depth-1 mt-2">
                <NavigationMenu
                  seperator
                  items={genderList}
                  hbwText={hbwText}
                  activeTab={genderList.findIndex(o => o.name === user.gender)}
                  onSelect={this.selectGender}
                />
              </Card>

              {this.props.user.get_email && <Input
                name="email"
                defaultValue={user.email}
                type="email"
                autoComplete="off"
                label={translationText(hbwText, 'form.email')}
                placeholder={translationText(hbwText, 'placeholder.email')}
                error={formErrors.email}
                onChange={this.handleUserInput}
              />}

              <Input
                name="region"
                defaultValue={user.region}
                type="text"
                autoComplete="off"
                readOnly
                label={translationText(hbwText, 'form.regionName')}
                placeholder={translationText(hbwText, 'placeholder.region')}
                onClick={() => this.toggleModal('region')}
                error={formErrors.region}
              />
              {!!formErrors.region && <p className="form-error">{translationText(hbwText, formErrors.region)}</p>}

              <Input
                name="city"
                defaultValue={user.city}
                type="text"
                autoComplete="off"
                readOnly
                label={translationText(hbwText, 'form.cityName')}
                placeholder={translationText(hbwText, 'placeholder.city')}
                onClick={() => this.toggleModal('city')}
                error={formErrors.city}
              />
              {!!formErrors.city && <p className="form-error">{translationText(hbwText, formErrors.city)}</p>}

              <div className="hbw-form-input form-control grade-controls">
                <label className="label">{translationText(hbwText, 'form.grade')}</label>
                <div
                  className={classNames('grade', { active: user.grade, focus: showGrades, error: !!formErrors.grade })}
                  name="gradeName"
                  onClick={() => this.setState(prevState => ({ showGrades: !prevState.showGrades }))}
                >

                  {user.grade_array.map((item, index) => (
                    <span key={index}> {translationText(hbwText, `form.grade${item}`)}, </span>
                  ))}

                  {user.grade_array.length === 0 && translationText(hbwText, 'placeholder.grade')}
                </div>
                <span className="hr" />
                <div className="flex-column align-center flex-nowrap extra-info" />
                {showGrades && (
                  <ul className="grades-list">
                    {gradesList.map((grade, index) => (
                      <li key={index} onClick={() => this.selectGrade(grade)}>
                        {translationText(hbwText, `form.grade${grade}`)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {!!formErrors.grade && <p className="form-error">{translationText(hbwText, formErrors.grade)}</p>}

              <Input
                name="school_name"
                defaultValue={user.school_name}
                type="text"
                autoComplete="off"
                readOnly
                label={translationText(hbwText, 'form.schoolName')}
                placeholder={translationText(hbwText, 'placeholder.school')}
                onClick={() => this.toggleModal('school_name')}
              />
              {!!formErrors.school_name && (
                <p className="form-error">{translationText(hbwText, formErrors.school_name)}</p>
              )}

              <p>إختر المادة التي تود تدريسها!</p>

              <Products onSelect={this.onSelectProduct} selectedSlug={`${user.subject}_sa`} />

              <Row align="center" className="submit-button-block mt-4">
                <Button
                  htmlType="submit"
                  type="primary"
                  size="xl"
                  value={translationText(hbwText, history.location.pathname === '/profile' ? 'button.updateProfile' : 'button.signup')}
                />
              </Row>
            </Column>

            {/* Detailed list view */}
            <div className={classNames('list-view', { active: showModalFor !== '' })}>
              <React.Fragment>
                <Button
                  htmlType="button"
                  size="small"
                  icon="arrow-down"
                  className="back-to-form"
                  onClick={() => this.setState({ showModalFor: '' })}
                >
                  {translationText(hbwText, 'navigation.back')}
                </Button>
                <p>{translationText(hbwText, `form.${showModalFor}`)}</p>
                <Search
                  name={showModalFor}
                  autoComplete="off"
                  loading={isSearching}
                  placeholder={translationText(hbwText, 'label.searchHere')}
                  onChange={this.handleUserInput} />
                <div className="list-area mt-1">
                  {!isEmpty(listViewArray) && (
                    <ul className="items-list">
                      {listViewArray.map((item, index) => (
                        <li
                          key={index}
                          className="items-list__item items-list__item--school"
                          onClick={() => {
                            this.selectOption(showModalFor, item);
                          }}
                        >
                          <span className="name">{item.name}</span>
                        </li>
                      ))}
                      {isLoadMore && <Button
                        fab
                        outlined
                        icon={isSearching ? '' : 'arrow-down'}
                        style={{ margin: '10px auto' }}
                        loading={isSearching}
                        onClick={this.loadMore}
                      />}
                    </ul>
                  )}
                  {isEmpty(listViewArray) &&
                    !isSearching && <p className="subtitle">{translationText(hbwText, 'school.notFound')}</p>}
                </div>
              </React.Fragment>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hbwText: state.toJS().translation.hbwText,
  user: state.toJS().user.loggedUser,
  userError: state.toJS().user.error,
  regionsList: state.toJS().folder.regionsList,
  citiesList: state.toJS().folder.citiesList,
  schoolsList: state.toJS().school.schoolsList,
  uploadImageUrls: state.toJS().file.uploadImageUrls,
  profile: state.toJS().user.profile,
  fileError: state.toJS().file.error,
});

const mapDispatchToProps = dispatch => ({
  updateUser: data => dispatch({ type: PROFILE.REQUEST, payload: data }),
  searchRegion: data => dispatch({ type: SEARCH_REGIONS.REQUEST, payload: data }),
  searchCity: data => dispatch({ type: SEARCH_CITIES.REQUEST, payload: data }),
  searchSchool: data => dispatch({ type: SEARCH_SCHOOL.REQUEST, payload: data }),
  uploadImage: data => dispatch({ type: UPLOAD_FILE.REQUEST, payload: data }),
  openFriendSearchModal: () => dispatch({ type: FRIEND_SEARCH_MODAL, payload: true }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompleteProfileForm);
