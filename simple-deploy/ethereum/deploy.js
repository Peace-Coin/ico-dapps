const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const PeaceCoinCrowdsaleToken = require('../build/contracts/PeaceCoinCrowdsaleToken.json');

const Provider = new HDWalletProvider(
  'year fabric curtain garbage nasty tag quit idea cotton patient pet bone',
  'https://rinkeby.infura.io/AUMpzXam2BRfzMQULuUe'
);

const web3 = new Web3(Provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account: ', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(PeaceCoinCrowdsaleToken.abi)
  )
    .deploy({ data: PeaceCoinCrowdsaleToken.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};

deploy();
