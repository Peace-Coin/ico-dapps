import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lottery from '../ico-comps/Lottery';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import Ethereum from './ethereum/Ethereum';

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

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ethereumModalIsOpen: false,
      bitcoinModalIsOpen: false,
    };

    this.openEthereumModal = this.openEthereumModal.bind(this);
    this.afterEthereumOpenModal = this.afterEthereumOpenModal.bind(this);
    this.closeEthereumModal = this.closeEthereumModal.bind(this);

    this.openBitcoinModal = this.openBitcoinModal.bind(this);
    this.afterBitcoinOpenModal = this.afterBitcoinOpenModal.bind(this);
    this.closeBitcoinModal = this.closeBitcoinModal.bind(this);
  }

  openEthereumModal() {
    this.setState({ethereumModalIsOpen: true});
  }

  afterEthereumOpenModal() {

  }

  closeEthereumModal() {
    this.setState({ethereumModalIsOpen: false});
  }

  openBitcoinModal() {
    this.setState({bitcoinModalIsOpen: true});
  }

  afterBitcoinOpenModal() {

  }

  closeBitcoinModal() {
    this.setState({bitcoinModalIsOpen: false});
  }

  render() {
    return (
      <div>
        <div>
          <p>Dashboard</p>
          <Link to="/dashboard/profile">profile page</Link>
          <br /><input type="button" value="ETHEREUM" onClick={this.openEthereumModal} />
          <br /><input type="button" value="BITCOIN" onClick={this.openBitcoinModal} />
        </div>
        <div>
          <Modal
            isOpen={this.state.ethereumModalIsOpen}
            onAfterOpen={this.afterEthereumOpenModal}
            onRequestClose={this.closeEthereumModal}
            style={customStyles}
            contentLabel="ETHEREUM"
          >
            <Ethereum ref="child" />
          </Modal>
        </div>
        <div>
          <Modal
            isOpen={this.state.bitcoinModalIsOpen}
            onAfterOpen={this.afterBitcoinOpenModal}
            onRequestClose={this.closeBitcoinModal}
            style={customStyles}
            contentLabel="BITCOIN"
          >
            <div>
              <h3>1. head title</h3>

              <button onClick={this.closeBitcoinModal}>
                close
              </button>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Dashboard);
