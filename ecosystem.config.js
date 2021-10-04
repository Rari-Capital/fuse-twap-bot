module.exports = {
  apps: [{
    name: 'fuse-twap-bot',
    script: 'index.js',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    // args: 'one two',
    // instances: 1,
    // autorestart: true,
    // watch: false,
    // max_memory_restart: '1G',
    time: true,
    env: {
      NODE_ENV: 'development',
      ETHEREUM_ADMIN_ACCOUNT: '',
      ETHEREUM_ADMIN_PRIVATE_KEY: '',
      ROOT_PRICE_ORACLE_CONTRACT_ADDRESS: '0xf1860b3714f0163838cf9ee3adc287507824ebdb',
      SUPPORTED_PAIRS: '0x97c4adc5d28a86f9470c70dd91dc6cc2f20d2d4d|0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48,0x088ee5007c98a9677165d78dd2109ae4a3d04d0c|0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // For example: FRAX/USDC (Uniswap), YFI/ETH (SushiSwap)
      DEFAULT_MIN_PERIOD: 1800,
      DEFAULT_DEVIATION_THRESHOLD: 0.05,
      WEB3_HTTP_PROVIDER_URL: "http://localhost:8546",
      TWAP_UPDATE_ATTEMPT_INTERVAL_SECONDS: 60,
      SPEED_UP_TRANSACTION_AFTER_SECONDS: 120,
      REDUNDANCY_DELAY_SECONDS: 0 // Set to an integer greater than 0 to delay posting TWAPs for redundancy
    },
    env_production: {
      NODE_ENV: 'production',
      ETHEREUM_ADMIN_ACCOUNT: '',
      ETHEREUM_ADMIN_PRIVATE_KEY: '',
      ROOT_PRICE_ORACLE_CONTRACT_ADDRESS: '0xf1860b3714f0163838cf9ee3adc287507824ebdb',
      SUPPORTED_PAIRS: '0x97c4adc5d28a86f9470c70dd91dc6cc2f20d2d4d|0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48,0x088ee5007c98a9677165d78dd2109ae4a3d04d0c|0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // For example: FRAX/USDC (Uniswap), YFI/ETH (SushiSwap)
      DEFAULT_MIN_PERIOD: 1800,
      DEFAULT_DEVIATION_THRESHOLD: 0.05,
      WEB3_HTTP_PROVIDER_URL: "http://localhost:8545",
      TWAP_UPDATE_ATTEMPT_INTERVAL_SECONDS: 30,
      SPEED_UP_TRANSACTION_AFTER_SECONDS: 120,
      REDUNDANCY_DELAY_SECONDS: 0 // Set to an integer greater than 0 to delay posting TWAPs for redundancy
    }
  }]
};
