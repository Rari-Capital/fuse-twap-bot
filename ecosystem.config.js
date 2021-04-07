module.exports = {
    apps : [{
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
        PRICE_ORACLE_CONTRACT_ADDRESS: '0x0000000000000000000000000000000000000000',
        SUPPORTED_UNDERLYING_TOKEN_ADDRESSES: '0x6b175474e89094c44da98b954eedeac495271d0f,0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // DAI and USDC, for example
        WEB3_HTTP_PROVIDER_URL: "http://localhost:8546",
        TWAP_POSTING_INTERVAL_SECONDS: 60 * 60
      },
      env_production: {
        NODE_ENV: 'production',
        ETHEREUM_ADMIN_ACCOUNT: '',
        ETHEREUM_ADMIN_PRIVATE_KEY: '',
        PRICE_ORACLE_CONTRACT_ADDRESS: '0x0000000000000000000000000000000000000000',
        SUPPORTED_UNDERLYING_TOKEN_ADDRESSES: '0x6b175474e89094c44da98b954eedeac495271d0f,0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // DAI and USDC, for example
        WEB3_HTTP_PROVIDER_URL: "http://localhost:8545",
        TWAP_POSTING_INTERVAL_SECONDS: 60 * 60 * 24
      }
    }]
  };
  