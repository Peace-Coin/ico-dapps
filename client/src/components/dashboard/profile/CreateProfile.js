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
      aml: '',
      terms: '',
      errors: {},
      //アップロード後のファイル名
      uploadFileName1: '',
      uploadFileName2: '',
      uploadFileName3: '',
      //プレビュー画像
      uploadFileImage1: '',
      uploadFileImage2: '',
      uploadFileImage3: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadedPassport = this.uploadedPassport.bind(this);
    this.uploadedCertificateResidence = this.uploadedCertificateResidence.bind(this);
    this.uploadedPicture = this.uploadedPicture.bind(this);
    this.onChangeCheckBoxAml = this.onChangeCheckBoxAml.bind(this);
    this.onChangeCheckBoxTerms = this.onChangeCheckBoxTerms.bind(this);

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
            placeholder="*Date of birth"
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
