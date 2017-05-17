const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const pkg = require('./package.json');
const port = process.env.PORT || 3000;
const app = express();

require('./app/passport')(passport);

app.use(express.static('www'))
	.use(bodyParser.urlencoded({ extended: false }))
	.use(cookieParser())
	.use(cookieSession({secret:'c00kb00k'}))
	.use(passport.initialize())
	.use(passport.session());

app.get('/user', (req, res) => res.send(req.user));

app.get('/auth/google',
	passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/calendar'
		]
	})
);

app.get('/auth/google/callback',
	passport.authenticate('google', {failureRedirect: '/login'}),
	(req, res) => res.redirect('/')
);

app.listen(3000, () => {
	console.log(pkg.name + ' app listening on port ' + port);
})
