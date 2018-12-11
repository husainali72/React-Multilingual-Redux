import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import Testimonials from '../Testimonials';
import { DropDownMenu } from '../DropDownMenu';
import { LIST_STUDENTS, LIST_COUNTRY } from '../../redux/constants';

export class GlobalLanding extends Component {
  static propTypes = {
    countries: PropTypes.shape({
      countryList: PropTypes.array,
      selectedCountry: PropTypes.object,
    }).isRequired,
    totalStudents: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    listStudents: PropTypes.func.isRequired,
    updateCountries: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedOption: { id: 0, full_name: '' }, // default selected value
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { listStudents, totalStudents } = this.props;
    if (!totalStudents) {
      listStudents();
    }
  }

  onChange(option) {
    this.setState({ selectedOption: option });
    const countries = JSON.parse(localStorage.getItem('country'));
    countries.selectedCountry = option;
    localStorage.language = option.locale;
    this.props.updateCountries(countries);
    /* eslint-disable react/prop-types */
    if (option.id === 1) {
      this.props.history.replace('/');
    } else if (option.id === 2) {
      this.props.history.replace('/egypt');
    }
  }

  render() {
    const { totalStudents, countries } = this.props;
    const style = [
      {
        fontColor: {
          color: 'black',
        },
        imageWrapper: {
          padding: '4px',
          borderRadius: '2px',
          border: '1px dashed #fff',
          height: '24px',
          display: 'inline-block',
          verticalAlign: 'top',
          cursor: 'pointer',
        },
        title: {
          display: 'inline-block',
          color: '#ffffff',
          fontSize: '14px',
          margin: '0px 0px 0 5px',
          textShadow: '1px 2px 4px #333',
          verticalAlign: 'top',
          cursor: 'pointer',
        },
        imgWidth: {
          width: '25px',
          verticalAlign: 'top',
        },
        position: {
          position: 'relative',
        },
        dropDownList: {
          right: '0px',
          left: 'auto',
          color: '#626262',
          height: 'auto',
          width: 'auto',
          minWidth: '100px',
          position: 'absolute',
          top: '100%',
          zIndex: '1000',
          float: 'left',
          padding: '5px 0',
          margin: '2px 0 0',
          fontSize: '14px',
          textAlign: 'left',
          listStyle: 'none',
          backgroundColor: '#fff',
          border: '1px solid rgba(0,0,0,.15)',
          borderRadius: '4px',
          WebkitBoxShadow: '0 6px 12px rgba(0,0,0,.175)',
          boxShadow: '0 6px 12px rgba(0,0,0,.175)',
        },
        imgLi: {
          width: '25px',
          margin: '0 auto',
        },
        dropDownLi: {
          textAlign: 'center',
          fontSize: '13px',
          padding: '5px 5px',
          cursor: 'pointer',
        },
        textAlignHover: {
          backgroundColor: '#fafafa',
        },
        arrow: {
          width: '18px',
        },
        titleLi: {},
        caret: {
          position: 'absolute',
          top: '-13px',
          color: '#ffffff',
          fontSize: '20px',
          left: '10%',
        },
        titleHead: {
          padding: '5px',
        },
      },
    ];

    return (
      <div className="global-landing">
        <section className="global-hero-section">
          <div className="global-landing-heading">
            <div className="heading-logo">
              <img src="/assets/images/eng-logo-white.svg" alt="" style={{ maxHeight: '60px' }} />
            </div>
            <div className="heading-country">
              {!isEmpty(countries) &&
                countries.countryList.length > 0 && (
                  <DropDownMenu
                    list={countries.countryList}
                    value1="full_name"
                    value2="flag"
                    selected={this.state.selectedOption}
                    onChange={this.onChange}
                    styles={style}
                  />
                )}
            </div>
          </div>
          <div className="header-content">
            <div className="header-content1">
              <h4 className="heading">Study from the comfort of your home</h4>
              <p className="subheading">
                Very few teams today have a great sense for education sector as well as how technology can be used for
                effective scaling HBW is one such team
              </p>
            </div>
          </div>

          <div className="side-icons">
            <span>Follow Us</span>
            <div className="vertical-line" />
            <div className="social-icons">
              <a href="#" target="_blank">
                <img src="/assets/images/fb-shadowed.png" className="fb-icon" alt="" />
              </a>
              <a href="#" target="_blank">
                <img src="/assets/images/insta-shadowed.png" className="insta-icon" alt="" />
              </a>
            </div>
          </div>
        </section>
        <div className="in-news hidden-xs">
          <div className="inner-container">
            <img src="/assets/images/in-news.png" alt="" />
          </div>
        </div>
        <section className="on-demand-experience clearfix">
          <div className="mobile-img">
            <img src="/assets/images/iphonex-india-1.png" alt="" />
          </div>
          <div className="section-text">
            <div className="head-fade-line">
              <span className="fading-line" />
            </div>
            <h5 className="heading">
              An On Demand
              <br /> Experience!
            </h5>
            <p className="subheading">
              We believe, learning should not be time bound. Nor should teaching be. HBW breaks the shackles of time
              and place, liberating learning and teaching from the limits of time and location. Now even late at night,
              or early in the morning, a student has the liberty to reach out for guidance and help
            </p>
          </div>
        </section>

        <section className="egypt-tutors-banner">
          <div className="content">
            <div className="head-fade-line">
              <span className="fading-line" />
            </div>
            <h5 className="heading">
              Learn from your Country’s
              <br /> most renowned tutors
            </h5>
            <p className="subheading">no hassle, no distractions, no traffic, no cost</p>
            <div className="link-wrapper">
              <a href="#" target="_blank">
                <img src="/assets/images/app-store-ar.png" alt="app store" />
              </a>
              <a href="#" target="_blank">
                <img src="/assets/images/play-store-ar.png" alt="play store" />
              </a>
            </div>
          </div>
          <img className="clip-top" src="/assets/images/clip-down.png" alt="" />

          <div className="statistics">
            <div className="data data1">
              <img src="/assets/images/feature7.png" alt="" />
              <h5>{totalStudents}</h5>
              <span>Registered users</span>
            </div>
            <div className="vertical-line" />
            <div className="data data2">
              <img src="/assets/images/feature5.png" alt="" />
              <h5>9,094,976</h5>
              <span>Minutes spent</span>
            </div>
            <div className="vertical-line" />
            <div className="data data3">
              <img src="/assets/images/feature8.png" alt="" />
              <h5>2</h5>
              <span>Countries</span>
            </div>
          </div>
        </section>

        <section className="virtual-classroom-section">
          <div className="margin-applying clearfix">
            <div className="bg-img-section">
              <img src="/assets/images/iphonex-india-2.png" alt="" />
            </div>
            <div className="text">
              <div className="head-fade-line">
                <span className="fading-line" />
              </div>
              <h5 className="heading">Redefining the Virtual Classrooom!</h5>
              <span className="subheading">
                Our app is designed to enhance the virtual classroom experience for students & tutors. Now, you can join
                & organise sessions with a group of your friends. We made connecting with the best online tutors that
                much easier for students and tutors alike.
              </span>
            </div>
          </div>
          <div className="class-experience">
            <div className="main-image-wrapper">
              <img className="main-image" src="/assets/images/class-example.png" alt="" />
              <div className="subject1">
                <img src="/assets/images/subject-icons.png" alt="" />
              </div>
              <div className="subject2">
                <img src="/assets/images/apple-book.png" alt="" />
              </div>
            </div>
          </div>
          <div className="before-features">
            <div className="content">
              <div className="head-fade-line">
                <span className="fading-line" />
              </div>
              <h5 className="heading">
                A convenient &<br /> engaging experience!
              </h5>
              <p className="subheading">
                Our strength is the core focus on personalized LIVE online teaching. This ensures students get the
                entire attention of a dedicated teacher and learns at his/her pace. Enhanced engagement between student
                and teacher on HBW guarantees better understanding and recall for the student. And of course, the
                student is learning from the comfort of his/her own home – Learning happens best when the student’s mind
                is relaxed!
              </p>
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="heading-text">
            <div className="head-fade-line">
              <span className="fading-line" />
            </div>
            <h5 className="heading">Our Features</h5>
            <span className="subheading">
              modern design, state of the art technogly, extradoridnary vision & passion
            </span>
          </div>
          <div className="mobile-image">
            <img src="/assets/images/feature-mobile.jpg" alt="" />
          </div>
          <div className="lines" />
        </section>

        <section className="testimonial-section">
          <header className="testimonials-header">
            <div className="head-fade-line">
              <span className="fading-line" />
            </div>
            <div className="section-title">
              <h5 className="heading">Testimonials</h5>
            </div>
            <div className="section-subtitle">
              <span className="subheading">
                We’ve got over {totalStudents} registered users, let’s see what they have to say!
              </span>
            </div>
          </header>
          <div className="testimonials-body">
            <Testimonials />
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  totalStudents: state.toJS().user.totalStudents,
  countries: state.toJS().folder.countries,
});

const mapDispatchToProps = dispatch => ({
  listStudents: () => dispatch({ type: LIST_STUDENTS.REQUEST }),
  updateCountries: countries => dispatch({ type: LIST_COUNTRY.SUCCESS, payload: countries }),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GlobalLanding),
);
