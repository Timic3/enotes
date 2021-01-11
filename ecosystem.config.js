module.exports = {
  apps: [{
    name: 'ENotes',
    script: 'backend/src/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
  deploy: {
    production: {
      key: 'enotes-key',
      user: process.env.SSH_USER,
      host: process.env.SSH_HOST,
      ref: 'origin/master',
      repo: 'git@github.com:Timic3/enotes.git',
      path: process.env.SSH_PATH,
      'post-deploy': 'npm install && pm2 reload ecosystem.config.cjs --env production'
    },
  }
};