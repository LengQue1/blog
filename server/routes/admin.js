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
			name: users[0].name,
			timestamp: (new Date()).valueOf(),
		}


		let password = users[0].password;
		
		if (password == ctx.request.body.password) {
			let Token = token.createToken(user);
			 users[0].token = Token;

			 await users[0].save();

			return ctx.body = {
				status: 'success',
				token: Token
			}
			
		} else {
			return ctx.body = {
				status: 'fail',
				description: 'Get token failed. Check the password'
			}
		}
		
	} catch (e) {
		console.log(e)
		return ctx.body = {
			status: 'fail',
			description: 'Check the name'
		}
	}
	
}

exports.logout = async function (ctx, next) {
	
}