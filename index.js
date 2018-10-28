const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const axios = require('axios');
const db = require('./app/db');
const pkg = require('./package.json');
const port = process.env.PORT || 3000;
const app = express();
const api = express();

require('./app/passport')(passport);

db.connect(() => console.log('db connected'));

app
	.use(bodyParser.json({ limit: '10mb' }))
	.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
	.use(cookieParser())
	.use(cookieSession({secret:'c00kb00k'}))
	.use(passport.initialize())
	.use(passport.session())
	.use(express.static(__dirname + '/www'))
	.use('/api', api);

api.use(require('./app/routes/api'));

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
	passport.authenticate('google', {failureRedirect: '/'}),
	(req, res) => res.redirect('/')
);

app.get('/auth/logout', (req, res) => {
	req.logout();
	res.redirect('/')
});

app.get('/recipe/:name/(:id)(/edit)?', (req, res, next) => {
	axios(`http://localhost:3000/api/recipe/${req.params.id}`)
		.then(response => {
			req.titlePrefix = response.data.name ? response.data.name+' | ' : ''
			next()
		})
		.catch(err => {
			res.status(500).send('A server error occurred')
		});
});

app.get('*', (req, res) => {
	let titlePrefix = req.titlePrefix || '';

	res.send(`
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
				<link rel="stylesheet" href="/style/reset.css" />
				<link rel="stylesheet" href="/style/layout.css" />
				<link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
				<title>${titlePrefix}Cookbook in React</title>
			</head>
			<body>
				<div id="app"></div>
				<script src="/bundle.js"></script>
			</body>
		</html>
	`);
});

app.listen(port, () => console.log(pkg.name + ' app listening on port ' + port));
