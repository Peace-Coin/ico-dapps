import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { withRouter, Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { change } from 'redux-form';
// import ProgressBar from '../../UI/ProgressBar';
// import PeaceCoinCrowdsaleToken from '../../../ethereum/ico-interface/PeaceCoinCrowdsaleToken';
import PeaceCoinCrowdsale from '../../../ethereum/ico-interface/PeaceCoinCrowdsale';
import web3 from '../../../ethereum/web3';
//import {Parent} from '../Dashboard';

export default class Ethereum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: '', //use initial input value
      piaceCoin: '', //not use
      bonus: '', //not use
      totalPiaceCoin: '', //not use

      //confが優先される
      gasLimit: '',
      gasPrice: '',

      //initial progress bar value -> call component delete
      progress: '10',

      // eth <- change function -> pce
      pce: '0',
      rate: 0, //initial
      totalPce: '0',

      myEtherWalletUrl: '', //href

      errMessage: '',

      baseRate: 0,
      bonus: 0
    };

    this.onChangeByAmount = this.onChangeByAmount.bind(this);
    this.buyToken = this.buyToken.bind(this);
  }

  async componentDidMount() {
    let rate = await PeaceCoinCrowdsale.methods.rate().call();
    let accounts = await web3.eth.getAccounts();
    let investor = accounts[0];

    this.setState({
      eth: String(Number(1) * this.state.rate).replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        '$1,'
      )
    });

    const { ethreumAddress } = this.props;
    var conf = require('../../../config/conf.json');
    let gasLimit = conf.GasLimit;
    let gasPrice = conf.GasPrice;
    let baseRate = conf.BASE_RATE;

    let myEtherWalletUrl =
      'https://www.myetherwallet.com/?to=' +
      ethreumAddress +
      '&value=1&gas=' +
      gasLimit +
      '&gasprice=' +
      gasPrice +
      '#send-transaction';

    this.setState({
      rate: rate,
      investor: investor,
      eth: String(Number(1) * this.state.rate).replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        '$1,'
      ),
      myEtherWalletUrl: myEtherWalletUrl,
      gasLimit: conf.EthGasLimit,
      gasPrice: conf.EthGasPrice,
      baseRate: baseRate
    });
  }

  buyToken(e) {
    this.setState({
      errMessage: ''
    });

    if (isFinite(this.state.amount) && this.state.amount > 0) {
      e.preventDefault();
      PeaceCoinCrowdsale.methods
        .buyTokens(this.state.investor)
        .send({
          from: this.state.investor,
          value: web3.utils.toWei(this.state.amount, 'ether')
        })
        .then(res => {
          this.setState({
            errMessage: ''
          });
        })
        .catch(err => {
          this.setState({
            errMessage: 'PLEASE CHECK METAMASK LOGIN or INSTALL METAMASK TOOL'
          });
        });
    } else {
      this.setState({
        errMessage: 'AMOUNT > 0 !'
      });
    }
  }

  onChangeByAmount(e) {
    let rate = this.state.rate;

    let baseRate = this.state.baseRate;

    //表示用パーセント
    let bonus = ((rate - baseRate) / baseRate) * 100;
    bonus = Math.round(bonus);

    this.setState({
      bonus: bonus
    });

    var BigNumber = require('bignumber.js');

    let eth = e.target.value;

    if (isFinite(eth) && eth != '') {
      this.setState({ [e.target.name]: e.target.value });

      this.setState({ pce: new BigNumber(eth).times(baseRate).toPrecision() });

      let totalPce = new BigNumber(eth).times(rate).toPrecision();
      totalPce = String(totalPce).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');

      this.setState({ totalPce: totalPce });
    } else {
      this.setState({ [e.target.name]: e.target.value });

      this.setState({ pce: '0' });
      this.setState({ bonus: '0' });
      this.setState({ totalPce: '0' });
    }
  }

  render() {
    return (
      <div
        class="modaal-wrapper modaal-inline  l-content_modal--buyCoin l-content_modal--buyCoin-buyEth l-content--form themeB"
        id="modaal_1528166599473a836644f6c89e"
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
                <div
                  class="modaal-content-container"
                  style={{ verticalAlign: 'top' }}
                >
                  <h2 class="tab_content title_content title_content__a title_content__a-modal title_content-ethereum">
                    Buy using Ethereum
                  </h2>
                  <form id="form_buyEthereum">
                    <div
                      style={{ display: 'inline-block', verticalAlign: 'top' }}
                      class="form-group form-group--text form-group--text-amount"
                    >
                      <label for="frmAmount" class="main">
                        Amount ETH
                      </label>
                      <input
                        className="theme-is-err"
                        name="frmAmount"
                        id="frmAmount"
                        type="text"
                        placeholder="Amount"
                        name="amount"
                        value={this.state.amount}
                        onChange={this.onChangeByAmount}
                      />
                      <p class="text-err theme-is-err">Error message</p>
                      <p class="text-help" />
                    </div>
                    <div
                      style={{ display: 'inline-block', verticalAlign: 'top' }}
                      class="l-content--buyCoin l-content--buyCoin-rate l-content--buyCoin-ethrate clearfix"
                    >
                      <p class="content--ethrate--pce">
                        <span class="num coin__num">{this.state.pce}</span>
                        <span class="unit coin__unit">PCE</span>
                      </p>
                      <p class="content--ethrate--symbol">+</p>
                      <p class="content--ethrate--bonus">
                        <span class="num coin__num">{this.state.bonus}%</span>
                        <span class="unit coin__unit">BONUS</span>
                      </p>
                      <p class="content--ethrate--symbol">=</p>
                      <p class="content--ethrate--pce">
                        <span class="num coin__num">{this.state.totalPce}</span>
                        <span class="unit coin__unit">PCE</span>
                      </p>
                      <p />
                    </div>
                    <div class="l-content--buyCoin l-content--buyCoin-token">
                      <h3 class="title_content title_content__a title_content-buyCoin-token">
                        Token
                      </h3>
                      <p class="coin coin-pce">
                        <span class="num coin__num">{this.state.totalPce}</span>
                        <span class="unit coin__unit">PCE</span>
                      </p>
                    </div>
                    <div class="l-content--buyCoin l-content--buyCoin-gasSet clearfix">
                      <div class="l-content--buyCoin l-content--buyCoin-gas l-content--buyCoin-gaslimit">
                        <h3 class="title_content title_content__a title_content-buyCoin-gaslimit">
                          Gas limit
                        </h3>
                        <p class="coin coin-gas">
                          <span class="num coin__num">
                            {this.state.gasLimit}
                          </span>
                        </p>
                      </div>
                      <div class="l-content--buyCoin l-content--buyCoin-gas l-content--buyCoin-gasprice">
                        <h3 class="title_content title_content__a title_content-buyCoin-gasprice">
                          Gas Price
                        </h3>
                        <p class="coin coin-gas">
                          <span class="num coin__num">
                            {this.state.gasPrice}
                          </span>
                          <span class="unit coin__unit">Gwei</span>
                        </p>
                      </div>
                    </div>
                    <div class="l-sec sec_btnSet sec_btnSet--modal sec_btnSet--modal-buyCoin">
                      <div class="form-group form-group--btn form-group--btn-buyCoin clearfix">
                        <div class="l-content--buybtnSet__item l-content--buybtnSet__item-L borderBox">
                          <a href={this.state.myEtherWalletUrl}>
                            <input
                              class="btn btn--cl-1 btn--size-1"
                              type="button"
                              name="action"
                              value="myetherwallet"
                            />
                          </a>
                        </div>
                        <div class="l-content--buybtnSet__item l-content--buybtnSet__item-R borderBox">
                          <input
                            class="btn btn--cl-1 btn--size-1"
                            type="button"
                            onClick={this.buyToken}
                            name="action"
                            value="metamask"
                            value="Metamask"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <button
                style={{ border: '1px solid grey' }}
                onClick={this.props.close}
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
        <div style={{ backgroundColor: 'red', color: 'white' }}>
          {this.state.errMessage}
        </div>
      </div>
    );
  }
}
