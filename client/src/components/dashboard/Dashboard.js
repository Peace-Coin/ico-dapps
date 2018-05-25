import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lottery from '../ico-comps/Lottery';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import Ethereum from './ethereum/Ethereum';
import { getCurrentProfile } from '../../actions/profileAction';
import TestContract from '../ico-comps/TestContract';
import PurchaseHistory from './ethereum/PurchaseHistory';

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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ethereumModalIsOpen: false,
      bitcoinModalIsOpen: false,
      smartContractAddressIsOpen: false
    };

    this.openEthereumModal = this.openEthereumModal.bind(this);
    this.afterEthereumOpenModal = this.afterEthereumOpenModal.bind(this);
    this.closeEthereumModal = this.closeEthereumModal.bind(this);

    this.openBitcoinModal = this.openBitcoinModal.bind(this);
    this.afterBitcoinOpenModal = this.afterBitcoinOpenModal.bind(this);
    this.closeBitcoinModal = this.closeBitcoinModal.bind(this);

    this.openSmartContractAddressModal = this.openSmartContractAddressModal.bind(
      this
    );
    this.afterSmartContractAddressOpenModal = this.afterSmartContractAddressOpenModal.bind(
      this
    );
    this.closeSmartContractAddressModal = this.closeSmartContractAddressModal.bind(
      this
    );
  }

  // componentDidMount() {
  //   this.props.getCurrentProfile();
  // }

  openEthereumModal() {
    this.setState({ ethereumModalIsOpen: true });
  }

  afterEthereumOpenModal() {}

  closeEthereumModal() {
    this.setState({ ethereumModalIsOpen: false });
  }

  openBitcoinModal() {
    this.setState({ bitcoinModalIsOpen: true });
  }

  afterBitcoinOpenModal() {}

  closeBitcoinModal() {
    this.setState({ bitcoinModalIsOpen: false });
  }

  openSmartContractAddressModal() {
    this.setState({ smartContractAddressIsOpen: true });
  }

  afterSmartContractAddressOpenModal() {}

  closeSmartContractAddressModal() {
    this.setState({ smartContractAddressIsOpen: false });
  }

  render() {
    return (
      <body class="peaceCoinIco dashboard">
        <div>
          <div>
            <br />
            <input
              type="button"
              value="Smart Contract Address"
              onClick={this.openSmartContractAddressModal}
            />
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

                <button onClick={this.closeBitcoinModal}>close</button>
              </div>
            </Modal>
          </div>
          <div>
            <Modal
              isOpen={this.state.smartContractAddressIsOpen}
              onAfterOpen={this.afterSmartContractAddressOpenModal}
              onRequestClose={this.closeSmartContractAddressModal}
              style={customStyles}
              contentLabel="SmartContractAddressModal"
            >
              <div>
                <h3>1. head title</h3>

                <button onClick={this.closeSmartContractAddressModal}>
                  close
                </button>
              </div>
            </Modal>
          </div>

          <div id="mainContent" role="main">
            <div id="pageContent">
              <div class="l-sec sec_token">
                <h2 class="title_sec title_sec__a title_sec-token">Token</h2>
                <div class="l-content l-content--token theme-bgA">
                  <p class="content__main">
                    <span class="coin coin-pce">
                      <span class="num coin__num">5,200</span>
                      <span class="unit coin__unit">PCE</span>
                    </span>
                  </p>
                  <p class="content__sub cl_themeA-2">
                    <span class="coin coin-eth">
                      <span class="num coin__num">5,200</span>
                      <span class="unit coin__unit">ETH</span>
                    </span>
                    <span class="coin coin-btc">
                      <span class="num coin__num">5,761</span>
                      <span class="unit coin__unit">BTC</span>
                    </span>
                    <span class="coin coin-usd">
                      <span class="num coin__num">5,761</span>
                      <span class="unit coin__unit">USD</span>
                    </span>
                  </p>
                </div>
                <div class="l-content--buybtnSet clearfix">
                  <div
                    onClick={this.openEthereumModal}
                    class="l-content--buybtnSet__item l-content--buybtnSet__item-L borderBox"
                  >
                    <div class="btn btn--cl-1 btn--size-1">
                      <svg class="ico-svg ethereum">
                        <use xlinkHref="/symbol-defs.svg#icon-ethereum" />
                      </svg>
                      <span class="text">Ethereum</span>
                    </div>
                  </div>
                  <div
                    onClick={this.openBitcoinModal}
                    class="l-content--buybtnSet__item l-content--buybtnSet__item-R borderBox"
                  >
                    <div class="btn btn--cl-1 btn--size-1">
                      <svg class="ico-svg bitcoin">
                        <use xlinkHref="/symbol-defs.svg#icon-bitcoin" />
                      </svg>
                      <span class="text">Bitcoin</span>
                    </div>
                  </div>
                </div>
                <div class="l-content--right">
                  <div class="l-content--currentprice">
                    <h3 class="title_content title_content__a title_content-currentprice">
                      Current price
                    </h3>
                    <p class="content__main content__main-currentprice">
                      <span class="coin coin-eth">
                        <span class="num coin__num">1</span>
                        <span class="unit coin__unit">ETH</span>
                      </span>{' '}
                      ={' '}
                      <span class="coin coin-pce">
                        <span class="num coin__num">9,052</span>
                        <span class="unit coin__unit">PCE</span>
                      </span>
                    </p>
                  </div>
                  <div class="l-content--increases">
                    <h3 class="title_content title_content__a title_content-increases">
                      Price increases in
                    </h3>
                    <div
                      id="timeCount"
                      class="content__main timer clearfix is-countdown"
                    >
                      <div class="theme-bgA timer__item timer__item-day is-hide">
                        <span class="num">11904</span>
                        <span class="unit">Days</span>
                      </div>
                      <div class="theme-bgA timer__item timer__item-h">
                        <span class="num">19</span>
                        <span class="unit cl_themeA-2">Hours</span>
                      </div>
                      <div class="theme-bgA timer__item timer__item-m">
                        <span class="num">05</span>
                        <span class="unit cl_themeA-2">Minutes</span>
                      </div>
                      <div class="theme-bgA timer__item timer__item-s">
                        <span class="num">23</span>
                        <span class="unit cl_themeA-2">Seconds</span>
                      </div>
                    </div>
                  </div>
                  <div class="l-content--raised">
                    <h3 class="title_content title_content__a title_content-raised">
                      Raised
                    </h3>
                    <p class="content__main content__main-raised">
                      <span class="coin coin-usd">
                        <span class="unit coin__unit">$</span>
                        <span class="num coin__num">3,512,786.37</span>
                      </span>
                    </p>
                    <p class="content__sub content__sub-raised">
                      <span class="coin coin-eth">
                        <span class="num coin__num">3,512,786.37</span>
                        <span class="unit coin__unit">ETH</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div class="l-sec sec_transactions">
                <h2 class="title_sec title_sec__a title_sec-transactions">
                  Transactions
                </h2>
                <div class="l-content l-content--transactionsList">
                  <div class="info clearfix">
                    <p class="transactions--item__label" />
                    <p class="transactions--item__hash">Hash Address</p>
                    <p class="transactions--item__datetime">Data time</p>
                    <p class="transactions--item__price">Price</p>
                    <p class="transactions--item__status">Status</p>
                  </div>
                  <ul class="list_transactions">
                    <li class="list_transactions--item theme-bgA unconfirmed clearfix">
                      <p class="transactions--item__hash">
                        20x4e3b03ebace6ab7db1e944dc73680x4e3b03ebace6ab7db1e944dc7368
                      </p>
                      <p class="transactions--item__datetime">
                        <span class="date">2018/01/18</span>
                        <span class="time cl_themeA-2">00:10:32</span>
                      </p>
                      <p class="transactions--item__price">
                        <span class="coin coin-pce">
                          <span class="num coin__num">127</span>
                          <span class="unit coin__unit">PCE</span>
                        </span>
                        <span class="coin coin-usd cl_themeA-2">
                          <span class="unit coin__unit">$</span>
                          <span class="num coin__num">181.61</span>
                        </span>
                      </p>
                      <p class="transactions--item__status">
                        <span class="status">
                          <span class="label" />
                          <span class="text">UNCONFIRMED</span>
                        </span>
                        <span class="confirmations cl_themeA-2">
                          <span class="num">521</span>
                          <span class="unit">Confirmations</span>
                        </span>
                      </p>
                    </li>
                    <li class="list_transactions--item theme-bgA canceled clearfix">
                      <p class="transactions--item__hash">
                        20x4e3b03ebace6ab7db1e944dc73680x4e3b03ebace6ab7db1e944dc7368
                      </p>
                      <p class="transactions--item__datetime">
                        <span class="date">2018/01/18</span>
                        <span class="time cl_themeA-2">00:10:32</span>
                      </p>
                      <p class="transactions--item__price">
                        <span class="coin coin-pce">
                          <span class="num coin__num">127</span>
                          <span class="unit coin__unit">PCE</span>
                        </span>
                        <span class="coin coin-usd cl_themeA-2">
                          <span class="unit coin__unit">$</span>
                          <span class="num coin__num">181.61</span>
                        </span>
                      </p>
                      <p class="transactions--item__status">
                        <span class="status">
                          <span class="label" />
                          <span class="text">CANCELED</span>
                        </span>
                        <span class="confirmations cl_themeA-2">
                          <span class="num">521</span>
                          <span class="unit">Confirmations</span>
                        </span>
                      </p>
                    </li>
                    <li class="list_transactions--item theme-bgA unconfirmed clearfix">
                      <p class="transactions--item__hash">
                        20x4e3b03ebace6ab7db1e944dc73680x4e3b03ebace6ab7db1e944dc7368
                      </p>
                      <p class="transactions--item__datetime">
                        <span class="date">2018/01/18</span>
                        <span class="time cl_themeA-2">00:10:32</span>
                      </p>
                      <p class="transactions--item__price">
                        <span class="coin coin-pce">
                          <span class="num coin__num">127</span>
                          <span class="unit coin__unit">PCE</span>
                        </span>
                        <span class="coin coin-usd cl_themeA-2">
                          <span class="unit coin__unit">$</span>
                          <span class="num coin__num">181.61</span>
                        </span>
                      </p>
                      <p class="transactions--item__status">
                        <span class="status">
                          <span class="label" />
                          <span class="text">UNCONFIRMED</span>
                        </span>
                        <span class="confirmations cl_themeA-2">
                          <span class="num">521</span>
                          <span class="unit">Confirmations</span>
                        </span>
                      </p>
                    </li>
                    <li class="list_transactions--item theme-bgA completed clearfix">
                      <p class="transactions--item__hash">
                        20x4e3b03ebace6ab7db1e944dc73680x4e3b03ebace6ab7db1e944dc7368
                      </p>
                      <p class="transactions--item__datetime">
                        <span class="date">2018/01/18</span>
                        <span class="time cl_themeA-2">00:10:32</span>
                      </p>
                      <p class="transactions--item__price">
                        <span class="coin coin-pce">
                          <span class="num coin__num">127</span>
                          <span class="unit coin__unit">PCE</span>
                        </span>
                        <span class="coin coin-usd cl_themeA-2">
                          <span class="unit coin__unit">$</span>
                          <span class="num coin__num">181.61</span>
                        </span>
                      </p>
                      <p class="transactions--item__status">
                        <span class="status">
                          <span class="label" />
                          <span class="text">COMPLETED</span>
                        </span>
                        <span class="confirmations cl_themeA-2">
                          <span class="num">521</span>
                          <span class="unit">Confirmations</span>
                        </span>
                      </p>
                    </li>
                    <li class="list_transactions--item theme-bgA completed clearfix">
                      <p class="transactions--item__hash">
                        20x4e3b03ebace6ab7db1e944dc73680x4e3b03ebace6ab7db1e944dc7368
                      </p>
                      <p class="transactions--item__datetime">
                        <span class="date">2018/01/18</span>
                        <span class="time cl_themeA-2">00:10:32</span>
                      </p>
                      <p class="transactions--item__price">
                        <span class="coin coin-pce">
                          <span class="num coin__num">127</span>
                          <span class="unit coin__unit">PCE</span>
                        </span>
                        <span class="coin coin-usd cl_themeA-2">
                          <span class="unit coin__unit">$</span>
                          <span class="num coin__num">181.61</span>
                        </span>
                      </p>
                      <p class="transactions--item__status">
                        <span class="status">
                          <span class="label" />
                          <span class="text">COMPLETED</span>
                        </span>
                        <span class="confirmations cl_themeA-2">
                          <span class="num">521</span>
                          <span class="unit">Confirmations</span>
                        </span>
                      </p>
                    </li>
                    <li class="list_transactions--item theme-bgA unconfirmed clearfix">
                      <p class="transactions--item__hash">
                        20x4e3b03ebace6ab7db1e944dc73680x4e3b03ebace6ab7db1e944dc7368
                      </p>
                      <p class="transactions--item__datetime">
                        <span class="date">2018/01/18</span>
                        <span class="time cl_themeA-2">00:10:32</span>
                      </p>
                      <p class="transactions--item__price">
                        <span class="coin coin-pce">
                          <span class="num coin__num">127</span>
                          <span class="unit coin__unit">PCE</span>
                        </span>
                        <span class="coin coin-usd cl_themeA-2">
                          <span class="unit coin__unit">$</span>
                          <span class="num coin__num">181.61</span>
                        </span>
                      </p>
                      <p class="transactions--item__status">
                        <span class="status">
                          <span class="label" />
                          <span class="text">UNCONFIRMED</span>
                        </span>
                        <span class="confirmations cl_themeA-2">
                          <span class="num">521</span>
                          <span class="unit">Confirmations</span>
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>
                <div class="l-content l-content-transactionsAmount">
                  <h3 class="title_content title_content__a title_content-transactionsAmount">
                    Amount
                  </h3>
                  <p class="content__main">
                    <span class="coin coin-pce">
                      <span class="num coin__num">253,500</span>
                      <span class="unit coin__unit">PCE</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <TestContract />
        </div>
        <PurchaseHistory address="0xf018c4d8C07B9f5E02dD1032C875b7896ded95ca" />
      </body>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  authenticated: state.auth.authenticated
});

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func,
  profile: PropTypes.object
};

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
