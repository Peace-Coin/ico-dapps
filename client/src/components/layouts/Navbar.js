import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileAction';
import PropTypes from 'prop-types';

class Navbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      langStatus1: 'selector__item selector__item--now selector__item--now-lang',
      langStatus2: 'selector__item selector__item-list selector__item-list-lang theme-list-selector is-hidden',
      menuStatus1: 'selector__item selector__item--now selector__item--now-user',
      menuStatus2: 'selector__item selector__item-list selector__item-list-user theme-list-selector is-hidden',
      langStatusOpenFlg: false,
      menuStatusOpenFlg: false,
      userName: 'guest'
    }

    this.toggleLang = this.toggleLang.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

  }

  // shouldComponentUpdate(nextProps, nextState) {
  //
  //   if(this.props.profile.Profile.firstName === nextProps.profile.Profile.firstName){
  //
  //     return false;
  //
  //   }else{
  //
  //     return true;
  //   }
  // }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  toggleLang() {

    if(this.state.langStatusOpenFlg){

      this.setState({langStatus2: 'selector__item selector__item-list selector__item-list-lang theme-list-selector is-hidden'});
      this.setState({langStatusOpenFlg: false});

    }else{

      this.setState({langStatus2: 'selector__item selector__item-list selector__item-list-lang theme-list-selector'});
      this.setState({langStatusOpenFlg: true});
    }
  }

  toggleMenu() {

    if(this.state.menuStatusOpenFlg){

      this.setState({menuStatus2: 'selector__item selector__item-list selector__item-list-lang theme-list-selector is-hidden'});
      this.setState({menuStatusOpenFlg: false});

    }else{

      this.setState({menuStatus2: 'selector__item selector__item-list selector__item-list-lang theme-list-selector'});
      this.setState({menuStatusOpenFlg: true});
    }
  }

  renderLinks() {
    if (this.props.authenticated) {
      // show a link to sign out
      return (
        <li className="nav-item">
          <NavLink to="/dashboard/profile">Profile</NavLink>
          <NavLink to="/signout">Sign Out</NavLink>
        </li>
      );
    } else {
      // show a link to sign in or sign up
      return [
        <li key={1}>
          <NavLink to="/signin">Login</NavLink>
        </li>,
        <li key={2}>
          <NavLink to="/signup">Sign up</NavLink>
        </li>
      ];
    }
  }

  render() {

    const { profile, loading } = this.props.profile;

    let userName = (
      <span class="text">guest</span>
    );

    if (profile != null){

      //when status is not approve
      if(Object.keys(profile).length > 0){

        userName = (
          <span class="text">{profile.Profile.firstName} {profile.Profile.lastName}</span>
        );
      }
    }

    return (
      <nav>
        <link href="https://fonts.googleapis.com/css?family=Quicksand:400,500,700" rel="stylesheet" />
          <div id="header" role="banner">
            <h1 class="logo">
              <a href="#">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 893 435" style={{enableBackground : 'new 0 0 893 435',}} xmlSspace="preserve">
                  <g id="coin">
                    <path class="st0" d="M153.1,427.3c-84.2,0-152.7-68.5-152.7-152.7S68.9,122,153.1,122c38.1,0,74.6,14.1,102.7,39.7c3.4,3.1,3.6,8.3,0.5,11.6c-3.1,3.4-8.3,3.6-11.6,0.5c-25.1-22.9-57.7-35.4-91.6-35.4c-75.1,0-136.2,61.1-136.2,136.2S78,410.8,153.1,410.8c34,0,66.5-12.6,91.6-35.4c3.4-3.1,8.6-2.8,11.6,0.5c3.1,3.4,2.8,8.6-0.5,11.6C227.6,413.2,191.2,427.3,153.1,427.3z"></path>
                    <path class="st0" d="M883.4,418.2c-2.5,0-4.9-1.1-6.5-3.2L741.8,231.7c-2.8-3.6-2.1-8.8,1.5-11.6c3.6-2.8,8.8-2.1,11.6,1.5l135.1,183.2c2.8,3.6,2.1,8.8-1.5,11.6C886.9,417.6,885.1,418.2,883.4,418.2z"></path>
                    <path class="st0" d="M671.9,418.2c-4.9,0-8.9-4-8.9-8.9V139.9c0-4.9,4-8.9,8.9-8.9s8.9,4,8.9,8.9v269.4C680.8,414.2,676.8,418.2,671.9,418.2z"></path>
                    <path class="st0" d="M883.7,418.2c-4.9,0-8.9-4-8.9-8.9V139.9c0-4.9,4-8.9,8.9-8.9c4.9,0,8.9,4,8.9,8.9v269.4C892.6,414.2,888.6,418.2,883.7,418.2z"></path>
                    <g id="face">
                      <path class="st0" d="M453,114.5c-88.5,0-160.2,71.7-160.2,160.2c0,88.5,71.7,160.2,160.2,160.2s160.2-71.7,160.2-160.2C613.2,186.2,541.5,114.5,453,114.5z M453,130.9c79.2,0,143.7,64.5,143.7,143.7c0,12-1.5,23.6-4.3,34.7c-11.1,16.5-41,36.2-53.2,42.8c-9.5,5.1-22.1,4.2-32.9-2.6c-8.8-5.5-19.1-8.3-30.7-8.4c-0.1,0-0.1,0-0.2,0c-7.6,0-15.5,2.8-22.4,7.1c-7.5-4.6-15.3-7.1-22.4-7.1c-0.1,0-0.1,0-0.2,0c-11.6,0.1-21.9,2.9-30.7,8.4c-10.8,6.7-23.4,7.7-32.9,2.6c-12.5-6.7-42.8-26.8-53.5-43.2c-2.7-11-4.2-22.5-4.2-34.4C309.3,195.4,373.8,130.9,453,130.9zM321,331.5c14.1,12.6,31.9,24,41.3,29.1c5.5,3,11.6,4.4,18,4.4c8.2,0,16.8-2.5,24.5-7.3c7.2-4.5,15.9-6.8,25.6-6.9c4.3,0,9.2,1.3,14.1,3.8c-4.9,4.4-8.8,9.4-10.6,14.1c-2.5,6.3-1.5,12.1,2.6,16c4.2,3.9,11.9,7.1,24.7,0c3.6-2,6.8-4.4,9-6.2c7.5,5.5,26.8,19.9,37.6,29c-5,2.1-10.2,3.9-15.5,5.4L469.6,395c-1.5-1.2-3.6-0.9-4.8,0.6s-0.9,3.6,0.6,4.8L484,415c-5.3,1.2-10.7,2.1-16.2,2.6l-14-10.6c-1.5-1.1-3.7-0.8-4.8,0.7c-1.1,1.5-0.8,3.7,0.7,4.8l7.7,5.8c-1.4,0-2.8,0.1-4.2,0.1C394,418.3,343.1,382.5,321,331.5z M517.4,403c-12.4-11-43.2-33.6-44.6-34.6c-1.9-1.4-4.5-1.2-6.2,0.4c-3.4,3.3-17.5,14.5-23.6,8.9c-0.4-0.4-1.7-1.6-0.2-5.4c3.8-9.5,19.9-21.5,32.6-21.5c0,0,0.1,0,0.1,0c9.8,0.1,18.4,2.4,25.6,6.9c13.7,8.6,30,9.7,42.5,2.9c9.3-5,27-16.4,41.1-29C571.5,362.6,547.5,387.9,517.4,403z"></path>
                      <path class="st0" d="M453.5,300.8c76.8,0,98.4-44.3,99.3-46.2c1.1-2.4,0.1-5.3-2.3-6.4c-2.4-1.1-5.3-0.1-6.4,2.3c-0.2,0.4-19.9,40.6-90.6,40.6c-70.3,0-89.8-39-90.6-40.7c-1.1-2.4-4-3.4-6.4-2.3c-2.4,1.1-3.4,4-2.3,6.4C355,256.5,376.7,300.8,453.5,300.8z"></path>
                      <ellipse transform="matrix(0.9962 -8.690229e-02 8.690229e-02 0.9962 -15.3808 35.9867)" class="st0" cx="405.6" cy="194.6" rx="15.8" ry="14.4"></ellipse>
                      <ellipse transform="matrix(8.690229e-02 -0.9962 0.9962 8.690229e-02 262.9736 676.2089)" class="st0" cx="500.4" cy="194.6" rx="14.4" ry="15.8"></ellipse>
                    </g>
                  </g>
                  <g id="peace">
                    <path class="st1" d="M287.7,57c-0.6-0.8-0.5-1.9,0.4-2.6l18.7-13.8c9.6-7,23.1-5.1,30.1,4.4c7.1,9.6,5,23.3-4.5,30.3l-8.2,6l13.5,18.3c0.6,0.8,0.4,2-0.4,2.6l-9.2,6.8c-0.9,0.6-2,0.4-2.6-0.4L287.7,57z M323.3,64.5c3.3-2.5,4.2-7.2,1.6-10.7c-2.4-3.3-7-3.7-10.4-1.2l-7.4,5.4l8.8,11.9L323.3,64.5z"></path>
                    <path class="st1" d="M350.3,21.1c-0.3-0.9,0.2-2,1.2-2.3L389.7,7c1-0.3,2,0.3,2.3,1.2l3.1,10.1c0.3,0.9-0.2,2-1.2,2.3l-25.5,7.9l3.6,11.4l21-6.5c0.9-0.3,2,0.3,2.3,1.2l3.1,10.1c0.3,1-0.3,2-1.2,2.3l-21,6.5l3.9,12.5l25.5-7.9c1-0.3,2,0.3,2.3,1.2l3.1,10.1c0.3,0.9-0.2,2-1.2,2.3l-38.2,11.9c-1,0.3-2-0.3-2.3-1.2L350.3,21.1z"></path>
                    <path class="st1" d="M420.6,66.1l30.6-64.8c0.3-0.6,1-1.1,1.6-1.1l1,0c0.7,0,1.3,0.5,1.6,1.1l29.8,65.2c0.6,1.3-0.2,2.5-1.7,2.5l-10.7-0.1c-1.7,0-2.5-0.6-3.4-2.4l-3.4-7.7l-26.3-0.2l-3.5,7.7c-0.5,1.2-1.6,2.3-3.5,2.3l-10.6-0.1C420.8,68.6,420,67.3,420.6,66.1z M460.4,45.6l-7.2-16h-0.1l-7.3,15.9L460.4,45.6z"></path>
                    <path class="st1" d="M542.2,15.9c9.2,3,15,8.1,19.4,15.9c0.6,1,0.2,2.1-0.8,2.6l-9.6,5.1c-0.9,0.4-1.9,0.1-2.3-0.8c-2.4-4.2-6.3-7.3-10.8-8.8c-10.4-3.4-20.8,2.7-24.2,12.9c-3.4,10.2,1.5,21.2,11.9,24.6c4.3,1.4,9.5,1.4,13.7-0.3c0.8-0.3,2,0.1,2.4,0.9l4.6,10c0.4,0.9-0.1,2-0.9,2.4c-8.2,4-17.1,4.2-25.2,1.5C502,75.8,492.1,56.4,498.2,38C504.2,19.7,523.9,9.8,542.2,15.9z"></path>
                    <path class="st1" d="M591.5,42.2c0.6-0.8,1.7-1.1,2.6-0.4l32.7,23c0.9,0.6,1,1.8,0.4,2.6l-6.1,8.6c-0.6,0.8-1.7,1.1-2.6,0.4L596.8,61l-6.9,9.8l18,12.7c0.8,0.6,1,1.8,0.4,2.6l-6.1,8.6c-0.6,0.9-1.8,1-2.6,0.4l-18-12.7l-7.5,10.7l21.9,15.4c0.9,0.6,1,1.8,0.4,2.6l-6.1,8.6c-0.6,0.8-1.7,1.1-2.6,0.4l-32.7-23c-0.9-0.6-1-1.8-0.4-2.6L591.5,42.2z"></path>
                  </g>
                </svg>
              </a>

            </h1>
            <div onClick={this.toggleLang} class="l-selector l-selector--left  l-selector--lang">
              <div class={this.state.langStatus1}>
                <svg class="ico-svg lang">
                  <use xlinkHref="/symbol-defs.svg#icon-lang"></use></svg><span class="text">English</span><svg class="ico-svg angle"><use xlinkHref="/symbol-defs.svg#icon-angle">
                  </use>
                </svg>
              </div>
              <div class={this.state.langStatus2}>
                <ul>
                  <li class="current"><span class="text">English</span></li>
                  <li><a href="#" class="text">Japanese</a></li>
                </ul>
              </div>
            </div>
            <div onClick={this.toggleMenu} class="l-selector l-selector--right  l-selector--user">
              <div class={this.state.menuStatus1}>
                <svg class="ico-svg acount">
                  <use xlinkHref="/symbol-defs.svg#icon-acount">
                  </use>
                </svg>
                {userName}
                <svg class="ico-svg angle">
                  <use xlinkHref="/symbol-defs.svg#icon-angle">
                  </use>
                </svg>
              </div>
              <div class={this.state.menuStatus2}>
                <ul>
                  {this.renderLinks()}
                </ul>
              </div>
            </div>
          </div>
      </nav>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     authenticated: state.auth.authenticated
//   };
// }

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  authenticated: state.auth.authenticated
});

Navbar.propTypes = {
  getCurrentProfile: PropTypes.func,
  profile: PropTypes.object
};

export default connect(mapStateToProps, {getCurrentProfile})(Navbar);
