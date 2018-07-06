import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
//import { getCurrentProfile } from '../../actions/profileAction';
import { getProfileStatus } from '../../actions/profileAction';
import PropTypes from 'prop-types';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      langStatus1:
        'selector__item selector__item--now selector__item--now-lang',
      langStatus2:
        'selector__item selector__item-list selector__item-list-lang theme-list-selector is-hidden',
      menuStatus1:
        'selector__item selector__item--now selector__item--now-user',
      menuStatus2:
        'r-custom-list selector__item selector__item-list selector__item-list-user theme-list-selector is-hidden',
      langStatusOpenFlg: false,
      menuStatusOpenFlg: false
    };

    this.toggleLang = this.toggleLang.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.popupClose = this.popupClose.bind(this);

    this.alertChangeLanguage = this.alertChangeLanguage.bind(this);
  }

  alertChangeLanguage(){

    alert("This page doesn't support Japanese yet. ");
  }

  componentDidMount() {
    getProfileStatus();

    document.addEventListener('click', this.popupClose);
  }

  popupClose(e) {

    if( e.target.closest('.l-selector') == null){

      this.setState({
        langStatus2:
          'selector__item selector__item-list selector__item-list-lang theme-list-selector is-hidden'
      });
      this.setState({ langStatusOpenFlg: false });

      this.setState({
        menuStatus2:
          'selector__item selector__item-list selector__item-list-lang theme-list-selector is-hidden'
      });
      this.setState({ menuStatusOpenFlg: false });

    }
  }

  toggleLang() {
    if (this.state.langStatusOpenFlg) {
      this.setState({
        langStatus2:
          'selector__item selector__item-list selector__item-list-lang theme-list-selector is-hidden'
      });
      this.setState({ langStatusOpenFlg: false });
    } else {
      this.setState({
        langStatus2:
          'selector__item selector__item-list selector__item-list-lang theme-list-selector'
      });
      this.setState({ langStatusOpenFlg: true });
    }
  }

  toggleMenu() {
    if (this.state.menuStatusOpenFlg) {
      this.setState({
        menuStatus2:
          'r-custom-list selector__item selector__item-list selector__item-list-lang theme-list-selector is-hidden'
      });
      this.setState({ menuStatusOpenFlg: false });
    } else {
      this.setState({
        menuStatus2:
          'r-custom-list selector__item selector__item-list selector__item-list-lang theme-list-selector'
      });
      this.setState({ menuStatusOpenFlg: true });
    }
  }

  renderLinks() {
    let kycaml;

    if (
      this.props.profile.profileStatus == null ||
      this.props.profile.profileStatus.profileStatus == null ||
      this.props.profile.profileStatus.profileStatus === 0
    ) {
      kycaml = (
        <NavLink to="/dashboard/profile/create-profile">KYC/AML</NavLink>
      );
    } else {
      kycaml = <NavLink to="/dashboard/profile">KYC/AML</NavLink>;
    }

    if (this.props.authenticated) {
      // show a link to sign out
      return (
        <li className="nav-item">
          <NavLink to="/dashboard">Dashboard</NavLink>
          {kycaml}
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
    // const { profile, loading } = this.props.profile;

    let handleName;

    if (this.props.authenticated) {
      handleName = this.props.auth.user.email;

      if (handleName === '' || handleName == undefined) {
        handleName = 'guest';
      }
    } else {
      handleName = 'guest';
    }

    let userName = <span className="text">{handleName}</span>;

    return (
      <nav>
        <div id="header" role="banner">
          <h1 className="logo">
            <a href="https://www.peace-coin.org/">
              <svg
                version="1.1"
                id="logo"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 957.8 193"
                style={{ enableBbackground: 'new 0 0 957.8 193' }}
                xmlSpace="preserve"
              >
                <g id="set">
                  <g id="text">
                    <g>
                      <path
                        className="st0"
                        d="M234.8,53.9c0-1.3,1-2.4,2.4-2.4h29c15.7,0,28.6,12.8,28.6,28.2c0,15.8-12.9,28.8-28.5,28.8h-18.5v29.6
                  				c0,1.3-1.1,2.4-2.4,2.4h-8.2c-1.4,0-2.4-1.1-2.4-2.4V53.9z M265.6,96.5c8.9,0,16.4-7.2,16.4-16.5c0-8.8-7.5-15.5-16.4-15.5h-17.8
                  				v32H265.6z"
                      />
                      <path
                        className="st0"
                        d="M307.8,53.9c0-1.3,1-2.4,2.4-2.4h51.1c1.4,0,2.4,1.1,2.4,2.4v7.1c0,1.3-1,2.4-2.4,2.4h-40.6v26h34.6
                  				c1.3,0,2.4,1.1,2.4,2.4v7.9c0,1.5-1.2,2.6-2.5,2.6h-34.5v27h40.6c1.4,0,2.4,1.1,2.4,2.4v6.2c0,1.3-1,2.4-2.4,2.4h-51.1
                  				c-1.4,0-2.4-1.1-2.4-2.4V53.9z"
                      />
                      <path
                        className="st0"
                        d="M376.2,138.2l39.3-86.3c0.4-0.8,1.5-1.4,2.2-1.4h1.3c0.6,0,1.8,0.6,2.2,1.4l39.1,86.3
                  				c0.8,1.7-0.3,3.3-2.2,3.3h-8.9c-1.5,0-2.4-0.7-2.9-1.9l-7.8-17.1h-40.9c-2.5,5.7-5.1,11.4-7.6,17.1c-0.4,0.9-1.4,1.9-2.9,1.9
                  				h-8.9C376.4,141.5,375.4,139.8,376.2,138.2z M434.2,110.5l-15.7-35h-0.6l-15.6,35H434.2z"
                      />
                      <path
                        className="st0"
                        d="M510,50.5c12.9,0,22.2,4.3,30.9,11.9c1.2,1,1.2,2.6,0.1,3.6l-5.6,5.8c-0.9,1.2-2,1.2-3.2,0
                  				c-6-5.2-14.2-8.6-22.1-8.6c-18.3,0-32.1,15.3-32.1,33.2s13.9,33.1,32.2,33.1c9.3,0,15.8-3.7,22-8.4c1.2-0.9,2.3-0.8,3.1-0.1
                  				l5.9,5.8c1,0.9,0.8,2.6-0.1,3.5c-8.7,8.4-19.7,12.4-31.1,12.4c-25.6,0-46.1-20.3-46.1-45.9C463.8,71.1,484.4,50.5,510,50.5z"
                      />
                      <path
                        className="st0"
                        d="M558.8,53.9c0-1.3,1-2.4,2.5-2.4h52.1c1.4,0,2.4,1.1,2.4,2.4v7.1c0,1.3-1,2.4-2.4,2.4h-40.6v26h33.6
                  				c1.3,0,2.4,1.1,2.4,2.4v7.9c0,1.5-1.1,2.6-2.4,2.6h-33.6v27h40.6c1.4,0,2.4,1.1,2.4,2.4v6.2c0,1.3-1,2.4-2.5,2.4h-52.1
                  				c-1.4,0-2.5-1.1-2.5-2.4V53.9z"
                      />
                    </g>
                    <g>
                      <path
                        className="st1"
                        d="M700,50.5c12.9,0,22.2,4.3,30.9,11.9c1.1,1,1.1,2.6,0.1,3.6l-5.6,5.8c-0.9,1.2-2,1.2-3.2,0
                  				c-6-5.2-14.2-8.6-22.1-8.6c-18.3,0-32.1,15.3-32.1,33.2s13.9,33.1,32.2,33.1c9.3,0,15.8-3.7,22-8.4c1.2-0.9,2.3-0.8,3.1-0.1
                  				l5.9,5.8c1,0.9,0.8,2.6-0.1,3.5c-8.7,8.4-19.7,12.4-31.1,12.4c-25.6,0-46.1-20.3-46.1-45.9C653.9,71.1,674.4,50.5,700,50.5z"
                      />
                      <path
                        className="st1"
                        d="M786.1,50.5c25.6,0,46,20.6,46,46.1c0,25.6-20.4,45.9-46,45.9c-25.6,0-45.9-20.3-45.9-45.9
                  				C740.3,71.1,760.6,50.5,786.1,50.5z M786.1,129.7c18.3,0,33.2-14.8,33.2-33.1c0-18.1-15-33.4-33.2-33.4
                  				C768,63.3,753,78.5,753,96.6C753,114.9,768,129.7,786.1,129.7z"
                      />
                      <path
                        className="st1"
                        d="M850.3,51.5h8.1c1.3,0,2.4,1.1,2.4,2.4v84.1c0,1.3-1.1,2.4-2.4,2.4h-8.1c-1.3,0-2.4-1.1-2.4-2.4V53.9
                  				C847.8,52.6,848.9,51.5,850.3,51.5z"
                      />
                      <path
                        className="st1"
                        d="M883.8,52.8c0-1.3,1-2.3,2.3-2.3h3l55.3,64h0.4V53.9c0-1.3,1-2.4,2.4-2.4h8.2c1.3,0,2.4,1.1,2.4,2.4v86.3
                  				c0,1.3-1,2.3-2.3,2.3h-3.4l-55.2-66h-0.1v62.6c0,1.3-1,2.4-2.4,2.4h-8.1c-1.3,0-2.4-1.1-2.4-2.4V52.8z"
                      />
                    </g>
                  </g>
                  <g id="face">
                    <path
                      className="st1"
                      d="M96.5,0C43.2,0,0,43.2,0,96.5S43.2,193,96.5,193c53.3,0,96.5-43.2,96.5-96.5S149.8,0,96.5,0z M96.5,9.8
                  			c47.7,0,86.6,38.8,86.6,86.6c0,7.2-0.9,14.2-2.6,20.9c-6.7,9.9-24.7,21.8-32.1,25.8c-5.7,3.1-13.3,2.5-19.8-1.5
                  			c-5.3-3.3-11.5-5-18.5-5c0,0-0.1,0-0.1,0c-4.6,0-9.3,1.7-13.5,4.3c-4.5-2.8-9.2-4.3-13.5-4.3c0,0-0.1,0-0.1,0
                  			c-7,0-13.2,1.7-18.5,5c-6.5,4.1-14.1,4.6-19.8,1.5c-7.5-4.1-25.8-16.1-32.2-26c-1.6-6.6-2.5-13.6-2.5-20.7
                  			C9.9,48.6,48.8,9.8,96.5,9.8z M17,130.8c8.5,7.6,19.2,14.5,24.9,17.5c3.3,1.8,7,2.7,10.8,2.7c5,0,10.1-1.5,14.8-4.4
                  			c4.4-2.7,9.6-4.1,15.5-4.2c2.6,0,5.5,0.8,8.5,2.3c-3,2.7-5.3,5.7-6.4,8.5c-1.5,3.8-0.9,7.3,1.6,9.6c2.5,2.4,7.2,4.3,14.9,0
                  			c2.2-1.2,4.1-2.7,5.4-3.7c4.5,3.3,16.1,12,22.6,17.5c-3,1.3-6.1,2.3-9.3,3.3L106.5,169c-0.9-0.7-2.2-0.5-2.9,0.3s-0.5,2.2,0.3,2.9
                  			l11.2,8.8c-3.2,0.7-6.5,1.2-9.8,1.6l-8.5-6.4c-0.9-0.7-2.2-0.5-2.9,0.4c-0.7,0.9-0.5,2.2,0.4,2.9l4.6,3.5c-0.8,0-1.7,0-2.5,0
                  			C60.9,183.1,30.3,161.5,17,130.8z M135.3,174c-7.5-6.7-26-20.2-26.9-20.9c-1.1-0.8-2.7-0.7-3.7,0.3c-2.1,2-10.6,8.8-14.2,5.3
                  			c-0.3-0.2-1-1-0.1-3.2c2.3-5.7,12-12.9,19.7-12.9c0,0,0.1,0,0.1,0c5.9,0,11.1,1.4,15.5,4.2c8.3,5.2,18.1,5.8,25.6,1.7
                  			c5.6-3,16.3-9.9,24.8-17.5C167.9,149.6,153.4,164.9,135.3,174z"
                    />
                    <path
                      className="st1"
                      d="M96.8,112.3c46.3,0,59.3-26.7,59.8-27.8c0.7-1.4,0.1-3.2-1.4-3.9c-1.4-0.7-3.2-0.1-3.9,1.4
                  			c-0.1,0.2-12,24.5-54.6,24.5C54.4,106.5,42.7,83,42.2,82c-0.7-1.4-2.4-2.1-3.8-1.4c-1.4,0.7-2.1,2.4-1.4,3.9
                  			C37.5,85.6,50.5,112.3,96.8,112.3z"
                    />
                    <path
                      className="st1"
                      d="M68.7,57c5.2-0.5,9.1-4.7,8.7-9.5c-0.4-4.8-5-8.3-10.2-7.8c-5.2,0.5-9.1,4.7-8.7,9.5
                  			C58.9,53.9,63.5,57.4,68.7,57z"
                    />
                    <path
                      className="st1"
                      d="M124.3,57c5.2,0.5,9.8-3.1,10.2-7.8c0.4-4.8-3.5-9-8.7-9.5c-5.2-0.5-9.8,3.1-10.2,7.8
                  			C115.2,52.3,119.1,56.5,124.3,57z"
                    />
                  </g>
                </g>
              </svg>
            </a>
          </h1>
          <div
            onClick={this.toggleLang}
            className="l-selector l-selector--left  l-selector--lang"
          >
            <div className={this.state.langStatus1}>
              <svg className="ico-svg lang">
                <use xlinkHref="/symbol-defs.svg#icon-lang" />
              </svg>
              <span className="text">English</span>
              <svg className="ico-svg angle">
                <use xlinkHref="/symbol-defs.svg#icon-angle" />
              </svg>
            </div>
            <div className={this.state.langStatus2}>
              <ul>
                <li className="current">
                  <span className="text">English</span>
                </li>
              </ul>
            </div>
          </div>
          <div
            onClick={this.toggleMenu}
            className="l-selector l-selector--right l-selector--user"
          >
            <div className={this.state.menuStatus1}>
              <svg className="ico-svg acount">
                <use xlinkHref="/symbol-defs.svg#icon-acount" />
              </svg>
              {userName}
              <svg className="ico-svg angle">
                <use xlinkHref="/symbol-defs.svg#icon-angle" />
              </svg>
            </div>
            <div className={this.state.menuStatus2}>
              <ul>{this.renderLinks()}</ul>
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

//以下、多言語化の際のリスト
// <div className={this.state.langStatus2}>
//   <ul>
//     <li className="current">
//       <span className="text">English</span>
//     </li>
//     <li>
//       <a onClick={this.alertChangeLanguage} className="text">
//         Japanese
//       </a>
//     </li>
//   </ul>
// </div>


const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  authenticated: state.auth.authenticated
});

Navbar.propTypes = {
  getProfileStatus: PropTypes.func,
  profile: PropTypes.object
};

export default connect(
  mapStateToProps,
  { getProfileStatus }
)(Navbar);
