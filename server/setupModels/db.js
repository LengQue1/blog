const Sequelize = require('sequelize');
const config = require('../config/config-default');
const uuid = require('node-uuid');
const moment = require('moment');
console.log('init sequelize ...');

function generateId() {
  return uuid.v4();
}

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  define: {
	charset: 'utf8',
	collate: 'utf8_general_ci'
  },
	pool: {
	  max: 5,
	  min: 0,
	  idle: 10000
  }
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes, Methods) {
  var attrs = {};
  var methods = Methods ? Methods : {};
  for (let key in attributes){
    let value = attributes[key];
		if (typeof value === 'object' && value['type']) {
			value.allowNull = value.allowNull || false;
			attrs[key] = value;
		} else {
			attrs[key] = {
				type: value,
				allowNull: false
			};
		}
  }
  attrs.id = {
    type: ID_TYPE,
		primaryKey: true
  };
  attrs.createdAt = {
    type: Sequelize.STRING(50),
		allowNull: false
  };
  attrs.updateAt = {
    type: Sequelize.STRING(50),
		allowNull: false
  };
  // attrs.version = {
  //   type: Sequelize.BIGINT,
	// allowNull: false
  // };
  console.log('model defined for table:' + name + '\n' + JSON.stringify(attrs, function (k, v) {
	 if (k === 'type') {
	   for (let key in Sequelize) {
	     if (key === 'ABSTRACT' || key === 'NUMBER') {
	       continue;
		 }
		 let dbType = Sequelize[key];
		 if (typeof dbType === 'function') {
		   if (v instanceof dbType) {
		     if (v._length) {
		       return `${dbType.key}(${v._length})`;
			 }
			 return dbType.key;
		   }
		   if (v === dbType) {
		     return dbType.key;
		   }
		 }
	   }
	 }
	 return v;
	 }, ''));
  
  return sequelize.define(name, attrs, {
    tableName: name,
		timestamps: false,
    classMethods: methods,
		hooks: {
				beforeValidate: function (obj) {
				let now = moment().format('YYYY-MM-DD HH:mm:ss');
				if (obj.isNewRecord) {
					console.log('will create entity...' + obj);
					if (!obj.id) {
						obj.id = generateId();
					}
					obj.createdAt = now;
					obj.updateAt = now;
				} else {
					console.log('will update entity ...');
					obj.updateAt = now;
					// obj.version ++;
				}
			}
		}
  });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

var exp = {
  defineModel: defineModel,
  sequelize: sequelize,
  sync: () => {
	// only allow create ddl in non-production environment:
	if (process.env.NODE_ENV !== 'production') {
	  return sequelize.sync({ force: true });
	} else {
	  throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
	}
  }
};

for (let type of TYPES) {
  exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;