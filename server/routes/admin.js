const token = require('../token/index')
const model = require('../model')
const User = model.User
exports.login = async function (ctx, next) {
	var user, users;
	try {
		
		users = await User.findAll({
			where: {
				username: ctx.request.body.username
			}
		});
		
		user = {
			name: users[0].name,
			timestamp: (new Date()).valueOf(),
		};

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
		console.log(e);
		return ctx.body = {
			status: 'fail',
			description: 'Check the name'
		}
	}
	
}

exports.logout = async function (ctx, next) {
	let tokenClient;
	try {
        tokenClient = ctx.request.headers['authorization'];
	} catch (err) {
		return ctx.body = {
			status: 'fail',
			description: err
		}
	}

	if (!tokenClient) {
		return ctx.body = {
			status: 'fail',
			description: 'Token no fount'
		}
	}

	const result = token.verifyToken(tokenClient);
	// 如果用密匙解析不了
	if (result == false) {
		return ctx.body = {
			status: 'fail',
			description: 'token verify failed'
		};
	} else {
		await User.update({ token: null }, { where: { token: tokenClient } })
		return ctx.body = {
			status: 'success',
			description: 'token deleted'
		}
	}
};

exports.permission = async function (ctx, next) {
	let tokenClient;

	try {
		tokenClient = ctx.request.headers['authorization']
	} catch (e) {
		return ctx.body = {
			status: 'fail',
			description: e
		}
	}


	if (!tokenClient) {
		return ctx.body = {
			status: 'fail',
			description: 'token no fount'
		}
	}

	const result = token.verifyToken(tokenClient);

	if (result == false) {
		return ctx.body = {
			status: 'fail',
			description: 'token verify failed'
		};
	}

	let tokenServer = await User.findAll({ attributes: ['token']});

	if (tokenServer[0].token === tokenClient) {
        console.log('验证成功！');
		return next();
	} else {
		return ctx.body = {
			status: 'fail',
			description: 'Token invalid'
		};
	}

};