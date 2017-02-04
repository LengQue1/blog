const token = require('../token/index')
const model = require('../model')
const User = model.User
exports.login = async function (ctx, next) {
	var user, users;
	try {
		
		users = await User.findAll({
			where: {
				name: ctx.request.body.username
			}
		})
		
		user = {
			name: users[0].dataValues.name,
			timestamp: (new Date()).valueOf(),
		}
		console.log(user)
			
		let password = users[0].dataValues.password;
		
		if (password == ctx.request.body.password) {
			// let token = token.createToken(user);
			// users[0].dataValues.token = token;
			// console.log(users[0].dataValues.token)
			return ctx.body = {
				status: 'success',
				token: 'asdfshjkfhs!@#@!r$#r#1123213213213'
			}
			
		} else {
			return ctx.body = {
				status: 'fail',
				description: 'Get token failed. Check the password'
			}
		}
		
	} catch (e) {
		return ctx.body = {
			status: 'fail',
			description: 'Check the name'
		}
	}
	
}

exports.logout = async function (ctx, next) {
	
}