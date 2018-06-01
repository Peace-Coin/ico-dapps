import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../actions/profileAction';
import Spinner from '../../UI/Spinner';
import SelectListGroupOfCountry from '../../UI/SelectListGroupOfCountry';
import CheckBoxGroup from '../../UI/CheckBoxGroup';
import Modal from 'react-modal';
import TextFieldGroup from '../../UI/TextFieldGroup';
import { withRouter } from 'react-router-dom';
import { changeEthreumAddress, changeBitcoinAddress, clearError } from '../../../actions/profileAction';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#0091a7'
  }
};

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //ポップアップ状態
      EthereumAddressModalIsOpen: false,
      BitcoinAddressModalIsOpen: false,
      ethereumAddress: '',
      bitcoinAddress: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);

    this.openEthereumAddressModal = this.openEthereumAddressModal.bind(this);
    this.afterEthereumAddressModal = this.afterEthereumAddressModal.bind(this);
    this.closeEthereumAddressModal = this.closeEthereumAddressModal.bind(this);

    this.openBitcoinAddressModal = this.openBitcoinAddressModal.bind(this);
    this.afterBitcoinAddressModal = this.afterBitcoinAddressModal.bind(this);
    this.closeBitcoinAddressModal = this.closeBitcoinAddressModal.bind(this);

    this.changeEthreumAddress = this.changeEthreumAddress.bind(this);
    this.changeBitcoinAddress = this.changeBitcoinAddress.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changeEthreumAddress(e) {
    e.preventDefault();

    this.props.clearError(this.props.history);

    const profileData = {
      ethereumAddress: this.state.ethereumAddress,
    }

    this.props.changeEthreumAddress(profileData, this.props.history);
  }

  changeBitcoinAddress(e) {
    e.preventDefault();

    this.props.clearError(this.props.history);

    const profileData = {
      bitcoinAddress: this.state.bitcoinAddress,
    }

    this.props.changeBitcoinAddress(profileData, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors.validation });
    }
  }

  openEthereumAddressModal() {
    this.setState({ EthereumAddressModalIsOpen: true });
  }

  afterEthereumAddressModal() {}

  closeEthereumAddressModal() {
    this.setState({ EthereumAddressModalIsOpen: false });
  }

  openBitcoinAddressModal() {
    this.setState({ BitcoinAddressModalIsOpen: true });
  }

  afterBitcoinAddressModal() {}

  closeBitcoinAddressModal() {
    this.setState({ BitcoinAddressModalIsOpen: false });
  }

  render() {

    const { profile, loading } = this.props.profile;

    var { errors } = this.state;

    //登録後のアドレス変更バリデーションエラーの初期化
    if(errors == undefined){

      errors = {
        ethereumAddress: '',
        bitcoinAddress: '',
      }
    }

    // Change Profile
    let changeProfileLink;

    if (profile != null){

      var conf = require('../../../config/conf.json');

      //when status is not approve
      if(Object.keys(profile).length > 0 && profile.Profile.status != conf.KYC_APPROVED_STATUS){

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
            <Modal
              isOpen={this.state.EthereumAddressModalIsOpen}
              onAfterOpen={this.afterEthereumAddressModal}
              onRequestClose={this.closeEthereumAddressModal}
              style={customStyles}
              contentLabel="EthereumAddressModal"
            >
              <div style={{fontSize: '16px'}}>
                <h1>Your EthereumAddress</h1>
                <p style={{border: '1px solid grey', padding: '10px'}}>
                  {profile.Profile.ethereumAddress}
                </p>
                <p>
                  <TextFieldGroup
                    placeholder="*ethereumAddress"
                    name="ethereumAddress"
                    value={this.state.ethereumAddress}
                    onChange={this.onChange}
                    error={errors.ethereumAddress}
                    info="This is for ethereumAddress"
                  />
                </p>
                <button onClick={this.changeEthreumAddress}>
                  update
                </button>
                <button onClick={this.closeEthereumAddressModal}>
                  close
                </button>
              </div>
            </Modal>
            <Modal
              isOpen={this.state.BitcoinAddressModalIsOpen}
              onAfterOpen={this.afterBitcoinAddressModal}
              onRequestClose={this.closeBitcoinAddressModal}
              style={customStyles}
              contentLabel="BitcoinAddressModal"
            >
              <div style={{fontSize: '16px'}}>
                <h1>Your EthereumAddress</h1>
                <p style={{border: '1px solid grey', padding: '10px'}}>
                  {profile.Profile.bitcoinAddress}
                </p>
                <p>
                  <TextFieldGroup
                    placeholder="*bitcoinAddress"
                    name="bitcoinAddress"
                    value={this.state.bitcoinAddress}
                    onChange={this.onChange}
                    error={errors.bitcoinAddress}
                    info="This is for bitcoinAddress"
                  />
                </p>
                <button onClick={this.changeBitcoinAddress}>
                  update
                </button>
                <button onClick={this.closeBitcoinAddressModal}>
                  close
                </button>
              </div>
            </Modal>
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
            <p>Ethereum Address : {profile.Profile.ethereumAddress} <input type='button' value='Change' onClick={this.openEthereumAddressModal} /></p>
            <p>Bitcoin Address : {profile.Profile.bitcoinAddress} <input type='button' value='Change' onClick={this.openBitcoinAddressModal} /></p>
            <p>AML(anti-money laundering)? :
              <CheckBoxGroup
              checkedFlg={profile.Profile.aml}
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
      <div style={{fontSize: '16px'}}>
        <Link to="/dashboard">
          Back
        </Link>
        <h1>-----</h1>
        {changeProfileLink}
        <h1>-----</h1>
        <h1>Profile</h1>
        <h1>-----</h1>
        {profileContent}
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  changeEthreumAddress: PropTypes.func.isRequired,
  changeBitcoinAddress: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { getCurrentProfile, changeEthreumAddress, changeBitcoinAddress, clearError })(
  withRouter(Profile)
);
