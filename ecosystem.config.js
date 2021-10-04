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
      SUPPORTED_PAIRS: '0x33f6ddaea2a8a54062e021873bcaee006cdf4007|0xD533a949740bb3306d119CC777fa900bA034cd52,0x4556c4488cc16d5e9552cc1a99a529c1392e4fe9|0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48,0x0d8a21f2ea15269b7470c347083ee1f85e6a723b|0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // cvxCRV-CRV (Sushi), OT-cDAI-29DEC2022-USDC (Sushi), OT-aUSDC-29DEC2022-USDC (Sushi)
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
      SUPPORTED_PAIRS: '0x33f6ddaea2a8a54062e021873bcaee006cdf4007|0xD533a949740bb3306d119CC777fa900bA034cd52,0x4556c4488cc16d5e9552cc1a99a529c1392e4fe9|0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48,0x0d8a21f2ea15269b7470c347083ee1f85e6a723b|0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // cvxCRV-CRV (Sushi), OT-cDAI-29DEC2022-USDC (Sushi), OT-aUSDC-29DEC2022-USDC (Sushi)
      DEFAULT_MIN_PERIOD: 1800,
      DEFAULT_DEVIATION_THRESHOLD: 0.05,
      WEB3_HTTP_PROVIDER_URL: "http://localhost:8545",
      TWAP_UPDATE_ATTEMPT_INTERVAL_SECONDS: 30,
      SPEED_UP_TRANSACTION_AFTER_SECONDS: 120,
      REDUNDANCY_DELAY_SECONDS: 0 // Set to an integer greater than 0 to delay posting TWAPs for redundancy
    }
  }]
};
