import React, { Component } from 'react';
//import { connect } from 'react-redux';
import web3 from '../../ethereum/web3';
import lottery from '../../ethereum/ico-interface/lottery';

class Lottery extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = { manager: '' };
  // }
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }

  onSubmit = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...' });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });
    this.setState({ message: 'You have been enterd!' });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waitting on transaction success...' });
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    this.setState({ message: 'A winner has been picked!' });
  };

  render() {
    return (
      <div>
        <p>
          This contract is managed by {this.state.manager}. There are currently{' '}
          {this.state.players.length} people enterd competing to win{' '}
          {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <div>
            <label>amount of ether to enter </label>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default Lottery;
