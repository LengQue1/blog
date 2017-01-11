
module.exports = {
  'POST /signin': async (ctx, next) => {
    var email = ctx.request.body.email || '',
	   password = ctx.request.body.password || '';
	if (email === 'admin@example.com' && password === '123456') {
	  console.log('signin in ok');
	  ctx.render('signin-ok.html',{
	    title: 'Sign In ok',
		name: 'Mr Node'
	  });
	} else {
	  console.log('signin failed!');
	  ctx.render('signin-failed.html', {
	    title: 'Signin in failed'
	  });
	}
  }
};