import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { change } from 'redux-form';
import TextFieldGroup from '../../UI/TextFieldGroup';
import TextAreaFieldGroup from '../../UI/TextAreaFieldGroup';
import InputGroup from '../../UI/InputGroup';
import SelectListGroupOfCountry from '../../UI/SelectListGroupOfCountry';
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
      terms: this.state.terms,
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

    const { errors } = this.state;
    return (
      <div>
        <h1>Create Your KYC</h1>
        <p>Please, Please, Please, submit your Info</p>
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="*first name"
            name="firstName"
            value={this.state.firstName}
            onChange={this.onChange}
            error={errors.firstName}
            info="This is for first Name"
          />
          <TextFieldGroup
            placeholder="*last name"
            name="lastName"
            value={this.state.lastName}
            onChange={this.onChange}
            error={errors.lastName}
            info="This is for last Name"
          />
          <TextFieldGroup
            placeholder="*address"
            name="address"
            value={this.state.address}
            onChange={this.onChange}
            error={errors.address}
            info="This is for address"
          />
          <TextFieldGroup
            placeholder="*YYYY-MM-DD"
            name="birth"
            value={this.state.birth}
            onChange={this.onChange}
            error={errors.birth}
            info="This is for Date of birth"
          />
          <SelectListGroupOfCountry
            name="country"
            value={this.state.country}
            onChange={this.onChange}
            error={errors.country}
            info="This is for country"
          />
          <img src={this.state.uploadFileImage1} />
          <FileFieldGroup
            placeholder="*passport"
            accept=".jpg, .jpeg, .png"
            onChange={this.uploadedPassport}
            error={errors.passport}
            info="This is for Passport"
          />
          <img src={this.state.uploadFileImage2} />
          <FileFieldGroup
            placeholder="*Certificate of Residence"
            accept=".jpg, .jpeg, .png"
            onChange={this.uploadedCertificateResidence}
            error={errors.certificateResidence}
            info="This is for Certificate of Residence"
          />
          <img src={this.state.uploadFileImage3} />
          <FileFieldGroup
            placeholder="*picture"
            accept=".jpg, .jpeg, .png"
            onChange={this.uploadedPicture}
            error={errors.picture}
            info="This is for your picture"
          />
          <TextFieldGroup
            placeholder="*ethereumAddress"
            name="ethereumAddress"
            value={this.state.ethereumAddress}
            onChange={this.onChange}
            error={errors.ethereumAddress}
            info="This is for ethereumAddress"
          />
          <CheckBoxGroup
            name="aml"
            value="true"
            onChange={this.onChangeCheckBoxAml}
            error={errors.aml}
            info="AML(anti-money laundering)?"
          />
        <input type="button" value="confirm terms" onClick={this.openModal} />
          <CheckBoxGroup
            name="terms"
            value="true"
            onChange={this.onChangeCheckBoxTerms}
            error={errors.terms}
            info="We confirmed PiaceCoin Terms"
          />
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
          <small>* is required</small>
          <br />
          <input type="submit" value="Starting Confirm !" />
        </form>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Terms"
        >
          <div>
            <h3>1. head title</h3>
            <table>
              <tbody>
              <tr>
                <td>
                  <label>1.1 aaaa</label>
                </td>
                <td>
                  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                </td>
              </tr>
              </tbody>
            </table>
            <button onClick={this.closeModal}>
              close
            </button>
          </div>
        </Modal>
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
