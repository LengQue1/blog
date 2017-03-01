module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "blogAPI",
      script    : "./start.js",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    },

    // Second application
    // {
    //   name      : "WEB",
    //   script    : "web.js"
    // }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "lwh",
      host : "191.96.43.98",
      ref  : "origin/master",
      repo : "git@github.com:LengQue1/blog.git",
      path : "/home/lwh/www/",
      "post-deploy" : "cd blog/server && npm install && node init-db.js && pm2 startOrRestart ecosystem.json --env production"
    },
  }
}
