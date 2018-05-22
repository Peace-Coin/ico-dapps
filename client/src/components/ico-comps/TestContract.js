import React, { Component } from 'react';
import web3 from '../../ethereum/web3';
import PeaceCoinCrowdsaleToken from '../../ethereum/ico-interface/PeaceCoinCrowdsaleToken';
import PeaceCoinCrowdsale from '../../ethereum/ico-interface/PeaceCoinCrowdsale';

class TestContract extends Component {
  state = {
    owner: '',
    tokenName: '',
    symbol: '',
    decimals: '',
    tokenAmount: 0,
    rate: 0,
    weiRaised: 0,
    value: '',
    investor: '',
    goal: 0,
    cap: 0
  };

  async componentDidMount() {

    console.log('start');

    // Crowdsale Token
    //const owner = await PeaceCoinCrowdsaleToken.methods.owner().call();

    const owner = await PeaceCoinCrowdsaleToken.methods.owner().call().then((result)=>{
      console.log(result);
    }).catch(err => {
      console.log(err);
    });

    console.log('end');

    const tokenName = await PeaceCoinCrowdsaleToken.methods.name().call();
    const symbol = await PeaceCoinCrowdsaleToken.methods.symbol().call();
    const decimals = await PeaceCoinCrowdsaleToken.methods.decimals().call();

    const accounts = await web3.eth.getAccounts();
    const investor = accounts[0];
    const tokenAmount = await PeaceCoinCrowdsaleToken.methods
      .balanceOf(accounts[0])
      .call();

    // let account = web3.eth.accounts[0];
    // const accountInterval = setInterval(function() {
    //   if (web3.eth.accounts[0] !== account) {
    //     account = web3.eth.accounts[0];
    //     //updateInterface();
    //   }
    // }, 100);

    // Crowdsale
    const rate = await PeaceCoinCrowdsale.methods.rate().call();
    const weiRaised = await PeaceCoinCrowdsale.methods.weiRaised().call();
    const goal = await PeaceCoinCrowdsale.methods.goal().call();
    const cap = await PeaceCoinCrowdsale.methods.cap().call();

    let value;

    console.log('rate' + rate);
    console.log('weiRaised' + weiRaised);
    console.log('goal' + goal);
    console.log('cap' + cap);

    this.setState({
      owner,
      tokenName,
      symbol,
      decimals,
      tokenAmount,
      rate,
      weiRaised,
      value,
      investor,
      goal,
      cap
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
        <p>
          token owner: {this.state.owner}
          <br />
          token name: {this.state.tokenName}
          <br />
          symbol: {this.state.symbol}
          <br />
          decimals: {this.state.decimals}
          <br />
          balanceOf: {this.state.tokenAmount}
          <br />
          rate: {this.state.rate}
          <br />
          goal: {this.state.goal}
          <br />
          cap: {this.state.cap}
          <br />
          waiRaised: {this.state.weiRaised}
          <br />
          <br />
          investor: {this.state.investor}
        </p>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Buy PCE Token</label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
            <button>Buy</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default TestContract;
