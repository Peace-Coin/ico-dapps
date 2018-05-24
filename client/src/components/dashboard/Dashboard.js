import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Lottery from '../ico-comps/Lottery';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import Ethereum from './ethereum/Ethereum';
import { getCurrentProfile } from '../../actions/profileAction';
import PeaceCoinCrowdsaleToken from '../../ethereum/ico-interface/PeaceCoinCrowdsaleToken';
import PeaceCoinCrowdsale from '../../ethereum/ico-interface/PeaceCoinCrowdsale';
import web3 from '../../ethereum/web3';
import TestContract from '../ico-comps/TestContract';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor: '#0091a7'
  }
};

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ethereumModalIsOpen: false,
      bitcoinModalIsOpen: false,
      smartContractAddressIsOpen: false,
    };

    this.openEthereumModal = this.openEthereumModal.bind(this);
    this.afterEthereumOpenModal = this.afterEthereumOpenModal.bind(this);
    this.closeEthereumModal = this.closeEthereumModal.bind(this);

    this.openBitcoinModal = this.openBitcoinModal.bind(this);
    this.afterBitcoinOpenModal = this.afterBitcoinOpenModal.bind(this);
    this.closeBitcoinModal = this.closeBitcoinModal.bind(this);

    this.openSmartContractAddressModal = this.openSmartContractAddressModal.bind(this);
    this.afterSmartContractAddressOpenModal = this.afterSmartContractAddressOpenModal.bind(this);
    this.closeSmartContractAddressModal = this.closeSmartContractAddressModal.bind(this);
    this.countDowm = this.countDowm.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {

    // Crowdsale Token
    const owner = await PeaceCoinCrowdsaleToken.methods.owner().call();
    const tokenName = await PeaceCoinCrowdsaleToken.methods.name().call();
    const symbol = await PeaceCoinCrowdsaleToken.methods.symbol().call();
    const decimals = await PeaceCoinCrowdsaleToken.methods.decimals().call();
    const accounts = await web3.eth.getAccounts();
    const investor = accounts[0];
    let tokenAmount = await PeaceCoinCrowdsaleToken.methods
      .balanceOf(accounts[0])
      .call();

    // const history = await PeaceCoinCrowdsale.methods.buyTokens(this.state.investor).call({
    //   address: investor,
    // });

    tokenAmount = String(tokenAmount).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,' );

    // Crowdsale
    let rate = await PeaceCoinCrowdsale.methods.rate().call();

    rate = String(rate).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,' );

    const token = await PeaceCoinCrowdsale.methods.token().call();
    const wallet = await PeaceCoinCrowdsale.methods.wallet().call();

    let weiRaised = await PeaceCoinCrowdsale.methods.weiRaised().call();
    weiRaised = weiRaised * 0.000000000000000001

    const goal = await PeaceCoinCrowdsale.methods.goal().call();

    const vault = await PeaceCoinCrowdsale.methods.vault().call();
    const crowdsalOowner = await PeaceCoinCrowdsale.methods.owner().call();
    const cap = await PeaceCoinCrowdsale.methods.cap().call();
    let openingTime = await PeaceCoinCrowdsale.methods.openingTime().call();

    var d = new Date( Number(openingTime) * 1000 );
    var year  = d.getFullYear();
    var month = d.getMonth() + 1;
    var day  = d.getDate();
    var hour = ( '0' + d.getHours() ).slice(-2);
    var min  = ( '0' + d.getMinutes() ).slice(-2);
    var sec   = ( '0' + d.getSeconds() ).slice(-2);

    openingTime = d.getTime();

    let closingTime = await PeaceCoinCrowdsale.methods.closingTime().call();

    d = new Date( Number(closingTime) * 1000 );
    year  = d.getFullYear();
    month = d.getMonth() + 1;
    day  = d.getDate();
    hour = ( '0' + d.getHours() ).slice(-2);
    min  = ( '0' + d.getMinutes() ).slice(-2);
    sec   = ( '0' + d.getSeconds() ).slice(-2);

    closingTime = d.getTime();

    let value;

    this.setState({

      //PeaceCoinCrowdSale
      rate,
      token,
      wallet,
      weiRaised,
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
      investor,
      tokenAmount,

      //history,
    });

    this.interval = setInterval(this.countDowm, 1000);

  }

  countDowm(){

    var nowDate = new Date();
    var dnumNow = nowDate.getTime();

    var diffTime = this.state.closingTime - dnumNow;

    this.setState({dDays: '0'});
    this.setState({dHour: '0'});
    this.setState({dMin: '0'});
    this.setState({dSec: '0'});
    if(diffTime > 0){

      var dDays  = Math.floor(diffTime / ( 1000 * 60 * 60 * 24 ));  // 日数
      diffTime = diffTime % ( 1000 * 60 * 60 * 24 );
      var dHour  = Math.floor(diffTime / ( 1000 * 60 * 60 ));   // 時間
      diffTime = diffTime % ( 1000 * 60 * 60 );
      var dMin   = Math.floor(diffTime / ( 1000 * 60 ));    // 分
      diffTime = diffTime % ( 1000 * 60 );
      var dSec   = Math.floor(diffTime / 1000); // 秒

      this.setState({dDays: dDays});
      this.setState({dHour: dHour});
      this.setState({dMin: dMin});
      this.setState({dSec: dSec});
    }
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

  openSmartContractAddressModal() {

    this.setState({smartContractAddressIsOpen: true});
  }

  afterSmartContractAddressOpenModal() {

  }

  closeSmartContractAddressModal() {
    this.setState({smartContractAddressIsOpen: false});
  }

  async onSubmit(event){

    event.preventDefault();
    PeaceCoinCrowdsale.methods.buyTokens(this.state.investor).send({
      from: this.state.investor,
      value: web3.utils.toWei(this.state.value, 'ether')
    });
  };

  // onSubmit = async event => {
  //
  //   event.preventDefault();
  //   await PeaceCoinCrowdsale.methods.buyTokens(this.state.investor).send({
  //     from: this.state.investor,
  //     value: web3.utils.toWei(this.state.value, 'ether')
  //   });
  // };

  render() {
    return (
      <body class="peaceCoinIco dashboard">

      <div>
        <div>
          <br /><input type="button" value="Smart Contract Address" onClick={this.openSmartContractAddressModal} />
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
            <p class="content__main"><span class="coin coin-pce"><span class="num coin__num">{this.state.tokenAmount}</span><span class="unit coin__unit">PCE</span></span></p>
            <p class="content__sub cl_themeA-2"><span class="coin coin-eth"><span class="num coin__num">5,200</span><span class="unit coin__unit">ETH</span></span><span class="coin coin-btc"><span class="num coin__num">5,761</span><span class="unit coin__unit">BTC</span></span><span class="coin coin-usd"><span class="num coin__num">5,761</span><span class="unit coin__unit">USD</span></span></p>
          </div>
          <div class="l-content--buybtnSet clearfix">
            <div onClick={this.openEthereumModal} class="l-content--buybtnSet__item l-content--buybtnSet__item-L borderBox">
              <div  class="btn btn--cl-1 btn--size-1">
                <svg class="ico-svg ethereum">
                  <use xlinkHref="/symbol-defs.svg#icon-ethereum"></use>
                </svg>
                <span class="text">Ethereum</span>
              </div>
            </div>
            <div onClick={this.openBitcoinModal} class="l-content--buybtnSet__item l-content--buybtnSet__item-R borderBox">
              <div class="btn btn--cl-1 btn--size-1">
                <svg class="ico-svg bitcoin">
                  <use xlinkHref="/symbol-defs.svg#icon-bitcoin"></use>
                </svg>
                <span class="text">Bitcoin</span>
              </div>
            </div>
          </div>
          <div class="l-content--right">
          <div class="l-content--currentprice">
            <h3 class="title_content title_content__a title_content-currentprice">Current price</h3>
            <p class="content__main content__main-currentprice"><span class="coin coin-eth"><span class="num coin__num">1</span><span class="unit coin__unit">ETH</span></span> = <span class="coin coin-pce"><span class="num coin__num">{this.state.rate}</span><span class="unit coin__unit">PCE</span></span></p>
          </div>
          <div class="l-content--increases">
            <h3 class="title_content title_content__a title_content-increases">Price increases in</h3>
            <div id="timeCount" class="content__main timer clearfix is-countdown">
              <div class="theme-bgA" style={{fontSize: '40px', padding: '10px', borderRadius: '5px', textAlign: 'center'}}>
                <span class="num">{this.state.dDays}</span>
                <span class="unit cl_themeA-2" style={{fontSize: '25px'}}> Days</span>
            </div>
            <br />
              <div class="theme-bgA timer__item timer__item-h">
                <span class="num">{this.state.dHour}</span>
                <span class="unit cl_themeA-2">Hours</span>
              </div>
              <div class="theme-bgA timer__item timer__item-m">
                <span class="num">{this.state.dMin}</span>
                <span class="unit cl_themeA-2">Minutes</span>
              </div>
              <div class="theme-bgA timer__item timer__item-s">
                <span class="num">{this.state.dSec}</span>
                <span class="unit cl_themeA-2">Seconds</span>
              </div>
            </div>
          </div>
          <div class="l-content--raised">
            <h3 class="title_content title_content__a title_content-raised">Raised</h3>
            <p class="content__main content__main-raised"><span class="coin coin-usd"><span class="unit coin__unit">ETH</span><span class="num coin__num">{this.state.weiRaised}</span></span></p>
            <p class="content__sub content__sub-raised"><span class="coin coin-eth"><span class="num coin__num">3,512,786.37</span><span class="unit coin__unit">USD</span></span></p>
          </div>
        </div>
         </div>

        <div class="l-sec sec_transactions">
          <h2 class="title_sec title_sec__a title_sec-transactions">Transactions</h2>
          <div class="l-content l-content--transactionsList">
            <div class="info clearfix">
              <p class="transactions--item__label"></p>
              <p class="transactions--item__hash">Hash Address</p>
              <p class="transactions--item__datetime">Data time</p>
              <p class="transactions--item__price">Price</p>
              <p class="transactions--item__status">Status</p>
            </div>
            <ul class="list_transactions">
              <li class="list_transactions--item theme-bgA unconfirmed clearfix">
                <p class="transactions--item__hash">20x4e3b03ebace6ab7db1e944dc73680x4e3b03ebace6ab7db1e944dc7368</p>
                <p class="transactions--item__datetime"><span class="date">2018/01/18</span><span class="time cl_themeA-2">00:10:32</span></p>
                <p class="transactions--item__price"><span class="coin coin-pce"><span class="num coin__num">127</span><span class="unit coin__unit">PCE</span></span><span class="coin coin-usd cl_themeA-2"><span class="unit coin__unit">$</span><span class="num coin__num">181.61</span></span></p>
                <p class="transactions--item__status"><span class="status"><span class="label"></span><span class="text">UNCONFIRMED</span></span><span class="confirmations cl_themeA-2"><span class="num">521</span><span class="unit">Confirmations</span></span></p>
              </li>
              <li class="list_transactions--item theme-bgA canceled clearfix">
                <p class="transactions--item__hash">20x4e3b03ebace6ab7db1e944dc73680x4e3b03ebace6ab7db1e944dc7368</p>
                <p class="transactions--item__datetime"><span class="date">2018/01/18</span><span class="time cl_themeA-2">00:10:32</span></p>
                <p class="transactions--item__price"><span class="coin coin-pce"><span class="num coin__num">127</span><span class="unit coin__unit">PCE</span></span><span class="coin coin-usd cl_themeA-2"><span class="unit coin__unit">$</span><span class="num coin__num">181.61</span></span></p>
                <p class="transactions--item__status"><span class="status"><span class="label"></span><span class="text">CANCELED</span></span><span class="confirmations cl_themeA-2"><span class="num">521</span><span class="unit">Confirmations</span></span></p>
              </li>
              <li class="list_transactions--item theme-bgA unconfirmed clearfix">
                <p class="transactions--item__hash">20x4e3b03ebace6ab7db1e944dc73680x4e3b03ebace6ab7db1e944dc7368</p>
                <p class="transactions--item__datetime"><span class="date">2018/01/18</span><span class="time cl_themeA-2">00:10:32</span></p>
                <p class="transactions--item__price"><span class="coin coin-pce"><span class="num coin__num">127</span><span class="unit coin__unit">PCE</span></span><span class="coin coin-usd cl_themeA-2"><span class="unit coin__unit">$</span><span class="num coin__num">181.61</span></span></p>
                <p class="transactions--item__status"><span class="status"><span class="label"></span><span class="text">UNCONFIRMED</span></span><span class="confirmations cl_themeA-2"><span class="num">521</span><span class="unit">Confirmations</span></span></p>
              </li>
              <li class="list_transactions--item theme-bgA completed clearfix">
                <p class="transactions--item__hash">20x4e3b03ebace6ab7db1e944dc73680x4e3b03ebace6ab7db1e944dc7368</p>
                <p class="transactions--item__datetime"><span class="date">2018/01/18</span><span class="time cl_themeA-2">00:10:32</span></p>
                <p class="transactions--item__price"><span class="coin coin-pce"><span class="num coin__num">127</span><span class="unit coin__unit">PCE</span></span><span class="coin coin-usd cl_themeA-2"><span class="unit coin__unit">$</span><span class="num coin__num">181.61</span></span></p>
                <p class="transactions--item__status"><span class="status"><span class="label"></span><span class="text">COMPLETED</span></span><span class="confirmations cl_themeA-2"><span class="num">521</span><span class="unit">Confirmations</span></span></p>
              </li>
              <li class="list_transactions--item theme-bgA completed clearfix">
                <p class="transactions--item__hash">20x4e3b03ebace6ab7db1e944dc73680x4e3b03ebace6ab7db1e944dc7368</p>
                <p class="transactions--item__datetime"><span class="date">2018/01/18</span><span class="time cl_themeA-2">00:10:32</span></p>
                <p class="transactions--item__price"><span class="coin coin-pce"><span class="num coin__num">127</span><span class="unit coin__unit">PCE</span></span><span class="coin coin-usd cl_themeA-2"><span class="unit coin__unit">$</span><span class="num coin__num">181.61</span></span></p>
                <p class="transactions--item__status"><span class="status"><span class="label"></span><span class="text">COMPLETED</span></span><span class="confirmations cl_themeA-2"><span class="num">521</span><span class="unit">Confirmations</span></span></p>
              </li>
              <li class="list_transactions--item theme-bgA unconfirmed clearfix">
                <p class="transactions--item__hash">20x4e3b03ebace6ab7db1e944dc73680x4e3b03ebace6ab7db1e944dc7368</p>
                <p class="transactions--item__datetime"><span class="date">2018/01/18</span><span class="time cl_themeA-2">00:10:32</span></p>
                <p class="transactions--item__price"><span class="coin coin-pce"><span class="num coin__num">127</span><span class="unit coin__unit">PCE</span></span><span class="coin coin-usd cl_themeA-2"><span class="unit coin__unit">$</span><span class="num coin__num">181.61</span></span></p>
                <p class="transactions--item__status"><span class="status"><span class="label"></span><span class="text">UNCONFIRMED</span></span><span class="confirmations cl_themeA-2"><span class="num">521</span><span class="unit">Confirmations</span></span></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div>
      {this.state.history}
    </div>
    <form onSubmit={this.onSubmit}>
      <div>
        Buy PCE Token :
        <input
          value={this.state.value}
          onChange={event => this.setState({ value: event.target.value })}
        />
      <br />
      <br />
      <input
        type='submit'
        value='METAMASK'
      />
      </div>
    </form>
    </div>
    <TestContract />
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

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);
