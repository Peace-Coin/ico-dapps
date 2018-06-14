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
import {
  changeEthreumAddress,
  changeBitcoinAddress,
  clearError
} from '../../../actions/profileAction';
import { NavLink } from 'react-router-dom';

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
      errors: {}
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

  componentDidUpdate() {
    // const { profile } = this.props.profile;
    // if (profile === null || !Object.keys(profile).length) {
    //   this.props.history.push('/dashboard/profile/create-profile');
    // }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.profile.profile === null && this.props.profile.loading) {
  //     this.props.history.push('/dashboard/profile/create-profile');
  //   }
  // }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  changeEthreumAddress(e) {
    e.preventDefault();

    this.props.clearError(this.props.history);

    const profileData = {
      ethereumAddress: this.state.ethereumAddress
    };

    this.props.changeEthreumAddress(profileData, this.props.history);
  }

  changeBitcoinAddress(e) {
    e.preventDefault();

    this.props.clearError(this.props.history);

    const profileData = {
      bitcoinAddress: this.state.bitcoinAddress
    };

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
    if (errors == undefined) {
      errors = {
        ethereumAddress: '',
        bitcoinAddress: ''
      };
    }

    // Change Profile
    let changeProfileLink;

    // Profile Contents
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        profileContent = (
          <div className="peaceCoinIco authenticate confirmation">
            <Modal
              isOpen={this.state.EthereumAddressModalIsOpen}
              onAfterOpen={this.afterEthereumAddressModal}
              onRequestClose={this.closeEthereumAddressModal}
              style={customStyles}
              contentLabel="EthereumAddressModal"
            >
              <div style={{ fontSize: '16px' }}>
                <h1>Your EthereumAddress</h1>
                <p style={{ border: '1px solid grey', padding: '10px' }}>
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
                <button onClick={this.changeEthreumAddress}>update</button>
                <button onClick={this.closeEthereumAddressModal}>close</button>
              </div>
            </Modal>
            <Modal
              isOpen={this.state.BitcoinAddressModalIsOpen}
              onAfterOpen={this.afterBitcoinAddressModal}
              onRequestClose={this.closeBitcoinAddressModal}
              style={customStyles}
              contentLabel="BitcoinAddressModal"
            >
              <div style={{ fontSize: '16px' }}>
                <h1>Your EthereumAddress</h1>
                <p style={{ border: '1px solid grey', padding: '10px' }}>
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
                <button onClick={this.changeBitcoinAddress}>update</button>
                <button onClick={this.closeBitcoinAddressModal}>close</button>
              </div>
            </Modal>
            <div id="mainContent" role="main">
              <div id="pageContent">
                <div class="l-sec sec_auth">
                  <h1 class="title_sec title_sec__a title_sec-auth">
                    Authenticate (status : {profile.Profile.statusName})
                  </h1>
                  <div class="l-content l-content--navi l-content--navi-auth themeA clearfix">
                    <span class="step step--text">Input</span>
                    <span class="step step--obj">
                      <i class="fa fa-angle-right" aria-hidden="true" />
                    </span>
                    <span class="step step--text">Confirmation</span>
                    <span class="step step--obj">
                      <i class="fa fa-angle-right" aria-hidden="true" />
                    </span>
                    <span class="step step--text now">Complete</span>
                  </div>
                  <div class="l-content l-content--form l-content--form-auth">
                    <form id="form_auth">
                      <div class="form-group form-group--text form-group--text-name">
                        <label for="frmName1" class="main main--auth">
                          Name
                        </label>
                        <p class="text">
                          {profile.Profile.firstName} {profile.Profile.lastName}
                        </p>
                      </div>
                      <div class="form-group form-group--radio form-group--radio-gender">
                        <label for="" class="main main--auth">
                          Gender
                        </label>
                        <p class="text">{profile.Profile.gender}</p>
                      </div>
                      <div class="form-group form-group--text form-group--text-birthday">
                        <label for="frmBirthday" class="main main--auth">
                          Birthday
                        </label>
                        <p class="text">{profile.Profile.birth}</p>
                      </div>
                      <div class="form-group form-group--text form-group--text-streetaddress">
                        <label for="frmStreetaddress" class="main main--auth">
                          Street Address
                        </label>
                        <p class="text">{profile.Profile.streetAddress}</p>
                      </div>
                      <div class="form-group form-group--text form-group--text-city">
                        <label for="frmCity" class="main main--auth">
                          City
                        </label>
                        <p class="text">{profile.Profile.cityAddress}</p>
                      </div>
                      <div class="form-group form-group--text form-group--text-postalCode">
                        <label for="frmPostalCode" class="main main--auth">
                          Postal Code
                        </label>
                        <p class="text">{profile.Profile.postalCode}</p>
                      </div>
                      <div class="form-group form-group--select form-group--select-country">
                        <label for="frmCountry" class="main main--auth">
                          Country
                        </label>
                        <p>
                          <SelectListGroupOfCountry
                            className=""
                            name="country"
                            id="frmCountry"
                            value={profile.Profile.country}
                            disabled="true"
                            style={{
                              fontSize: '1.5em',
                              backgroundColor: '#00b0c3',
                              color: 'white',
                              border: '0px solid grey',
                              borderRadius: '0px'
                            }}
                          />
                        </p>
                      </div>
                      <div class="form-group form-group--select form-group--text form-group--select-phone form-group--text-phone">
                        <label for="frmPhone1" class="main main--auth">
                          Phone Number
                        </label>
                        <p class="text">
                          {profile.Profile.phoneNumber1}{' '}
                          {profile.Profile.phoneNumber2}
                        </p>
                      </div>
                      <div class="form-group form-group--text form-group--text-idNum">
                        <label for="frmIdnum" class="main main--auth">
                          ID Number
                        </label>
                        <p class="text">{profile.Profile.idNumber}</p>
                      </div>
                      <div class="form-group form-group--text form-group--text-erc">
                        <label for="frmErc" class="main main--auth">
                          ERC20 Address
                        </label>
                        <p class="text">{profile.Profile.ethereumAddress}</p>
                      </div>
                      <div class="form-group form-group--text form-group--text-erc">
                        <label for="frmErc" class="main main--auth">
                          BITCOIN Address
                        </label>
                        <p class="text">{profile.Profile.bitcoinAddress}</p>
                      </div>
                      <div class="form-group form-group--file form-group--file-photoIdDocu help">
                        <label for="frmPhotoIdDocu" class="main main--auth">
                          Photo ID document
                        </label>
                        <p class="img">
                          <img src={profile.Profile.passport} />
                        </p>
                      </div>
                      <div class="form-group form-group--file form-group--file-addressProof">
                        <label for="frmAddressProof" class="main main--auth">
                          Address proof image
                        </label>
                        <p class="img">
                          <img src={profile.Profile.certificateResidence} />
                        </p>
                      </div>
                      <div class="form-group form-group--file form-group--file-selfyImage">
                        <label for="frmSelfyImage" class="main main--auth">
                          Selfy image
                        </label>
                        <p class="img">
                          <img src={profile.Profile.picture} />
                        </p>
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
                        <a>the AML Authentication</a>
                      </div>
                    </form>

                    <div class="l-sec sec_btnSet sec_btnSet-auth">
                      <NavLink to="/dashboard/profile/create-profile">
                        <div class="form-group form-group--btn form-group--btn-confirmation">
                          <input
                            class="btn btn--cl-1 btn--size-1"
                            type="button"
                            name="action"
                            value="Re Entry"
                          />
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        // User is logined in but has no profile
        profileContent = <div />;
      }
    }

    return <div>{profileContent}</div>;
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  changeEthreumAddress: PropTypes.func.isRequired,
  changeBitcoinAddress: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, changeEthreumAddress, changeBitcoinAddress, clearError }
)(withRouter(Profile));
