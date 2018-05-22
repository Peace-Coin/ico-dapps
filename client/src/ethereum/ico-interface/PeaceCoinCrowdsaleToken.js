import web3 from '../web3';
import PeaceCoinCrowdsaleToken from '../abi-json/PeaceCoinCrowdsaleToken.json';

const address = '0x32179efc8b8ae3e966b28f2e209b37426b1661cd';

export default new web3.eth.Contract(PeaceCoinCrowdsaleToken.abi, address);
