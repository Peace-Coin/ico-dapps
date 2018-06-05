import { GET_RATE } from '../actions/types';

import { updateObject } from '../shared/utility';
const PeaceUtil = require('../util/PeaceUtil');

const intialState = {

};

export default function(state = intialState, action) {
  switch (action.type) {
    case GET_RATE:

    var BigNumber = require('bignumber.js');

      //bitcoin計算
      let bitcoinRateAmount = new BigNumber(action.payload.ethAmount).times(action.payload.bitcoinRate).toPrecision();

      //usd計算
      let usdRateAmount = new BigNumber(action.payload.ethAmount).times(action.payload.usdRate).toPrecision();

      let goalBitcoin = new BigNumber(action.payload.goalEth).times(action.payload.bitcoinRate).toPrecision();
      let goalUsd = new BigNumber(action.payload.goalEth).times(action.payload.usdRate).toPrecision();

      if(!isFinite(usdRateAmount)){

        usdRateAmount = 0
      }

      if(!isFinite(bitcoinRateAmount)){

        bitcoinRateAmount = 0
      }

      bitcoinRateAmount = String(bitcoinRateAmount).replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        '$1,'
      );

      usdRateAmount = String(usdRateAmount).replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        '$1,'
      );

      let totalUsdAmount = new BigNumber(action.payload.totalEthAmount).times(action.payload.usdRate).toPrecision();

      console.log('action.payload.totalEthAmount -> ' + action.payload.totalEthAmount)
      console.log('action.payload.usdRate -> ' + action.payload.usdRate)

      totalUsdAmount = String(totalUsdAmount).replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        '$1,'
      );

      console.log('usdRateAmount')
      console.log(usdRateAmount)
      console.log('bitcoinRateAmount')
      console.log(bitcoinRateAmount)
      console.log('totalUsdAmount')
      console.log(totalUsdAmount)

      return updateObject(state, {
        bitcoinRate: action.payload.bitcoinRate,
        usdRate: action.payload.usdRate,
        bitcoinRateAmount: bitcoinRateAmount,
        usdRateAmount: usdRateAmount,
        totalUsdAmount: totalUsdAmount,
        goalBitcoin: goalBitcoin,
        goalUsd: goalUsd,
      });
    default:
      return state;
  }
}
