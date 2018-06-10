import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ETHERSCAN_API_URL = 'http://api-rinkeby.etherscan.io';
const CONTRACT_ADDRESS = '0x32179efc8b8ae3e966b28f2e209b37426b1661cd';
const API_KEY = 'CZS8EXSB7GDIDBFN91D8QNVZZF13N9VTGF';

class PurchaseHistory extends Component {


  constructor(props) {
    super(props);
    this.state = {
      histories: [],
      rates: {}
    };
  }

  async componentDidMount() {

    const { address } = this.props;

    fetch(
      `${ETHERSCAN_API_URL}/api?module=account&action=tokentx&contractaddress=${CONTRACT_ADDRESS}&address=${address}&page=1&offset=100&sort=asc&apikey=${API_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ histories: data.result });

      });

    const { rates } = this.props;
    this.setState({
      rates: rates
    })
  }

  render() {

    const { histories } = this.state;

    var BigNumber = require('bignumber.js');
    var conf = require('../../../config/conf.json');

    let records;
    let header;

    let rates = this.state.rates;

    if(histories.map != undefined){

      for(let i in histories) {

        var date = new Date(histories[i].timeStamp * 1000 );

        var year  = date.getFullYear();
        var month = date.getMonth() + 1;
        var day  = date.getDate();
        var hour = ( '0' + date.getHours() ).slice(-2);
        var min  = ( '0' + date.getMinutes() ).slice(-2);
        var sec   = ( '0' + date.getSeconds() ).slice(-2);

        histories[i].dateTime1 = year + '/' + month + '/' + day;
        histories[i].dateTime2 = hour + ':' + min + ':' + sec;

      }

      header = (
        <div class="info clearfix">
          <p class="transactions--item__label"></p>
          <p class="transactions--item__hash">Hash Address</p>
          <p class="transactions--item__datetime">Data time</p>
          <p class="transactions--item__price">Price</p>
          <p class="transactions--item__status">Status</p>
        </div>
      );

      records = histories.map(history => (

        <li
          className="list_transactions--item theme-bgA completed clearfix"
          key={history.blockNumber}
        >
          <p className="transactions--item__hash">{history.hash}</p>
          <p className="transactions--item__datetime">
            {' '}
            <span className="date">
              {history.dateTime1}

            </span>
            <span className="time cl_themeA-2">
              {history.dateTime2}
              </span>
          </p>
          <p className="transactions--item__price">
            {' '}
            <span className="coin coin-pce">
              <span className="num coin__num">{new BigNumber(history.value).times(conf.EXCHANGE_WEI_ETH_RATE).toPrecision()}</span>
              <span className="unit coin__unit">{history.tokenSymbol}</span>
            </span>
            <span className="coin coin-usd cl_themeA-2">
              <span className="unit coin__unit">$</span>
              <span className="num coin__num">{new BigNumber(history.value).times(conf.EXCHANGE_WEI_ETH_RATE).times(rates.usdRate).toPrecision()}</span>
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

    }else{

      header = (
        <div class="info clearfix">
          No Transaction was found
        </div>
      );
    }

    return (
      <record>
        {header}
        {records}
      </record>
    );
  }
}

export default PurchaseHistory;
