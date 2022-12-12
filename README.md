# Binance

A basic web3 app, which can connect to your wallet and perform basic actions.

Needs a WalletConnect project id, to work. There is a .env file with REACT_APP_WALLETCONNECT_PROJECT_ID, set the value to your wallet connecet project id.
For this exercise, I am committing this file with a value but not advisable to do that.

I've used web3modal with walletconnect and wagmi, to be able to connect to multiple wallets.
Used ethers.js functions to get chain id, balance, send transactions.

There is another version (src/components/WalletPlaygroundConnected/index_hooks.tsx) which isn't being used but that used wagmi hooks. There were some issues with that version around multiple chains connectivity while testing.

Used tailwind for quick prototyping + basic styling
