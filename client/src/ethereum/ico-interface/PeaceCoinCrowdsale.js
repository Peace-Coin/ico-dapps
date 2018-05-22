import web3 from '../web3';
import PeaceCoinCrowdsale from '../abi-json/PeaceCoinCrowdsale.json';

const address = '0xe726a229c513ec66f34d2edff3ac9461772656cb';

export default new web3.eth.Contract(PeaceCoinCrowdsale.abi, address);
