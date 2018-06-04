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

      bitcoinRateAmount = String(bitcoinRateAmount).replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        '$1,'
      );

      usdRateAmount = String(usdRateAmount).replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        '$1,'
      );

      let totalUsdAmount = new BigNumber(action.payload.totalEthAmount).times(action.payload.usdRate).toPrecision();

      totalUsdAmount = String(totalUsdAmount).replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        '$1,'
      );

      if(isNaN(usdRateAmount)){

        usdRateAmount = 0
      }

      if(isNaN(bitcoinRateAmount)){

        bitcoinRateAmount = 0
      }

      console.log('usdRateAmount')
      console.log(usdRateAmount)
      console.log('bitcoinRateAmount')
      console.log(bitcoinRateAmount)

      return updateObject(state, {
        bitcoinRate: action.payload.bitcoinRate,
        usdRate: action.payload.usdRate,
        bitcoinRateAmount: bitcoinRateAmount,
        usdRateAmount: usdRateAmount,
        totalUsdAmount: totalUsdAmount,
      });
    default:
      return state;
  }
}
