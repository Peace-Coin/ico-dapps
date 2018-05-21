import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profileAction';
import Spinner from '../../UI/Spinner';
import SelectListGroupOfCountry from '../../UI/SelectListGroupOfCountry';
import CheckBoxGroup from '../../UI/CheckBoxGroup';

class Profile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { profile, loading } = this.props.profile;

    // Change Profile
    let changeProfileLink;

    if (profile != null){

      //when status is not approve
      if(Object.keys(profile).length > 0 && profile.Profile.status != '2'){

        changeProfileLink = (
          <Link to="/dashboard/profile/create-profile">
            FILL KYC/AML FORM
          </Link>
        );
      }
    }

    // Profile Contents
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        profileContent = (
          <div>
            <p>The Document is submitted for your KYC Process</p>
            <p>status : {profile.Profile.statusName}</p>
            <p>firstName : {profile.Profile.firstName}</p>
            <p>lastName : {profile.Profile.lastName}</p>
            <p>address : {profile.Profile.address}</p>
            <p>birth : {profile.Profile.birth}</p>
            <p>country :
              <SelectListGroupOfCountry
                value={profile.Profile.country}
                disabled="true"
              />
            </p>
            <p>passport : <img src={profile.Profile.passport} /></p>
            <p>Certificate of Residence : <img src={profile.Profile.certificateResidence} /></p>
            <p>picture : <img src={profile.Profile.picture} /></p>
            <p>ethereumAddress : {profile.Profile.ethereumAddress}</p>
            <p>AML(anti-money laundering)? :
              <CheckBoxGroup
              checked={profile.Profile.aml}
              disabled="true"
            />
            </p>
            <p>We confirmed PiaceCoin Terms :
              <CheckBoxGroup
              checked={profile.Profile.terms}
              disabled="true"
            />
            </p>
          </div>
        );
      } else {
        // User is logined in but has no profile
        profileContent = (
          <div>
            <p> Welcome </p>
            <p>You have not yet setup a kyc info, please add info</p>
            <p>
            <Link to="/dashboard/profile/create-profile">
              FILL KYC/AML FORM
            </Link>
            </p>
            <p>
            <Link to="/dashboard">
              Back
            </Link>
            </p>
          </div>
        );
      }
    }

    return (
      <div>
        <h1>Profile</h1>
        {changeProfileLink}
        {profileContent}
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
