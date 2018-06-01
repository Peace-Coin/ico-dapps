import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter,Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { change } from 'redux-form';
import ProgressBar from '../../UI/ProgressBar';
import PeaceCoinCrowdsaleToken from '../../../ethereum/ico-interface/PeaceCoinCrowdsaleToken';
import PeaceCoinCrowdsale from '../../../ethereum/ico-interface/PeaceCoinCrowdsale';
import web3 from '../../../ethereum/web3';

export default class Ethereum extends Component {

  constructor(props) {
    super(props);

    this.state = {

      amount: "1", //use initial input value
      piaceCoin: "", //not use
      bonus: "", //not use
      totalPiaceCoin: "", //not use

      //confが優先される
      gasLimit: '',
      gasPrice: '',

      //initial progress bar value -> call component delete
      progress: "10",

      // eth <- change function -> pce
      pce: '0',
      rate: 0, //initial

      myEtherWalletUrl: '', //href

      errMessage: '',
    }

    this.onChangeByAmount = this.onChangeByAmount.bind(this);
    this.buyToken = this.buyToken.bind(this);
  }

  async componentDidMount() {

    let rate = await PeaceCoinCrowdsale.methods.rate().call();
    let accounts = await web3.eth.getAccounts();
    let investor = accounts[0];

    this.setState({ eth: String(Number(1) * this.state.rate).replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      '$1,'
    )});

    const { ethreumAddress } = this.props;
    var conf = require('../../../config/conf.json');
    let gasLimit = conf.GasLimit
    let gasPrice = conf.GasPrice

    let myEtherWalletUrl = 'https://www.myetherwallet.com/?to=' +ethreumAddress + '&value=1&gas=' + gasLimit + '&gasprice=' + gasPrice + '#send-transaction';

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
    });


  }

  buyToken(e){

      e.preventDefault();
      PeaceCoinCrowdsale.methods.buyTokens(this.state.investor).send({
        from: this.state.investor,
        value: web3.utils.toWei(this.state.amount, 'ether'),
      }).then(res => {

        this.setState({
          errMessage: ''
        })
      })
      .catch(err => {

        this.setState({
          errMessage: 'PLEASE CHECK METAMASK LOGIN or INSTALL METAMASK TOOL'
        })
      });
  }

  onChangeByAmount(e) {
    this.setState({ [e.target.name]: e.target.value });

    this.setState({ pce: String(Number(e.target.value) / this.state.rate).replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      '$1,'
    )});

    if(e.target.value >= 50){

      this.setState({ progress: "100" });

    }else if(e.target.value >= 20){

      this.setState({ progress: "75" });

    }else if(e.target.value >= 10){

      this.setState({ progress: "50" });

    }else if(e.target.value >= 5){

      this.setState({ progress: "20" });

    }else if(e.target.value >= 1){

      this.setState({ progress: "10" });

    }else{

      this.setState({ progress: "0" });
    }
  }

  render() {

    return(
      <div style={{fontSize: '16px'}}>
        <div>
          <input
            type="text"
            placeholder="Amount"
            name="amount"
            value={this.state.amount}
            onChange={this.onChangeByAmount}
          />
        ETH
        </div>
        <div>
          {this.state.pce}  PCE
        </div>
        <div>
          <div>
            Gas limit
            <p>{this.state.gasLimit}</p>
          </div>
          <div>
            Gas price {this.state.gasPrice}
          </div>
        </div>
        <div>
          <a href={this.state.myEtherWalletUrl}>MY ETHER WALLET</a>
        </div>
        <div>
          <div onClick={this.buyToken}>METAMASK</div>
        </div>
        <div style={{backgroundColor: 'red', fontSize: '16px'}}>
          {this.state.errMessage}
        </div>
      </div>
    );
  }
}
