const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport){

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		// User.findById(id, function(err, user) {
		// 	done(err, user);
			done(null, {displayName: 'Joey Spinoza'})
		// });
	});

	passport.use(new GoogleStrategy({
		clientID: 'xxx',
		clientSecret: 'xxx',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	function(accessToken, refreshToken, profile, done){
		console.log('profile:', profile);
		done(null, profile);
	}));

}
