import React, { Component } from 'react';
import conf from '../../../config/conf.json';

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

    let url;
    let contractAddress;
    let key;

    var conf = require('../../../config/conf.json');

    if (process.env.NODE_ENV === 'production') {

      url = conf.ETHERSCAN_API_URL;
      contractAddress = conf.PeaceCoinCrowdsaleTokenAddress;
      key = conf.API_KEY;

    }else{

      url = conf.TEST_ETHERSCAN_API_URL;
      contractAddress = conf.Test_PeaceCoinCrowdsaleTokenAddress;
      key = conf.TEST_API_KEY;
    }

    fetch(
      `${url}/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${address}&page=1&offset=100&sort=asc&apikey=${key}`
    )
    .then(res => res.json())
    .then(data => {
      this.setState({ histories: data.result });
    }).catch(err => {
      console.log(err);
    });

    const { rates } = this.props;
    this.setState({
      rates: rates
    });
  }

  render() {
    let { histories } = this.state;

    var BigNumber = require('bignumber.js');
    var conf = require('../../../config/conf.json');

    let records;
    let header;

    let rates = this.state.rates;

    if (histories.map != undefined && histories.length > 0) {

      histories = histories.slice().reverse();

      for (let i in histories) {
        var date = new Date(histories[i].timeStamp * 1000);

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = ('0' + date.getHours()).slice(-2);
        var min = ('0' + date.getMinutes()).slice(-2);
        var sec = ('0' + date.getSeconds()).slice(-2);

        histories[i].dateTime1 = year + '/' + month + '/' + day;
        histories[i].dateTime2 = hour + ':' + min + ':' + sec;
      }

      header = (
        <div class="info clearfix">
          <p class="transactions--item__label" />
          <p style={{fontSize: '13px'}} class="transactions--item__hash">Hash Address</p>
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
            <span className="date">{history.dateTime1}</span>
            <span className="time cl_themeA-2">{history.dateTime2}</span>
          </p>
          <p className="transactions--item__price">
            {' '}
            <span className="coin coin-pce">
              <span className="num coin__num">
                {new BigNumber(history.value)
                  .times(conf.EXCHANGE_WEI_ETH_RATE)
                  .toPrecision()}
              </span>
              <span className="unit coin__unit">{history.tokenSymbol}</span>
            </span>
            <span className="coin coin-usd cl_themeA-2">
              <span className="unit coin__unit">$</span>
              <span className="num coin__num">
                {new BigNumber(history.value)
                  .times(conf.EXCHANGE_WEI_ETH_RATE)
                  .times(rates.usdRate)
                  .toPrecision()}
              </span>
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
    } else {
      header = <div class="info clearfix">No Transaction was found</div>;
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
