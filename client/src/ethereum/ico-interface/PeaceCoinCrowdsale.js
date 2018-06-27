import web3 from '../web3';
import Web3 from 'web3';
import PeaceCoinCrowdsale from '../abi-json/PeaceCoinCrowdsale.json';

var conf = require('../../config/conf.json');
let address;

if (process.env.NODE_ENV === 'production') {

  address = conf.PeaceCoinCrowdsaleAddress;

}else{

  address = conf.Test_PeaceCoinCrowdsaleAddress;
}

export default new web3.eth.Contract(PeaceCoinCrowdsale.abi, address);
