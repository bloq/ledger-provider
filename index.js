const TransportNodeHid = require("@ledgerhq/hw-transport-node-hid").default;
const FetchSubprovider = require("web3-provider-engine/subproviders/fetch")
const ProviderEngine = require('web3-provider-engine');
const createLedgerSubprovider = require('@ledgerhq/web3-subprovider').default;

function LedgerWalletProvider(
    provider,
    networkId = 3,
    path = "m/44'/60'/0'/0/"
) {
    const getTransport = async () => {
        return TransportNodeHid.create(5000).then(transport => {
            transport.setDebugMode(true)
            return transport
        })
    }
    const ledger = createLedgerSubprovider(getTransport, {
        networkId,
        paths: [path],
        accountsLength: 1
    });
    this.engine = new ProviderEngine()
    this.engine.addProvider(ledger)
    this.engine.addProvider(new FetchSubprovider({ rpcUrl: provider }));
    this.engine.start()
    return this.engine
}

LedgerWalletProvider.prototype.sendAsync = function () {
    this.engine.sendAsync.apply(this.engine, arguments);
}

LedgerWalletProvider.prototype.send = function () {
    return this.engine.send.apply(this.engine, arguments);
}

module.exports = LedgerWalletProvider;