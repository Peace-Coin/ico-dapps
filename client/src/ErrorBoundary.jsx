import React from "react";
import PropTypes from "prop-types";
import axios from './shared/axios';
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

export default class ErrorBoundary extends React.Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ]).isRequired,
    render: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      modalIsOpen: true,
    };

    this.openModal = this.openModal.bind(this);
    this.afterModal = this.afterModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterModal() {}

  closeModal() {

    this.setState({ modalIsOpen: false });
    this.props.history.push('/signin');
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error, errorInfo });


    axios.post('/api/users/send/error', {
      err: String(error),
      info: JSON.stringify(errorInfo),
    }).then(res => {

      console.log('send mail success')

    }).catch(err => {

      console.log('send mail error')
      console.log(err)
    });

    // if we have Bugsnag in this environment, we can notify our error tracker
    if (window.Bugsnag) {
      window.Bugsnag.notify(error);
    }
  }

  render() {
    if (this.state.hasError) {
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
                        An error occurred in this system
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      );
    }
    return this.props.children;
  }
}
