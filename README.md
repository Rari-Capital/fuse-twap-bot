[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
# Fuse by Rari Capital: Uniswap V2 TWAP Bot

This repository contains the JavaScript source code for the Fuse Uniswap V2 TWAP Bot. See [here for the Fuse dApp](https://github.com/Rari-Capital/fuse-dapp), [here for the Fuse SDK](https://github.com/Rari-Capital/fuse-sdk), or [here for the Fuse contracts](https://github.com/Rari-Capital/fuse-contracts).

## How it works

This bot updates on-chain price data for Fuse pools via [TWAPs of Uniswap V2 (and SushiSwap) pairs](https://uniswap.org/docs/v2/core-concepts/oracles/) based in ETH. If you are using prices for which others are not reliably posting TWAPs, you will need to run a bot and a redundancy bot; if others are reliably posting TWAPs, simply run your own redundancy bot for additional security. Note that the more often you update the oracle and the more assets you do so for, the ETH you will spend on gas fees. However, also note that infrequent updates to an asset's price could leave room for attackers to profit via arbitrage at the expense of your users.

## Installation

You'll want to run the script on the latest Node.js LTS (tested with v12.16.1) with the latest version of NPM.

Install PM2 (process manager) globally: `npm i -g pm2`

Install `fuse-twap-bot` dependencies: `npm i` or `npm install`

## Usage

Configure your environment in `ecosystem.config.js`.

Start the rebalancer with PM2: `pm2 start ecosystem.config.js` (for production usage, add `--env production`)

Stop with PM2: `pm2 stop ecosystem.config.js`

Check process status with PM2: `pm2 list`

Find PM2 logs in `~/.pm2/logs`.

## License

See `LICENSE`.

## Credits

Fuse's dApp is developed by [David Lucid](https://github.com/davidlucid) of Rari Capital. Find out more about Rari Capital at [rari.capital](https://rari.capital).
