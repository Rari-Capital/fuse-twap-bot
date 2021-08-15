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
      ROOT_PRICE_ORACLE_CONTRACT_ADDRESS: '0xA170Dba2Cd1f68cDd7567CF70184D5492D2E8138',
      SUPPORTED_PAIRS: '0x0F82E57804D0B1F6FAb2370A43dcFAd3c7cB239c,0x4d96369002fc5b9687ee924d458a7e5baa5df34e,0xC3f279090a47e80990Fe3a9c30d24Cb117EF91a8|1800|0.02,0x0dACb47E00aed6AbAdE32c7B398e029393E0D848,0x73E02EAAb68a41Ea63bdae9Dbd4b7678827B2352,0xf91c12dae1313d0be5d7a27aa559b1171cc1eac5,0x10b47177e92ef9d5c6059055d92ddf6290848991,0xc465c0a16228ef6fe1bf29c04fdb04bb797fd537,0xd4e7a6e2d03e4e48dfc27dd3f46df1c176647e38', // YAM (Sushi), MPH (Uni), ALCX (Sushi), SOCKS (Uni), INV (Uni), ETH2x-FLI (Uni), yveCRV-DAO (Sushi), SDT (Uni), TOKE (Sushi)
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
      ROOT_PRICE_ORACLE_CONTRACT_ADDRESS: '0xA170Dba2Cd1f68cDd7567CF70184D5492D2E8138',
      SUPPORTED_PAIRS: '0x0F82E57804D0B1F6FAb2370A43dcFAd3c7cB239c,0x4d96369002fc5b9687ee924d458a7e5baa5df34e,0xC3f279090a47e80990Fe3a9c30d24Cb117EF91a8|1800|0.02,0x0dACb47E00aed6AbAdE32c7B398e029393E0D848,0x73E02EAAb68a41Ea63bdae9Dbd4b7678827B2352,0xf91c12dae1313d0be5d7a27aa559b1171cc1eac5,0x10b47177e92ef9d5c6059055d92ddf6290848991,0xc465c0a16228ef6fe1bf29c04fdb04bb797fd537,0xd4e7a6e2d03e4e48dfc27dd3f46df1c176647e38', // YAM (Sushi), MPH (Uni), ALCX (Sushi), SOCKS (Uni), INV (Uni), ETH2x-FLI (Uni), yveCRV-DAO (Sushi), SDT (Uni), TOKE (Sushi)
      DEFAULT_MIN_PERIOD: 1800,
      DEFAULT_DEVIATION_THRESHOLD: 0.05,
      WEB3_HTTP_PROVIDER_URL: "http://localhost:8545",
      TWAP_UPDATE_ATTEMPT_INTERVAL_SECONDS: 30,
      SPEED_UP_TRANSACTION_AFTER_SECONDS: 120,
      REDUNDANCY_DELAY_SECONDS: 0 // Set to an integer greater than 0 to delay posting TWAPs for redundancy
    }
  }]
};
