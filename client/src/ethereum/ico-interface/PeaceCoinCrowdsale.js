import web3 from '../web3';
import Web3 from 'web3';
import PeaceCoinCrowdsale from '../abi-json/PeaceCoinCrowdsale.json';

var conf = require('../../config/conf.json');
const address = conf.PeaceCoinCrowdsaleAddress;

export default new web3.eth.Contract(PeaceCoinCrowdsale.abi, address);
