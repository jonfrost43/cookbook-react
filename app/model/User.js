const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
	name: String,
	googleId: String,
	email: String,
	photo: String,
	accessToken: String,
	refreshToken: String
});

let User = mongoose.model('User', userSchema);

module.exports = User;
