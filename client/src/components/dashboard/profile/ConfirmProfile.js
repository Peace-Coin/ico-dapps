import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { change } from 'redux-form';
import TextFieldGroup from '../../UI/TextFieldGroup';
import TextAreaFieldGroup from '../../UI/TextAreaFieldGroup';
import InputGroup from '../../UI/InputGroup';
import SelectListGroupOfCountry from '../../UI/SelectListGroupOfCountry';
import SelectListGroup from '../../UI/SelectListGroup';
import FileFieldGroup from '../../UI/FileFieldGroup';
import CheckBoxGroup from '../../UI/CheckBoxGroup';
import { createProfile, checkProfile } from '../../../actions/profileAction';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ConfirmProfile extends Component {
  constructor(props) {
    super(props);

    if(this.props.location.state == undefined || this.props.location.state.profile == undefined){

      this.state = {
        profile: {},
        errorFlg: true
      };

    }else{

      this.state = {
        profile: this.props.location.state.profile,
        errorFlg: false
      };
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {

    if(this.state.errorFlg){

      this.props.history.push('/dashboard/profile');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors.validation });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    // Propaties
    const profileData = {
      firstName: this.state.profile.firstName,
      lastName: this.state.profile.lastName,
      gender: this.state.profile.gender,
      phoneNumber1: this.state.profile.phoneNumber1,
      phoneNumber2: this.state.profile.phoneNumber2,
      postalCode: this.state.profile.postalCode,
      cityAddress: this.state.profile.cityAddress,
      streetAddress: this.state.profile.streetAddress,
      idNumber: this.state.profile.idNumber,
      birth: this.state.profile.birth,
      country: this.state.profile.country,
      passport: this.state.profile.passport,
      certificateResidence: this.state.profile.certificateResidence,
      picture: this.state.profile.picture,
      ethereumAddress: this.state.profile.ethereumAddress,
      bitcoinAddress: this.state.profile.bitcoinAddress,
      aml: this.state.profile.aml,
    };

    // Create Profile
    this.props.createProfile(profileData, this.props.history);
  }

  render() {

    return (
      <div className="peaceCoinIco authenticate confirmation">
      <div id="mainContent" role="main">
      <div id="pageContent">
        <div class="l-sec sec_auth">
          <h1 class="title_sec title_sec__a title_sec-auth">Authenticate</h1>
          <div class="l-content l-content--navi l-content--navi-auth themeA clearfix"><span class="step step--text">Input</span><span class="step step--obj"><i class="fa fa-angle-right" aria-hidden="true"></i></span><span class="step step--text now">Confirmation</span><span class="step step--obj"><i class="fa fa-angle-right" aria-hidden="true"></i></span><span class="step step--text">Complete</span></div>
          <div class="l-content l-content--form l-content--form-auth">
            <form id="form_auth" onSubmit={this.onSubmit}>
              <div class="form-group form-group--text form-group--text-name">
                <label for="frmName1" class="main main--auth">Name</label>
                <p class="text">{this.state.profile.firstName} {this.state.profile.lastName}</p>
              </div>
              <div class="form-group form-group--radio form-group--radio-gender">
                <label for="" class="main main--auth">Gender</label>
                <p class="text">{this.state.profile.gender}</p>
              </div>
              <div class="form-group form-group--text form-group--text-birthday">
                <label for="frmBirthday" class="main main--auth">Birthday</label>
                <p class="text">{this.state.profile.birth}</p>
              </div>
              <div class="form-group form-group--text form-group--text-streetaddress">
                <label for="frmStreetaddress" class="main main--auth">Street Address</label>
                <p class="text">{this.state.profile.streetAddress}</p>
              </div>
              <div class="form-group form-group--text form-group--text-city">
                <label for="frmCity" class="main main--auth">City</label>
                <p class="text">{this.state.profile.cityAddress}</p>
              </div>
              <div class="form-group form-group--text form-group--text-postalCode">
                <label for="frmPostalCode" class="main main--auth">Postal Code</label>
                <p class="text">{this.state.profile.postalCode}</p>
              </div>
              <div class="form-group form-group--select form-group--select-country">
                <label for="frmCountry" class="main main--auth">Country</label>
                <p >
                <SelectListGroupOfCountry
                  className="text"
                  name="country"
                  id="frmCountry"
                  value={this.state.profile.country}
                  disabled="true"
                  style={{fontSize: '1.5em', backgroundColor: '#00b0c3', color: 'white', border: '0px solid grey', borderRadius: '0px'}}
                />
                </p>
              </div>
              <div class="form-group form-group--select form-group--text form-group--select-phone form-group--text-phone">
                <label for="frmPhone1" class="main main--auth">Phone Number</label>
                <p class="text">{this.state.profile.phoneNumber1} {this.state.profile.phoneNumber2}</p>
              </div>
              <div class="form-group form-group--text form-group--text-idNum">
                <label for="frmIdnum" class="main main--auth">ID Number</label>
                <p class="text">{this.state.profile.idNumber}</p>
              </div>
              <div class="form-group form-group--text form-group--text-erc">
                <label for="frmErc" class="main main--auth">ERC20 Address</label>
                <p class="text">{this.state.profile.ethereumAddress}</p>
              </div>
              <div class="form-group form-group--text form-group--text-erc">
                <label for="frmErc" class="main main--auth">BITCOIN Address</label>
                <p class="text">{this.state.profile.bitcoinAddress}</p>
              </div>
              <div class="form-group form-group--file form-group--file-photoIdDocu help">
                <label for="frmPhotoIdDocu" class="main main--auth">Photo ID document</label>
                <p class="img"><img src={this.state.profile.passport} /></p>
              </div>
              <div class="form-group form-group--file form-group--file-addressProof">
                <label for="frmAddressProof" class="main main--auth">Address proof image</label>
                <p class="img"><img src={this.state.profile.certificateResidence} /></p>
              </div>
              <div class="form-group form-group--file form-group--file-selfyImage">
                <label for="frmSelfyImage" class="main main--auth">Selfy image</label>
                <p class="img"><img src={this.state.profile.picture} /></p>
              </div>

              <div class="form-group form-group--check form-group--check-aml">
                <label>
                  <CheckBoxGroup
                    name="aml"
                    value="true"
                    onChange={this.onChangeCheckBoxAml}
                    className="chkbox"
                    disabled="true"
                    checkedFlg="true"
                  />
                  <span class="text-label">I agree to </span>
                </label>
                <a >the AML Authentication</a>
              </div>

              <div class="l-sec sec_btnSet sec_btnSet-auth">
                <div class="form-group form-group--btn form-group--btn-confirmation">
                  <button class="btn btn--cl-1 btn--size-1" type="submit" name="action" value="Confirmation">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

ConfirmProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, checkProfile })(
  withRouter(ConfirmProfile)
);
