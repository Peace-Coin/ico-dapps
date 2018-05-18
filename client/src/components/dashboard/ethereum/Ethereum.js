import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter,Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { change } from 'redux-form';
import ProgressBar from '../../UI/ProgressBar';


export default class Ethereum extends Component {

  constructor(props) {
    super(props);

    this.state = {
      amount: "1",
      piaceCoin: "",
      bonus: "",
      totalPiaceCoin: "",
      gasLimit: "",
      gasPrice: "",
      progress: "10",
    }

    this.onChangeByAmount = this.onChangeByAmount.bind(this);

  }

  onChangeByAmount(e) {
    this.setState({ [e.target.name]: e.target.value });

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

    const progress = 50;

    return(
      <div>
        <div>
          <table>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Amount"
                  name="amount"
                  value={this.state.amount}
                  onChange={this.onChangeByAmount}
                />
              </td>
              <td>
                <div>
                  {this.state.piaceCoin}
                </div>
                PIACE COIN
              </td>
              <td>
                +
              </td>
              <td>
                <div>
                  {this.state.bonus}%
                </div>
                BONUS
              </td>
              <td>
                =
              </td>
              <td>
              <div>
                {this.state.totalPiaceCoin}
              </div>
              PIACE COIN
              </td>
            </tr>
          </table>
        </div>
        <div>
          1000 PIACE COIN minimum purchase
        </div>
        <div>
          BONUS 10% 20% 50% 75% 100%
        </div>
        <div>
          <ProgressBar
            progress={this.state.progress}
          />
        </div>
        <div>
          ETH   Ξ1 Ξ5 Ξ10 Ξ20 Ξ50
        </div>
        <div>
          <div>
            Gas limit
            <p>{this.state.gasLimit}</p>
          </div>
          <div>
            Gas price
            <p>{this.state.gasPrice}</p>
          </div>
        </div>
        <div>
          <Link to="/dashboard/profile">MY ETHER WALLET</Link>
        </div>
        <div>
          <Link to="/dashboard/profile">METAMASK</Link>
        </div>
      </div>
    );
  }
}
