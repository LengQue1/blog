var config = {
  
  appName: 'blog',
  dialect: 'mysql',
  database: 'myblog',

  username: 'root',
  password: '123',
  host: 'localhost',
  port: 3306,

  email: 'lengque6@gmail.com',
  defaultAdminName: 'admin',
  defaultAdminPassword: 'ss8824683',
  
  tokenSecret: 'why',
  tokenExpiresIn: 3600
  
};

module.exports = config;