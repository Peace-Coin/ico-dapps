import web3 from '../web3';
import PeaceCoinCrowdsaleToken from '../abi-json/PeaceCoinCrowdsaleToken.json';

var conf = require('../../config/conf.json');
const address = conf.PeaceCoinCrowdsaleTokenAddress;

export default new web3.eth.Contract(PeaceCoinCrowdsaleToken.abi, address);
