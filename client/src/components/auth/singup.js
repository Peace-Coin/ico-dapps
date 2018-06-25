import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/index';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import CheckBoxGroup from '../UI/CheckBoxGroup';
import Spinner from '../UI/Spinner';
import Terms from './Terms';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    maxWidth: '462px',
    width: '95%',
    padding: '0px'
  }
};

const popupStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '0px'
  }
};

const popupStyles2 = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    maxWidth: '462px',
    width: '95%',
    padding: '0px'
  }
};

const renderInput = field => (
  <span>
    <input
      {...field.input}
      type={field.type}
      autoComplete={field.autoComplete}
    />
    {field.meta.touched &&
      field.meta.error && <p className="iErr">{field.meta.error}</p>}
  </span>
);

const renderTermInput = field => (

  <span>

    <input
      {...field.input}
      type={field.type}
      autoComplete={field.autoComplete}
    />
  </span>
);

const renderTermError= field => (

  <span>
    {field.meta.touched &&
      field.meta.error && <p className="iErr">{field.meta.error}</p>}
  </span>
);

class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {

      modalIsOpen: true,
      amlIsOpen: false,
      termCheckedFlg: false,
      errors: {},
      loading: false,
    };

    this.openAmlModal = this.openAmlModal.bind(this);
    this.afterAmlModal = this.afterAmlModal.bind(this);
    this.closeAmlModal = this.closeAmlModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    this.setState({ loading: false });

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors.validation });
    }
  }

  onChangeCheckBoxTerm(e) {

    if(this.state.term === 'true'){

      this.setState({ [e.target.name]: '' });
      this.setState({ termCheckedFlg: 'false' });

    }else{

      this.setState({ [e.target.name]: 'true' });
      this.setState({ termCheckedFlg: 'true' });
    }
  }

  openAmlModal() {

    this.setState({amlIsOpen: true});
    this.setState({modalIsOpen: false});
  }

  afterAmlModal() {

  }

  closeAmlModal() {
    this.setState({amlIsOpen: false});
    this.setState({modalIsOpen: true});
  }

  //常にモーダルのため下記は側のみ
  openModal() {}
  afterOpenModal() {}
  closeModal() {}

  handleFormSubmit(formProps) {

    this.setState({ loading: true });

    this.setState({ errors: {} });

    // Call action creator to sign up the user
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div>{this.props.errorMessage}</div>;
    }
  }

  render() {
    const { handleSubmit } = this.props;

    var errors;

    if(this.props.auth != undefined && this.props.auth.error != undefined && this.props.auth.error.validation){

      errors = this.props.auth.error.validation;

    }else{

      errors = {
        email: '',
        password: '',
        passwordConfirm: '',
        term: '',
      }
    }

    const loading = this.state.loading;

    let content;

    if (loading) {

      content = <Spinner />;

    }else{

      content = (
        <div>
        <Modal
          isOpen={this.state.amlIsOpen}
          onAfterOpen={this.afterAmlModal}
          onRequestClose={this.closeAmlModal}
          style={customStyles}
          contentLabel="SmartContractAddressModal"
        >
          <div class="modaal-wrapper modaal-inline l-content_modal--smartContract themeB" id="modaal_152816659947189668a73f3483">
            <div class="modaal-outer-wrapper">
              <div class="modaal-inner-wrapper">
                <div class="modaal-container">
                  <div class="modaal-content modaal-focus" aria-hidden="false" aria-label="Dialog Window (Press escape to close)" role="dialog" tabindex="0">
                    <div class="modaal-content-container">
                      <Terms />
                    </div>
                  </div>
                  <button onClick={this.closeAmlModal} type="button" class="modaal-close" id="modaal-close" aria-label="Close (Press escape to close)">
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={popupStyles2}
          contentLabel="Sign up"
        >
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div class="modaal-wrapper modaal-inline   l-content l-content--form l-content--form-register l-content--form-modal themeB" id="modaal_152864358817778f57479f2962">
          <div class="modaal-outer-wrapper">
            <div class="modaal-inner-wrapper">
              <div class="modaal-container">
                <div class="modaal-content modaal-focus" aria-hidden="false" aria-label="Dialog Window (Press escape to close)" role="dialog" tabindex="0">
                  <div class="modaal-content-container">
                    <div class="header clearfix">
                      <h2 class="tab_content title_content title_content__a title_content__a-modal title_content-register">Register</h2>
                      <NavLink to="/signin">
                        <a href="#modal--login" class="tab_content modallink-login" data-modaal-scope="modaal_15286435881781cc0eb068ee37">Login</a>
                      </NavLink>
                    </div>
                    <form id="form_register">
                      <div class="form-group form-group--text form-group--text-email"> <label for="frmEmail_register" class="main">Your Email<span class="required obj-required">*</span></label>
                        <Field
                          className="theme-is-err"
                          name="email"
                          component={renderInput}
                          type="email"
                          autoComplete="email"
                        />
                      <p class="iErr">{errors.email}</p>
                        <p class="text-help">Help text....</p>
                      </div>
                      <div class="form-group form-group--text form-group--text-password"> <label for="frmPassword1_register" class="main">Your password<span class="required obj-required">*</span></label>
                        <Field
                          className="theme-is-err"
                          name="password"
                          component={renderInput}
                          type="password"
                          autoComplete="new-password"
                        />
                        <p class="iErr">{errors.password}</p>
                        <p class="text-help">Help text....</p>
                      </div>
                      <div class="form-group form-group--text form-group--text-password2"> <label for="frmPassword2_register" class="main">password confirm<span class="required obj-required">*</span></label>
                        <Field
                          className="theme-is-err"
                          name="passwordConfirm"
                          component={renderInput}
                          type="password"
                          autoComplete="new-password"
                        />
                        <p class="iErr">{errors.passwordConfirm}</p>
                        <p class="text-help">Help text....</p>
                      </div>
                      <div class="form-group form-group--check form-group--check-term">
                        <Field
                          type="checkbox"
                          name="term"
                          component={renderTermInput}
                          value="true"
                          className="chkbox"
                          onClick={this.openAmlModal}
                        />
                        <label><span class="text-label">I agree to </span></label><a style={{cursor: 'pointer'}} onClick={this.openAmlModal} >the Terms of use <span class="required obj-required">*</span></a>
                        <Field
                          name="term"
                          component={renderTermError}
                        />
                        <p class="iErr">{errors.term}</p>
                        <p class="text-help">Help text....</p>
                      </div>
                      <div class="l-sec sec_btnSet sec_btnSet--modal sec_btnSet--modal-register">
                        <div class="form-group form-group--btn form-group--btn-signUp"> <button class="btn btn--cl-1 btn--size-1" type="submit" name="action" value="signUp">Sign up</button> </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </form>
        </Modal>
        </div>
      );
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

function validate(formProps) {

  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }
  if (!formProps.password) {
    errors.password = 'Please enter an password';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter an password confrimation';
  }
  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'password must match';
  }
  if (!formProps.term) {
    errors.term = 'Please check I agree the Terms of use';
  }

  return errors;
}

const mapStateToProps = state => ({
  auth: state.auth,
  errorMessage: state.auth.error,
  errors: state.errors,
});

export default compose(
  reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm', 'term'],
    validate: validate
  }),
  connect(mapStateToProps, actions)
)(Signup);
