const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("Web3");
const { interface, bytecode } = require("./compile");

// https://rinkeby.etherscan.io/

const provider = new HDWalletProvider(
  "year fabric curtain garbage nasty tag quit idea cotton patient pet bone",
  "https://rinkeby.infura.io/BGLzy4waTqziQIzsOPov"
);
// 'https://mainnet.infura.io/BGLzy4waTqziQIzsOPov'

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("attempting to deploy from accounts", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log(interface);
  console.log("Contract deployed to", result.options.address);
};

deploy();
