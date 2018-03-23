const db = require('../db');
const User = require('../model/User');
const Recipe = require('../model/Recipe');
const recipes = require('../../src/data/recipes');

db.connect(connection => {
	console.log('db connected');

	User.findOne({
		email: 'jonfrost43@gmail.com'
	}, (err, user) => {
		if(!err){
			console.log('Found user: ' + user.email);
			recipes.forEach((r, i) => {
				let recipe = new Recipe(r);

				recipe.timestamp = Date.now();
				recipe.userId = user._id;

				recipe.save((err, savedRecipe) => {
					if(!err){
						console.log('savedRecipe: ' + r.name);
						if(i === recipes.length-1){
							process.exit();
						}
					}
					else{
						console.log(err);
						process.exit(1);
					}
				});
			});
		}
		else{
			console.log('No user found');
		}
	});

});
