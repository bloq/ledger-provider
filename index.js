const TransportNodeHid = require("@ledgerhq/hw-transport-node-hid").default;
const FetchSubprovider = require("web3-provider-engine/subproviders/fetch");
const ProviderEngine = require("web3-provider-engine");
const createLedgerSubprovider = require("@ledgerhq/web3-subprovider").default;

const defaultOptions = {
  networkId: 1,
  paths: ["44'/60'/0'/0/0"],
  accountsLength: 1,
  askConfirm: true,
};
function LedgerWalletProvider(
  rpcUrl = "http://127.0.0.1:8545",
  options = defaultOptions
) {
  const getTransport = async () => {
    return TransportNodeHid.create(5000).then((transport) => {
      transport.setDebugMode(true);
      return transport;
    });
  };
  const ledger = createLedgerSubprovider(getTransport, options);
  this.engine = new ProviderEngine();
  this.engine.addProvider(ledger);
  this.engine.addProvider(new FetchSubprovider({ rpcUrl }));
  this.engine.start();
  return this.engine;
}

LedgerWalletProvider.prototype.sendAsync = function() {
  this.engine.sendAsync.apply(this.engine, arguments);
};

LedgerWalletProvider.prototype.send = function() {
  return this.engine.send.apply(this.engine, arguments);
};

module.exports = LedgerWalletProvider;
