import React, { Component } from 'react';
//import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white'
  }
};

class CompleteProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: true,
    };

    this.openModal = this.openModal.bind(this);
    this.afterModal = this.afterModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const secretToken = this.props.match.params.id;
    this.props.verifyEmail(secretToken);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterModal() {}

  closeModal() {
    this.setState({ modalIsOpen: false });

    this.props.history.push('/dashboard/profile');
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="InfoModal"
        >
          <div
            class="modaal-wrapper modaal-inline l-content_modal--smartContract themeB"
            id="modaal_152816659947189668a73f3483"
          >
            <div class="modaal-outer-wrapper">
              <div class="modaal-inner-wrapper">
                <div class="modaal-container">
                  <div
                    class="modaal-content modaal-focus"
                    aria-hidden="false"
                    aria-label="Dialog Window (Press escape to close)"
                    role="dialog"
                    tabindex="0"
                  >
                    <div class="modaal-content-container">
                      <h3 class="title_content title_content__a title_content__a-modal title_content-smartContract">
                        Information
                      </h3>
                      <p class="text">
                        KYC/AML is Registration Complete.
                      </p>
                    </div>
                  </div>
                  <button
                    style={{ border: '1px solid grey' }}
                    onClick={this.closeModal}
                    type="button"
                    class="modaal-close"
                    id="modaal-close"
                    aria-label="Close (Press escape to close)"
                  >
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(CompleteProfile);
