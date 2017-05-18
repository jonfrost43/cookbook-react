const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const authConfig = require('./config/auth');
const User = require('./model/User');

module.exports = function(passport){

	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, done);
	});

	passport.use(new GoogleStrategy({
		clientID: authConfig.google.clientID,
		clientSecret: authConfig.google.clientSecret,
		callbackURL: authConfig.google.callbackURL
	},
	function(accessToken, refreshToken, profile, done){
		let query = {
			googleId: profile.id
		};

		let userData = {
			name: profile.displayName,
			googleId: profile.id,
			email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
			photo: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
			accessToken: accessToken,
			refreshToken: refreshToken
		};

		let options = {
			upsert: true,
			new: true,
			setDefaultsOnInsert: true
		};

		User.findOneAndUpdate(query, userData, options, done);
	}));

}
