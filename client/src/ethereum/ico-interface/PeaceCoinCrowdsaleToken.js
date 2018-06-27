import web3 from '../web3';
import PeaceCoinCrowdsaleToken from '../abi-json/PeaceCoinCrowdsaleToken.json';

var conf = require('../../config/conf.json');
let address;

if (process.env.NODE_ENV === 'production') {

  address = conf.PeaceCoinCrowdsaleTokenAddress;

}else{

  address = conf.Test_PeaceCoinCrowdsaleTokenAddress;
}

export default new web3.eth.Contract(PeaceCoinCrowdsaleToken.abi, address);
