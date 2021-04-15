const db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return db.Person.findAll({
			order: ['lastname']
		})
			.then(people => res.json(people))
			.catch(next);
	},

	load_by_id: (req, res, next) => {
		return db.Person.findByPk(req.params.person_id)
			.then(person => {
				if (!person) {
					throw { status: 404, message: 'Requested Person not found' };
				}
				req.person = person;
				return next();
			})
			.catch(next);
	},

	get_by_id: (req, res, next) => {
		return db.Person.findByPk(req.params.person_id)
			.then(person => {
				if (!person) {
					throw { status: 404, message: 'Requested Person not found' };
				}
				return res.json(person);
			})
			.catch(next);
	},

	create: (req, res, next) => {
		return db.Person.create(req.body)
			.then(person => res.json(person))
			.catch(next);
	},

	update_by_id: (req, res, next) => {
		return db.Person.findByPk(req.params.person_id)
			.then(person => {
				if (!person) {
					throw { status: 404, message: 'Requested Person not found' };
				}
				Object.assign(person, req.body);
				return person.save();
			})
			.then(person => res.json(person))
			.catch(next);
	},

	delete_by_id: (req, res, next) => {
		return db.Person.findByPk(req.params.person_id)
			.then(person => {
				if (!person) {
					throw { status: 404, message: 'Requested Person not found' };
				}
				return person.destroy();
			})
			.then(() => res.status(200).end())
			.catch(next);
	}

};
