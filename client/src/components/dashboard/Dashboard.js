import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import Ethereum from './ethereum/Ethereum';
//import { getCurrentProfile } from '../../actions/profileAction';
import { getProfileStatus } from '../../actions/profileAction';
import { getRate } from '../../actions/rateAction';
import PeaceCoinCrowdsaleToken from '../../ethereum/ico-interface/PeaceCoinCrowdsaleToken';
import PeaceCoinCrowdsale from '../../ethereum/ico-interface/PeaceCoinCrowdsale';
import web3 from '../../ethereum/web3';
import PurchaseHistory from './ethereum/PurchaseHistory';
import axios from '../../shared/axios';
import Spinner from '../UI/Spinner';

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

const popupStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    maxWidth: '600px',
    width: '100%'
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investor: '',
      tokenAmount: 0,
      loading: true,

      ethereumModalIsOpen: false,
      bitcoinModalIsOpen: false,
      smartContractAddressIsOpen: false,

      ethAmount: 0,
      tokenAmount: 0,
      weiRaised: 0,

      // getRateApi
      rates: {
        bitcoinRate: 0,
        usdRate: 0,
        bitcoinRateAmount: 0,
        usdRateAmount: 0,
        //project total usd amount
        totalUsdAmount: 0,
        goalUsd: 0,
        goalBitcoin: 0
      },

      conf: {
        PeaceCoinCrowdsaleAddress: ''
      },

      profile: {},
      goalPar: 0,

      errorMessage: '',
      errorIsOpen: false
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
    this.countDowm = this.countDowm.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.openErrorModal = this.openErrorModal.bind(this);
    this.afterErrorModal = this.afterErrorModal.bind(this);
    this.closeErrorModal = this.closeErrorModal.bind(this);
  }

  async componentDidMount() {
    this.props.getProfileStatus();

    //ポップアップ制御用
    axios.get('/api/profile').then(res => {
      this.setState({ profile: res.data });

      let investor = this.state.profile.Profile.ethereumAddress;

      this.setState({ investor: investor });
    });

    try {
      // Crowdsale Token
      const owner = await PeaceCoinCrowdsaleToken.methods.owner().call();
      const tokenName = await PeaceCoinCrowdsaleToken.methods.name().call();
      const symbol = await PeaceCoinCrowdsaleToken.methods.symbol().call();
      const decimals = await PeaceCoinCrowdsaleToken.methods.decimals().call();

      // Crowdsale
      let rate = await PeaceCoinCrowdsale.methods.rate().call();

      const token = await PeaceCoinCrowdsale.methods.token().call();
      const wallet = await PeaceCoinCrowdsale.methods.wallet().call();

      const goal = await PeaceCoinCrowdsale.methods.goal().call();

      const vault = await PeaceCoinCrowdsale.methods.vault().call();
      const crowdsalOowner = await PeaceCoinCrowdsale.methods.owner().call();
      const cap = await PeaceCoinCrowdsale.methods.cap().call();
      let openingTime = await PeaceCoinCrowdsale.methods.openingTime().call();

      var d = new Date(Number(openingTime) * 1000);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var hour = ('0' + d.getHours()).slice(-2);
      var min = ('0' + d.getMinutes()).slice(-2);
      var sec = ('0' + d.getSeconds()).slice(-2);

      openingTime = d.getTime();

      let closingTime = await PeaceCoinCrowdsale.methods.closingTime().call();

      d = new Date(Number(closingTime) * 1000);
      year = d.getFullYear();
      month = d.getMonth() + 1;
      day = d.getDate();
      hour = ('0' + d.getHours()).slice(-2);
      min = ('0' + d.getMinutes()).slice(-2);
      sec = ('0' + d.getSeconds()).slice(-2);

      closingTime = d.getTime();

      let value;

      var conf = require('../../config/conf.json');

      this.setState({
        //PeaceCoinCrowdSale
        rate,
        token,
        wallet,

        goal,
        vault,
        crowdsalOowner,
        cap,
        openingTime,
        closingTime,
        //PeaceCoinCrowdSaleToken
        owner,
        tokenName,
        symbol,
        decimals,

        conf
      });

      let tokenAmount = await PeaceCoinCrowdsaleToken.methods
        .balanceOf(this.state.investor)
        .call();

      let ethAmount;

      //PeaceUtil 小数点以下誤差吸収ライブラリ
      var BigNumber = require('bignumber.js');

      ethAmount = new BigNumber(tokenAmount)
        .times(conf.EXCHANGE_WEI_ETH_RATE)
        .div(rate)
        .toPrecision();

      tokenAmount = new BigNumber(tokenAmount)
        .times(conf.EXCHANGE_WEI_ETH_RATE)
        .toPrecision();

      //eth raised = weiRaised * exchange_length
      let weiRaised = await PeaceCoinCrowdsale.methods.weiRaised().call();

      let goalPar = (weiRaised / goal) * 100;
      goalPar = Math.round(goalPar);

      this.setState({
        goalPar: goalPar
      });

      //weiRaised = PeaceUtil.multiply(weiRaised, conf.EXCHANGE_WEI_ETH_RATE);
      weiRaised = new BigNumber(weiRaised)
        .times(conf.EXCHANGE_WEI_ETH_RATE)
        .toPrecision();

      let goalEth = new BigNumber(goal)
        .times(conf.EXCHANGE_WEI_ETH_RATE)
        .toPrecision();

      this.props.getRate(ethAmount, weiRaised, goalEth, this.props.history);

      tokenAmount = String(tokenAmount).replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        '$1,'
      );

      ethAmount = String(ethAmount).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

      weiRaised = String(weiRaised).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

      this.setState({
        tokenAmount,
        weiRaised,
        ethAmount
      });

      this.interval = setInterval(this.countDowm, 1000);
    } catch (e) {
      //PeaceUtil 小数点以下誤差吸収ライブラリ
      var BigNumber = require('bignumber.js');

      //eth raised = weiRaised * exchange_length
      let weiRaised = await PeaceCoinCrowdsale.methods.weiRaised().call();

      const goal = await PeaceCoinCrowdsale.methods.goal().call();

      let goalPar = (weiRaised / goal) * 100;
      goalPar = Math.round(goalPar);

      this.setState({
        goalPar: goalPar
      });

      //weiRaised = PeaceUtil.multiply(weiRaised, conf.EXCHANGE_WEI_ETH_RATE);
      weiRaised = new BigNumber(weiRaised)
        .times(conf.EXCHANGE_WEI_ETH_RATE)
        .toPrecision();

      let goalEth = new BigNumber(goal)
        .times(conf.EXCHANGE_WEI_ETH_RATE)
        .toPrecision();

      this.props.getRate('', weiRaised, goalEth, this.props.history);

      weiRaised = String(weiRaised).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

      this.setState({
        weiRaised
      });

      this.setState({ tokenAmount: 0 });

      this.interval = setInterval(this.countDowm, 1000);
    }
  }

  countDowm() {
    var nowDate = new Date();
    var dnumNow = nowDate.getTime();

    var diffTime = this.state.closingTime - dnumNow;

    this.setState({ dDays: '0' });
    this.setState({ dHour: '0' });
    this.setState({ dMin: '0' });
    this.setState({ dSec: '0' });
    if (diffTime > 0) {
      var dDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 日数
      diffTime = diffTime % (1000 * 60 * 60 * 24);
      var dHour = Math.floor(diffTime / (1000 * 60 * 60)); // 時間
      diffTime = diffTime % (1000 * 60 * 60);
      var dMin = Math.floor(diffTime / (1000 * 60)); // 分
      diffTime = diffTime % (1000 * 60);
      var dSec = Math.floor(diffTime / 1000); // 秒

      this.setState({ dDays: dDays });
      this.setState({ dHour: dHour });
      this.setState({ dMin: dMin });
      this.setState({ dSec: dSec });
    }

    this.setState({ loading: false });
  }

  openErrorModal() {

    this.setState({ errorIsOpen: true });
  }

  afterErrorModal() {}

  closeErrorModal() {
    this.setState({ errorIsOpen: false });
  }

  openEthereumModal() {
    //KYC 登録済みであること 承認状態は問わない
    if (this.props.profile.profileStatus.profileStatus !== 0) {
      this.setState({ ethereumModalIsOpen: true });
      this.setState({ errorMessage: '' });
    } else {
      this.setState({ errorMessage: 'PLEASE KYC FINISHED !' });
      this.setState({ errorIsOpen: true });
    }
  }

  afterEthereumOpenModal() {}

  closeEthereumModal() {
    this.setState({ ethereumModalIsOpen: false });
  }

  openBitcoinModal() {
    //KYC 認証済みであること 承認状態は問わない
    if (this.props.profile.profileStatus.profileStatus !== 0) {
      if (
        this.props.profile.profileStatus.bitcoinAddress !== 'undefined' ||
        this.props.profile.profileStatus.bitcoinAddress !== null ||
        this.props.profile.profileStatus.bitcoinAddress !== ''
      ) {
        this.setState({ bitcoinModalIsOpen: true });
        this.setState({ errorMessage: '' });
      } else {
        this.setState({ errorMessage: 'PLEASE ENTRY BITCOIN ADDRESS !' });
        this.setState({ errorIsOpen: true });
      }
    } else {
      this.setState({ errorMessage: 'PLEASE KYC FINISHED !' });
      this.setState({ errorIsOpen: true });
    }
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

  async onSubmit(event) {
    event.preventDefault();
    PeaceCoinCrowdsale.methods.buyTokens(this.state.investor).send({
      from: this.state.investor,
      value: web3.utils.toWei(this.state.value, 'ether')
    });
  }

  render() {
    let goalPar = this.state.goalPar;

    let dashboardContent;

    const loading = this.state.loading;

    if (loading) {
      dashboardContent = <Spinner />;
    } else {
      dashboardContent = (
        <div class="peaceCoinIco dashboard">
          <div>
            <div>
              <Modal
                isOpen={this.state.ethereumModalIsOpen}
                onAfterOpen={this.afterEthereumOpenModal}
                onRequestClose={this.closeEthereumModal}
                style={popupStyles}
                contentLabel="ETHEREUM"
              >
                <Ethereum
                  ethreumAddress={this.state.investor}
                  close={this.closeEthereumModal}
                />
              </Modal>
            </div>
            <div>
              <Modal
                isOpen={this.state.bitcoinModalIsOpen}
                onAfterOpen={this.afterBitcoinOpenModal}
                onRequestClose={this.closeBitcoinModal}
                style={popupStyles}
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
                              PEACE COIN Smart Contract Address
                            </h3>
                            <span class="address">
                              {this.state.conf.PeaceCoinCrowdsaleAddress}
                            </span>
                            <p class="text">
                              Copy this address to your wallet to view your
                              PEACE COIN tokens.
                              <br />Do not sent funds from an exchange to this
                              address.
                            </p>
                          </div>
                        </div>
                        <button
                          style={{ border: '1px solid grey' }}
                          onClick={this.closeSmartContractAddressModal}
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

            <div>
              <Modal
                isOpen={this.state.errorIsOpen}
                onAfterOpen={this.afterErrorModal}
                onRequestClose={this.closeErrorModal}
                style={customStyles}
                contentLabel="ErrorModal"
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
                            <h3 style={{ color: 'red', fontSize: '18px' }} class="title_content title_content__a title_content__a-modal title_content-smartContract">
                              Error
                            </h3>
                            <p class="text">
                              {this.state.errorMessage}
                            </p>
                          </div>
                        </div>
                        <button
                          style={{ border: '1px solid grey' }}
                          onClick={this.closeErrorModal}
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

            <div id="mainContent" role="main">
              <div id="pageContent">
                <div class="l-sec sec_token">
                  <h2 class="title_sec title_sec__a title_sec-token">Token</h2>
                  <div class="l-content l-content--token theme-bgA">
                    <p class="content__main">
                      <span class="coin coin-pce">
                        <span class="num coin__num">
                          {this.state.tokenAmount}
                        </span>
                        <span class="unit coin__unit">PCE</span>
                      </span>
                    </p>
                    <p class="content__sub cl_themeA-2">
                      <span class="coin coin-eth">
                        <span class="num coin__num">
                          {this.state.ethAmount}
                        </span>
                        <span class="unit coin__unit">ETH</span>
                      </span>
                      <span class="coin coin-btc">
                        <span class="num coin__num">
                          {this.props.rates.bitcoinRateAmount}
                        </span>
                        <span class="unit coin__unit">BTC</span>
                      </span>
                      <span class="coin coin-usd">
                        <span class="num coin__num">
                          {this.props.rates.usdRateAmount}
                        </span>
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

                  <div class="l-content--right themeB">
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
                          <span class="num coin__num">{this.state.rate}</span>
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
                        <div class="timer__item timer__item-day">
                          <span class="num">{this.state.dDays}</span>
                          <span class="unit">Days</span>
                        </div>
                        <div class="timer__item timer__item-connect">
                          <span class="num">:</span>
                        </div>
                        <div class="timer__item timer__item-h">
                          <span class="num">{this.state.dHour}</span>
                          <span class="unit cl_themeA-2">Hours</span>
                        </div>
                        <div class="timer__item timer__item-connect">
                          <span class="num">:</span>
                        </div>
                        <div class="timer__item timer__item-m">
                          <span class="num">{this.state.dMin}</span>
                          <span class="unit cl_themeA-2">Minutes</span>
                        </div>
                        <div class="timer__item timer__item-connect">
                          <span class="num">:</span>
                        </div>
                        <div class="timer__item timer__item-s">
                          <span class="num">{this.state.dSec}</span>
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
                          <span class="num coin__num">
                            {this.state.weiRaised}
                          </span>
                          <span class="unit coin__unit"> ETH</span>
                        </span>
                      </p>
                      <p class="content__sub content__sub-raised">
                        <span class="coin coin-eth">
                          <span class="unit coin__unit">$ </span>
                          <span class="num coin__num">
                            {this.props.rates.totalUsdAmount}
                          </span>
                        </span>
                      </p>
                      <div class="l-content--bar">
                        <div class="l-content--bar__info">
                          <span class="coin coin-usd coin--now">
                            <span class="unit coin__unit"></span>
                            <span class="num coin__num">

                            </span>
                          </span>
                          <span class="coin coin-usd coin--goal">
                            <span class="sub">Goal</span>
                            <span class="unit coin__unit">$</span>
                            <span class="num coin__num">
                              {this.props.rates.goalUsdBillionAmount}B
                            </span>
                          </span>
                        </div>
                        <div class="l-content--bar__graph">
                          <p class="graph_obj">
                            <span
                              class="graph_obj__main"
                              style={{ width: goalPar }}
                            />
                          </p>
                          <p class="graph_text">{goalPar}%</p>
                        </div>
                      </div>
                    </div>
                    <div class="l-content--SClink">
                      <a
                        onClick={this.openSmartContractAddressModal}
                        class="modallink-smartContract"
                        data-modaal-scope="modaal_1528071702034c308f23391407"
                      >
                        PEACE COIN Smart Contract Address
                        <span class="obj">
                          <i class="fa fa-exclamation" aria-hidden="true" />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="l-sec sec_transactions">
                  <h2 class="title_sec title_sec__a title_sec-transactions">
                    Transactions
                  </h2>
                  <div class="l-content l-content--transactionsList">
                    <ul class="list_transactions">
                      <PurchaseHistory
                        address={this.state.investor}
                        rates={this.props.rates}
                      />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div>{dashboardContent}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  authenticated: state.auth.authenticated,
  // getRateApi
  rates: state.rates
});

Dashboard.propTypes = {
  getProfileStatus: PropTypes.func.isRequired,
  getRate: PropTypes.func,
  profile: PropTypes.object.isRequired,
  // getRateApi
  rates: PropTypes.object
};

export default connect(
  mapStateToProps,
  { getProfileStatus, getRate }
)(Dashboard);
