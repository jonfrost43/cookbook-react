const db = require('../db');
const Recipe = require('../model/Recipe');

db.connect(connection => {
	Recipe.collection.drop(function(err){
		if(!err){
			console.log('dropped Recipes collection');
			process.exit();
		}
		else{
			console.log(err);
			process.exit(1);
		}
	});
});
