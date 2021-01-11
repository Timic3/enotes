module.exports = {
  apps: [{
    name: 'ENotes',
    interpreter: 'babel-node',
    script: 'src/index.js',
    exec_mode: 'fork',
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
};