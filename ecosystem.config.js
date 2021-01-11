module.exports = {
  apps: [{
    name: 'ENotes',
    interpreter: 'babel-node',
    script: 'src/index.js',
    exec_mode: 'fork',
    cwd: process.env.SSH_PATH + '/enotes/source/backend/',
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
      ref: 'origin/feature/ci',
      repo: 'git@github.com:Timic3/enotes.git',
      path: process.env.SSH_PATH,
      'post-deploy': 'cd ./backend && npm install && pm2 reload ecosystem.config.js --env production'
    },
  }
};