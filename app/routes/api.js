const router = require('express').Router();
const Recipe = require('../model/Recipe');
const multer =  require('multer');

const upload = multer({
	dest: 'www/img/uploads',
	limits: {
		fieldSize: 5 * 1024 * 1024 // 5MB
	}
});

module.exports = router
	.get('/user', (req, res) => req.user ? res.send(req.user) : res.status(404).send({error: 'No user found'}))

	.get('(/user)?/recipes(/:category)?', (req, res) => {
		let options = {};

		if(req.path.startsWith('/user') && req.user && req.user._id){
			options.userId = req.user._id;
		}

		if(req.params.category){
			options.category = req.params.category;
		}

		Recipe.find(options, (err, recipes) => {
			if(!err){
				res.send(recipes);
			}
			else{
				console.log(err);
				res.status(500).send('A server error occurred')
			}
		})
	})

	.get('/recipe/:id', (req, res) => {
		Recipe.findById(req.params.id, (err, recipe) => {
			if(!err){
				res.send(recipe);
			}
			else{
				console.log(err);
				res.status(500).send('A server error occurred')
			}
		})
	})

	.post('/recipes', (req, res) => {
		let recipe = new Recipe(req.body);

		recipe.timestamp = Date.now();
		recipe.userId = req.user._id;

		recipe.save((err, recipe) => {
			if(!err){
				res.send(recipe);
			}
			else{
				console.log(err);
				res.status(500).send('A server error occurred')
			}
		});
	})

	.put('/recipes', (req, res) => {
		Recipe.findOneAndUpdate({
			_id: req.body._id,
			userId: req.user._id
		}, {$set: req.body}, {new: true})
		.then(recipe => {
			if(!recipe){
				throw new Error('No recipe found');
			}
			else{
				return res.send(recipe);
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).send('A server error occurred');
		});
	})

	.delete('/recipes/:id', (req, res) => {
		Recipe.findOneAndRemove({
			_id: req.params.id,
			userId: req.user._id
		})
		.then(recipe => {
			if(!recipe){
				throw new Error('No recipe found');
			}
			else{
				return res.send(recipe);
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).send('A server error occurred');
		});
	})

	.post('/image', (req, res) => {
		upload.single('image')(req, res, function(err){
			if(err){
				console.log(err);
				res.status(500).send('A server error occurred');
			}
			else {
				res.send(req.file);
			}
		});
	});
