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
import { createProfile } from '../../../actions/profileAction';
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

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      birth: '',
      country: '',
      passport: '',
      certificateResidence: '',
      picture: '',
      ethereumAddress: '',
      bitcoinAddress: '',
      aml: false,
      terms: false,
      errors: {},
      //アップロード後のファイル名
      uploadFileName1: '',
      uploadFileName2: '',
      uploadFileName3: '',
      //プレビュー画像
      uploadFileImage1: '',
      uploadFileImage2: '',
      uploadFileImage3: '',
      //ポップアップ状態
      modalIsOpen: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadedPassport = this.uploadedPassport.bind(this);
    this.uploadedCertificateResidence = this.uploadedCertificateResidence.bind(this);
    this.uploadedPicture = this.uploadedPicture.bind(this);
    this.onChangeCheckBoxAml = this.onChangeCheckBoxAml.bind(this);
    this.onChangeCheckBoxTerms = this.onChangeCheckBoxTerms.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {

  }

  closeModal() {
    this.setState({modalIsOpen: false});
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
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      birth: this.state.birth,
      country: this.state.country,
      passport: this.state.passport,
      certificateResidence: this.state.certificateResidence,
      picture: this.state.picture,
      ethereumAddress: this.state.ethereumAddress,
      aml: this.state.aml,
    };

    // Create Profile
    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeCheckBoxAml(e) {

    if(this.state.aml === ''){

      this.setState({ [e.target.name]: e.target.value });

    }else{

      if(this.state.aml === 'true'){

        this.setState({ [e.target.name]: 'false' });

      }else{

        this.setState({ [e.target.name]: 'true' });
      }
    }
  }

  onChangeCheckBoxTerms(e) {

    if(this.state.terms === ''){

      this.setState({ [e.target.name]: e.target.value });

    }else{

      if(this.state.terms === 'true'){

        this.setState({ [e.target.name]: 'false' });

      }else{

        this.setState({ [e.target.name]: 'true' });
      }
    }
  }

  //（ファイル選択）パスポートアップロードイベント
  uploadedPassport(e) {

    e.preventDefault();

    const { fields } = this.props;
    const files = [ ...e.target.files ];

    if (files[0].size > 1000000) {
      alert("passport image must be byte size less 10MB");
      return false;
    }

    //パス名を表示
    this.setState({ uploadFileName1: e.target.value});

    //ファイルをJson送信用にBASE64変換してFieldに設定
    var self = this;

    var fileReader = new FileReader();
    fileReader.onload = function(e) {

      var loadedImageUri = e.target.result;

      self.setState({ passport: loadedImageUri});
    }
    fileReader.readAsDataURL(files[0]);


    //プレビュー表示
    var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;
    var image_url = createObjectURL(files[0]);
    this.setState({uploadFileImage1: image_url});
  }

  //（ファイル選択）住所証明書アップロードイベント
  uploadedCertificateResidence(e) {

    e.preventDefault();

    const { fields } = this.props;
    const files = [ ...e.target.files ];

    if (files[0].size > 1000000) {
      alert("Certificate of Residence image must be byte size less 10MB");
      return false;
    }

    //パス名を表示
    this.setState({ uploadFileName2: e.target.value});

    var self = this;

    //ファイルをJson送信用にBASE64変換してFieldに設定
    const {dispatch, change, formValue} = this.props;
    var fileReader = new FileReader();
    fileReader.onload = function(e) {
      var loadedImageUri = e.target.result;

      self.setState({ certificateResidence: loadedImageUri});
    };
    fileReader.readAsDataURL(files[0]);

    //プレビュー表示
    var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;
    var image_url = createObjectURL(files[0]);
    this.setState({uploadFileImage2: image_url});
  }

  //（ファイル選択）自撮り写真アップロードイベント
  uploadedPicture(e) {

    e.preventDefault();

    const { fields } = this.props;
    const files = [ ...e.target.files ];

    if (files[0].size > 1000000) {
      alert("Picture image must be byte size less 10MB");
      return false;
    }

    //パス名を表示
    this.setState({ uploadFileName3: e.target.value});

    var self = this;

    //ファイルをJson送信用にBASE64変換してFieldに設定
    const {dispatch, change, formValue} = this.props;

    var fileReader = new FileReader();
    fileReader.onload = function(e) {
      var loadedImageUri = e.target.result;

      self.setState({ picture: loadedImageUri});
    };

    fileReader.readAsDataURL(files[0]);

    //プレビュー表示
    var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;
    var image_url = createObjectURL(files[0]);
    this.setState({uploadFileImage3: image_url});
  }

  render() {

    const renderHiddenInput = field => (
      <div>
        <input
          value={field.value}
          type={field.type}
        />
      </div>
    );

    var { errors } = this.state;

    if(errors == undefined){

      errors = {
        firstName: '',
        lastName: '',
        address: '',
        birth: '',
        country: '',
        passport: '',
        certificateResidence: '',
        picture: '',
        ethereumAddress: '',
        bitcoinAddress: '',
        aml: '',
        terms: '',
      }
    }

    return (
      <div id="mainContent" role="main">
            <div id="pageContent">
              <div class="l-sec sec_auth">
                <h1 class="title_sec title_sec__a title_sec-auth">Authenticate</h1>
                <div class="l-content l-content--navi l-content--navi-auth themeA clearfix"><span class="step step--text now">Input</span><span class="step step--obj"><i class="fa fa-angle-right" aria-hidden="true"></i></span><span class="step step--text">Confirmation</span><span class="step step--obj"><i class="fa fa-angle-right" aria-hidden="true"></i></span><span class="step step--text">Complete</span></div>
                <div class="l-content l-content--form l-content--form-auth">
                  <form id="form_auth" onSubmit={this.onSubmit}>
                    <div class="form-group form-group--text form-group--text-name">
                      <label for="frmName1" class="main main--auth">Name<span class="required obj-required">*</span></label>
                      <div class="input-wrap clearfix">
                        <TextFieldGroup
                          className="theme-is-err half"
                          placeholder="First Name"
                          name="frmNamel"
                          id="frmName1"
                          value={this.state.firstName}
                          onChange={this.onChange}
                        />
                        <TextFieldGroup
                          className="theme-is-err half"
                          placeholder="Last Name"
                          name="frmName2"
                          id="frmName2"
                          value={this.state.lastName}
                          onChange={this.onChange}
                        />
                      </div>
                      <p className="iErr">{errors.firstName}</p>
                      <p className="iErr">{errors.lastName}</p>
                      <p class="text-help">Help text....</p>
                    </div>
                    <div class="form-group form-group--radio form-group--radio-gender">
                      <label for="" class="main main--auth">Gender</label>
                      <label class="radio"><input name="frmGender" value="male" type="radio" /><span class="fa-stack" aria-hidden="true"><i class="fa fa-circle fa-stack-1x" aria-hidden="true"></i><i class="fa fa-circle-o fa-stack-1x" aria-hidden="true"></i></span><span class="text-label">Male</span></label>
                      <label class="radio"><input name="frmGender" value="female" type="radio" /><span class="fa-stack" aria-hidden="true"><i class="fa fa-circle fa-stack-1x" aria-hidden="true"></i><i class="fa fa-circle-o fa-stack-1x" aria-hidden="true"></i></span><span class="text-label">Female</span></label>
                      <label class="radio"><input name="frmGender" value="other" type="radio" /><span class="fa-stack" aria-hidden="true"><i class="fa fa-circle fa-stack-1x" aria-hidden="true"></i><i class="fa fa-circle-o fa-stack-1x" aria-hidden="true"></i></span><span class="text-label">Other</span></label>
                      <p class="text-err theme-is-err">Error message</p>
                      <p class="text-help">Help text....</p>
                    </div>
                    <div class="form-group form-group--text form-group--text-birthday">
                      <label for="frmBirthday" class="main main--auth">Birthday<span class="required obj-required">*</span></label>
                      <TextFieldGroup
                        className="theme-is-err"
                        id="frmBirthday"
                        placeholder="MM-DD-YYYY"
                        name="frmBirthday"
                        value={this.state.birth}
                        onChange={this.onChange}
                      />
                      <p class="iErr">{errors.birth}</p>
                      <p class="text-help">Help text....</p>
                    </div>
                    <div class="form-group form-group--text form-group--text-streetaddress">
                      <label for="frmStreetaddress" class="main main--auth">Street Address<span class="required obj-required">*</span></label>
                      <TextFieldGroup
                        className="theme-is-err"
                        id="frmStreetaddress"
                        placeholder=""
                        name="frmStreetaddress"
                        value={this.state.streetAddress}
                        onChange={this.onChange}
                      />
                      <p class="iErr">{errors.streetAddress}</p>
                      <p class="text-help">Help text....</p>
                    </div>
                    <div class="form-group form-group--text form-group--text-city">
                      <label for="frmCity" class="main main--auth">City<span class="required obj-required">*</span></label>
                      <TextFieldGroup
                        className="theme-is-err"
                        id="frmCity"
                        placeholder=""
                        name="frmCity"
                        value={this.state.cityAddress}
                        onChange={this.onChange}
                      />
                      <p class="iErr">{errors.cityAddress}</p>
                      <p class="text-help">Help text....</p>
                    </div>
                    <div class="form-group form-group--text form-group--text-postalCode">
                      <label for="frmPostalCode" class="main main--auth">Postal Code</label>
                      <TextFieldGroup
                        className="theme-is-err"
                        id="frmPostalCode"
                        placeholder=""
                        name="frmPostalCode"
                        value={this.state.postalCode}
                        onChange={this.onChange}
                      />
                      <p class="iErr">{errors.postalCode}</p>
                      <p class="text-help">Help text....</p>
                    </div>
                    <div class="form-group form-group--select form-group--select-country">
                      <label for="frmCountry" class="main main--auth">Country</label>
                      <div class="select-wrap">
                        <SelectListGroupOfCountry
                          className="theme-is-err"

                          value={this.state.country}
                          onChange={this.onChange}
                        />
                      </div>
                      <p class="iErr">{errors.country}</p>
                      <p class="text-help">Help text....</p>
                    </div>
                    <div class="form-group form-group--select form-group--text form-group--select-phone form-group--text-phone">
                      <label for="frmPhone1" class="main main--auth">Phone Number</label>
                      <div class="select-wrap">
                        <SelectListGroup
                          className="theme-is-err"
                          name="frmPhone1"
                          id="frmPhone1"
                          value={this.state.phoneNumber1}
                          onChange={this.onChange}
                        />
                      </div>
                      <TextFieldGroup
                        className="theme-is-err"
                        id="frmPhone2"
                        placeholder=""
                        name="frmPhone2"
                        value={this.state.phoneNumber2}
                        onChange={this.onChange}
                      />
                      <p class="iErr">{errors.phoneNumber1}</p>
                      <p class="iErr">{errors.phoneNumber2}</p>
                      <p class="text-help">Help text....</p>
                    </div>
                    <div class="form-group form-group--text form-group--text-idNum">
                      <label for="frmIdnum" class="main main--auth">ID Number<span class="required obj-required">*</span></label>
                      <TextFieldGroup
                        className="theme-is-err"
                        id="frmIdnum"
                        placeholder=""
                        name="frmIdnum"
                        value={this.state.idNumber}
                        onChange={this.onChange}
                      />
                      <p class="iErr">{errors.idNumber}</p>
                      <p class="text-help">Help text....</p>
                    </div>
                    <div class="form-group form-group--text form-group--text-erc">
                      <label for="frmErc" class="main main--auth">ERC20 Address<span class="required obj-required">*</span></label>
                      <TextFieldGroup
                        className="theme-is-err"
                        id="frmErc"
                        placeholder=""
                        name="frmErc"
                        value={this.state.ethreumAddress}
                        onChange={this.onChange}
                      />
                      <p class="iErr">{errors.ethreumAddress}</p>
                      <p class="text-help">Help text....</p>
                    </div>
                    <div class="form-group form-group--text form-group--text-erc">
                      <label for="frmErc" class="main main--auth">BITCOIN Address</label>
                      <TextFieldGroup
                        className="theme-is-err"
                        id="frmBit"
                        placeholder=""
                        name="frmBit"
                        value={this.state.bitcoinAddress}
                        onChange={this.onChange}
                      />
                      <p class="iErr">{errors.bitcoinAddress}</p>
                      <p class="text-help">Help text....</p>
                    </div>
                    <div class="form-group form-group--file form-group--file-photoIdDocu help">
                      <label for="frmPhotoIdDocu" class="main main--auth">Photo ID document<span class="required obj-required">*</span></label>
                      <div class="file-wrap theme-is-err">
                        <img src={this.state.uploadFileImage1} />
                        <FileFieldGroup
                          placeholder=""
                          accept=".jpg, .jpeg, .png"
                          onChange={this.uploadedPassport}
                          name="frmPhotoIdDocu"
                          id="frmPhotoIdDocu"
                        />
                      </div>
                      <p class="iErr">{errors.passport}</p>
                      <p class="text-help">ex.Passport, Driver’s license</p>
                    </div>
                    <div class="form-group form-group--file form-group--file-addressProof">
                      <label for="frmAddressProof" class="main main--auth">Address proof image<span class="required obj-required">*</span></label>
                      <div class="file-wrap theme-is-err">
                        <img src={this.state.uploadFileImage2} />
                        <FileFieldGroup
                          placeholder=""
                          accept=".jpg, .jpeg, .png"
                          onChange={this.uploadedCertificateResidence}
                          name="frmAddressProof"
                          id="frmAddressProof"
                        />
                      </div>
                      <p class="iErr">{errors.certificateResidence}</p>
                      <p class="text-help">Help text....</p>
                    </div>
                    <div class="form-group form-group--file form-group--file-selfyImage">
                      <label for="frmSelfyImage" class="main main--auth">Selfy image<span class="required obj-required">*</span></label>
                      <div class="file-wrap theme-is-err">
                        <img src={this.state.uploadFileImage3} />
                        <FileFieldGroup
                          placeholder=""
                          accept=".jpg, .jpeg, .png"
                          onChange={this.uploadedPicture}
                          name="frmSelfyImage"
                          id="frmSelfyImage"
                        />
                      </div>
                      <p class="iErr">{errors.picture}</p>
                      <p class="text-help">Help text....</p>
                    </div>
                    <div class="form-group form-group--check form-group--check-aml">
                      <label>
                        <CheckBoxGroup
                          name="aml"
                          value="true"
                          onChange={this.onChangeCheckBoxAml}
                          className="theme-is-err"
                        />
                        <span class="faSet">
                          <span class="fa fa-check-square check" aria-hidden="true"></span>
                          <span class="fa fa-square no-check" aria-hidden="true"></span>
                        </span>
                        <span class="text-label">I agree to </span>
                      </label>
                      <a href="">the AML Authentication</a>
                      <p className="iErr">{errors.aml}</p>
                      <p class="text-help">Help text....</p>
                    </div>

                    <div class="l-sec sec_btnSet sec_btnSet-auth">
                      <div class="form-group form-group--btn form-group--btn-confirmation">
                        <button class="btn btn--cl-1 btn--size-1" type="submit" name="action" value="Confirmation">Confirmation</button>
                      </div>
                    </div>
                    <input
                      type="hidden"
                      name="passport"
                      value={this.state.passport}
                    />
                    <input
                      type="hidden"
                      name="certificateResidence"
                      value={this.state.certificateResidence}
                    />
                    <input
                      type="hidden"
                      name="picture"
                      value={this.state.picture}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>


    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
