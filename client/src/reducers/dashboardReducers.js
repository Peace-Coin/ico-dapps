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

      let goalUsd = new BigNumber(action.payload.goalEth).times(action.payload.usdRate).toPrecision();
      let goalUsdBillionAmount = new BigNumber(goalUsd).div(1000000000).toPrecision();

      if(!isFinite(usdRateAmount)){

        usdRateAmount = 0
      }

      if(!isFinite(bitcoinRateAmount)){

        bitcoinRateAmount = 0
      }

      //TEST CODE START
      // var conf = require('../config/conf.json');
      // bitcoinRateAmount = conf.TEST_CALC_NUMBER;
      // usdRateAmount = conf.TEST_CALC_NUMBER;
      //TEST CODE END

      bitcoinRateAmount = PeaceUtil.floatFormat(bitcoinRateAmount, 6);
      bitcoinRateAmount = PeaceUtil.conmaFormat(bitcoinRateAmount);

      usdRateAmount = PeaceUtil.floatFormat(usdRateAmount, 2);
      usdRateAmount = PeaceUtil.conmaFormat(usdRateAmount);

      let totalUsdAmount = new BigNumber(action.payload.totalEthAmount).times(action.payload.usdRate).toPrecision();

      //TEST CODE START
      //totalUsdAmount = conf.TEST_CALC_NUMBER;
      //TEST CODE END

      totalUsdAmount = PeaceUtil.floatFormat(totalUsdAmount, 2);
      totalUsdAmount = PeaceUtil.conmaFormat(totalUsdAmount);

      return updateObject(state, {
        bitcoinRate: action.payload.bitcoinRate,
        usdRate: action.payload.usdRate,
        bitcoinRateAmount: bitcoinRateAmount,
        usdRateAmount: usdRateAmount,
        totalUsdAmount: totalUsdAmount,
        goalUsdBillionAmount: goalUsdBillionAmount,
        goalUsd: goalUsd,
      });
    default:
      return state;
  }
}
