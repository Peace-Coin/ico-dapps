import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions/index';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import Spinner from '../UI/Spinner';

const popupStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
  }
};

const renderInput = field => (
  <div>
    <input
      {...field.input}
      type={field.type}
      autoComplete={field.autoComplete}
    />
    {field.meta.touched &&
      field.meta.error && <p className="iErr">{field.meta.error}</p>}
  </div>
);


class PasswordReset extends Component {

  constructor(props) {
    super(props);

    this.state = {

      modalIsOpen: true,
      loading: false,

      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {

    this.setState({ loading: false });

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors.validation });
    }
  }

  handleFormSubmit({ email }) {

    this.setState({ loading: true });
    this.setState({ errors: {} });

    this.props.resetPassword({ email });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return <div>{this.props.errorMessage}</div>;
    }
  }

  //常にモーダルのため下記は側のみ
  openModal() {}
  afterOpenModal() {}
  closeModal() {}


  render() {
    const { handleSubmit } = this.props;

    var errors;

    if(this.props.auth != undefined && this.props.auth.error != undefined && this.props.auth.error.validation){

      errors = this.props.auth.error.validation;

    }else{

      errors = {
        email: '',
      }
    }

    const loading = this.state.loading;

    let content;

    if (loading) {

      content = <Spinner />;

    }else{

      content = (
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={popupStyles}
          contentLabel="Password Reset"
        >
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div class="modaal-wrapper modaal-inline   l-content l-content--form l-content--form-login l-content--form-modal themeB" id="modaal_15286435881781cc0eb068ee37">
            <div class="modaal-outer-wrapper">
              <div class="modaal-inner-wrapper">
                <div class="modaal-container">
                  <div class="modaal-content modaal-focus" aria-hidden="false" aria-label="Dialog Window (Press escape to close)" role="dialog" tabindex="0">
                    <div class="modaal-content-container">

                      <h3 class="title_content title_content__a title_content__a-modal title_content-smartContract">
                        Reset password
                      </h3>

                      <div style={{height: '15px'}}></div>
                      <div style={{height: '15px'}}></div>

                      <form id="form_login">
                        <div class="form-group form-group--text form-group--text-email"> <label for="frmEmail_login" class="main">Your Email<span class="required obj-required">*</span></label>
                          <Field
                            className="theme-is-err"
                            name="email"
                            type="email"
                            component={renderInput}
                            autoComplete="email"
                          />
                          <p class="iErr">{errors.email}</p>
                          <p class="text-help">Help text....</p>
                        </div>

                        <div class="l-sec sec_btnSet sec_btnSet--modal sec_btnSet--modal-register">
                          <div class="form-group form-group--btn form-group--btn-signUp">
                            <button class="btn btn--cl-1 btn--size-1" type="submit" name="action" >Reset</button>
                          </div>
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
      );
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errorMessage: state.auth.error,
  errors: state.errors,
});

// https://redux-form.com/7.2.0/docs/api/field.md/#2-a-stateless-function
export default compose(
  reduxForm({
    form: 'reset',
    fields: ['email']
  }),
  connect(mapStateToProps, actions)
)(PasswordReset);
