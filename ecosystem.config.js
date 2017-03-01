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
      script: "./client/front/server.js",
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
      host : "191.96.43.98",
      ref  : "origin/master",
      repo : "git@github.com:LengQue1/blog.git",
      path : "/home/lwh/www/blog",
      "post-deploy" : "cd server && yarn && node init-db.js && cd ../client/front && yarn && npm run build && cd ../blog_back && yarn && npm run build && pm2 startOrRestart ecosystem.json --env production"
    },
  }
}
