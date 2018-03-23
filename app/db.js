const mongoose = require('mongoose');

module.exports = {
	connect: onOpen => {
		let db;

		mongoose.connect('mongodb://localhost/cookbook-react');
		db = mongoose.connection;

		db.on('error', console.error.bind(console, 'connection error:'));

		db.once('open', () => {
			if(typeof onOpen === 'function'){
				onOpen(db);
			}
		});

		return db;
	}
}
