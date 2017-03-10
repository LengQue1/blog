module.exports = {
  apps : [
    {
      name: "server",
      script: "./server/start.js",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      },
      ignore_watch: ['node_modules'],
      watch: true
    },
    {
      name: "front",
      script: "./client/front/production.js",
      env_production : {
          NODE_ENV: "production"
      },
      ignore_watch: ['node_modules'],
      watch: true
    }
  ],
  deploy : {
    production : {
      user : "lwh",
      host : "139.199.200.195",
      ref  : "origin/master",
      repo : "git@github.com:LengQue1/blog.git",
      path : "/home/lwh/www/blog",
      "post-deploy" : "cd server && cnpm install && npm run initdb && cd ../client/front && cnpm install && npm run build && cd ../blog_back/ && cnpm install && npm run build && cd ../../ && pm2 startOrRestart ecosystem.config.js --env production"
    },
  }
}
