import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ETHERSCAN_API_URL = 'http://api-rinkeby.etherscan.io';
const CONTRACT_ADDRESS = '0x32179efc8b8ae3e966b28f2e209b37426b1661cd';
const API_KEY = 'CZS8EXSB7GDIDBFN91D8QNVZZF13N9VTGF';

class PurchaseHistory extends Component {
  state = {
    histories: []
  };

  componentDidMount() {
    const { address } = this.props;

    fetch(
      `${ETHERSCAN_API_URL}/api?module=account&action=tokentx&contractaddress=${CONTRACT_ADDRESS}&address=${address}&page=1&offset=100&sort=asc&apikey=${API_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ histories: data.result });
        console.log('result: ', data.result);
      });
  }

  render() {
    const { histories } = this.state;

    const records = histories.map(history => (
      <li
        className="list_transactions--item theme-bgA unconfirmed clearfix"
        key={history.blockNumber}
      >
        <p className="transactions--item__hash">{history.hash}</p>
        <p className="transactions--item__datetime">
          {' '}
          <span className="date">{history.timeStamp}</span>
          <span className="time cl_themeA-2">{history.timeStamp}</span>
        </p>
        <p className="transactions--item__price">
          {' '}
          <span className="coin coin-pce">
            <span className="num coin__num">{history.value}</span>
            <span className="unit coin__unit">{history.tokenSymbol}</span>
          </span>
          <span className="coin coin-usd cl_themeA-2">
            <span className="unit coin__unit">$</span>
            <span className="num coin__num">181.61</span>
          </span>
        </p>
        <p className="transactions--item__status">
          <span className="status">
            <span className="label" />
            <span className="text">COMPLETED</span>
          </span>
          <span className="confirmations cl_themeA-2">
            <span className="num">{history.confirmations}</span>
            <span className="unit">Confirmations</span>
          </span>
        </p>
      </li>
    ));

    return (
      <div className="class=l-content l-content--transactionsList">
        <div className="info clearfix">
          <p className="transactions--item__label" />
          <p className="transactions--item__hash">Hash Address</p>
          <p className="transactions--item__datetime">Data time</p>
          <p className="transactions--item__price">Price</p>
          <p className="transactions--item__status">Status</p>
        </div>
        <ul className="list_transactions">{records}</ul>
      </div>
    );
  }
}

export default PurchaseHistory;
