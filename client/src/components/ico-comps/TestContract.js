import React, { Component } from 'react';
import web3 from '../../ethereum/web3';
import PeaceCoinCrowdsaleToken from '../../ethereum/ico-interface/PeaceCoinCrowdsaleToken';
import PeaceCoinCrowdsale from '../../ethereum/ico-interface/PeaceCoinCrowdsale';

class TestContract extends Component {

  constructor(props) {
    super(props);

    this.state = {

      //PeaceCoinCrowdSale
      rate: '',
      token: '',
      wallet: '',
      weiRaised: 0,
      goal: '',
      vault: '',
      crowdsalOowner: '',
      cap: 0,
      openingTime: '',
      closingTime: '',

      //PeaceCoinCrowdSaleToken
      owner: '',
      tokenName: '',
      symbol: '',
      decimals: '',
      investor: '',
      tokenAmount: 0,

      limitTime: '',
      value: '',
      dDays: '',
      dHour: '',
      dMin: '',
      dSec: '',
    };

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
    const tokenAmount = await PeaceCoinCrowdsaleToken.methods
      .balanceOf(accounts[0])
      .call();

    // Crowdsale
    const rate = await PeaceCoinCrowdsale.methods.rate().call();
    const token = await PeaceCoinCrowdsale.methods.token().call();
    const wallet = await PeaceCoinCrowdsale.methods.wallet().call();

    const weiRaised = await PeaceCoinCrowdsale.methods.weiRaised().call();
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
    });

  
  }

  onSubmit = async event => {
    event.preventDefault();
    await PeaceCoinCrowdsale.methods.buyTokens(this.state.investor).send({
      from: this.state.investor,
      value: web3.utils.toWei(this.state.value, 'ether')
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1 style={{fontSize: '18px'}}>PeaceCoinCrowdSaleToken</h1>
        <p style={{fontSize: '16px'}}>
          token owner: {this.state.owner}
          <br />
          token name: {this.state.tokenName}
          <br />
          symbol: {this.state.symbol}
          <br />
          decimals: {this.state.decimals}
          <br />
          investor: {this.state.investor}
          <br />
          balanceOf: {this.state.tokenAmount}
        </p>
        <br />
        <p style={{fontSize: '16px'}}>
          <h1 style={{fontSize: '18px'}}>PeaceCoinCrowdSale</h1>
          rate: {this.state.rate}
          <br />
          token: {this.state.token}
          <br />
          wallet: {this.state.wallet}
          <br />
          waiRaised: {this.state.weiRaised}
          <br />
          goal: {this.state.goal}
          <br />
          vault: {this.state.vault}
          <br />
          owner: {this.state.crowdsalOowner}
          <br />
          cap: {this.state.cap}
          <br />
          openingTime: {this.state.openingTime}
          <br />
          closingTime: {this.state.closingTime}
          <br />
        </p>
        <br />
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
            type='button'
            value='METAMASK'
          />
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default TestContract;
