const mongoose = require('mongoose');

let recipeSchema = mongoose.Schema({
	name: String,
	ingredients: [{
		quantity: Number,
		unit: String,
		text: String
	}],
	method: [{
		text: String
	}],
	image: String,
	category: Number,
	timestamp: Date,
	userId: mongoose.Schema.ObjectId
});

let Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
