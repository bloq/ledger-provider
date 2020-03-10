# Ledger wallet provider

## setup
```bash
$ npm install bloq/ledger-provider --save    # Install local dependencies
```
## usage

```bash
const LedgerWalletProvider = require('ledger-provider')
const Web3 = require("Web3");

async function test() {
    const ledgerWalletProvider = new LedgerWalletProvider(<rpcURL>)

    web3 = new Web3(ledgerWalletProvider)
    let accounts = await web3.eth.getAccounts()
    console.log('accounts', accounts)
    return web3.eth.sendTransaction({
        from: accounts[0],
        to: <to address>,
        value: <amount>
    })
}

test()
    .then(console.log)
    .catch(console.log)


```