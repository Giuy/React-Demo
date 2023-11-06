// module.exports = {
//   apps : [{
//     script: 'index.js',
//     watch: '.'
//   }, {
//     script: './service-worker/',
//     watch: ['./service-worker']
//   }],

//   deploy : {
//     production : {
//       user : 'SSH_USERNAME',
//       host : 'SSH_HOSTMACHINE',
//       ref  : 'origin/master',
//       repo : 'GIT_REPOSITORY',
//       path : 'DESTINATION_PATH',
//       'pre-deploy-local': '',
//       'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
//       'pre-setup': ''
//     }
//   }
// };

module.exports = {
  apps: [
    {
      name: "VNRealty",
      script: "node",
      args: "server.js",
      watch: false,
      instances: 1,
      autorestart: true,
      max_memory_restart: "2G",
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
