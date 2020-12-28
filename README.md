# Fuse by Rari Capital: Uniswap V2 TWAP Bot

This repository contains the JavaScript source code for the Fuse Uniswap V2 TWAP Bot. See [here for the Fuse dApp](https://github.com/Rari-Capital/fuse-dapp), [here for the Fuse SDK](https://github.com/Rari-Capital/fuse-sdk), or [here for the Fuse contracts](https://github.com/Rari-Capital/fuse-contracts).

## How it works

The [`UniswapView` price oracle](https://github.com/Rari-Capital/open-oracle/blob/master/contracts/Uniswap/UniswapView.sol) provides on-chain price data to Fuse pools via [TWAPs of Uniswap V2 pairs](https://uniswap.org/docs/v2/core-concepts/oracles/) based in ETH. If you are deploying your own `UniswapView` or using prices for which others are not posting TWAPs, you will need to run a bot to compute TWAPs and post them to the `UniswapView`. Note that the more often you compute and post TWAPs and the more assets you do so for, the ETH you will spend on gas fees. However, also note that infrequent updates to an asset's price could leave room for attackers to profit via arbitrage at the expense of your users.

## Installation

We had success building the dApp using Node.js `v12.16.1` with the latest version of NPM.

To install the bot's dependencies: `npm install`

## Running the bot

`npm start`

## License

See `LICENSE`.

## Credits

Fuse's dApp is developed by [David Lucid](https://github.com/davidlucid) of Rari Capital. Find out more about Rari Capital at [rari.capital](https://rari.capital).
