const db = require('../models');

module.exports = {
	
	get_all: (req, res, next) => {
		let where = {};
		if (req.query.name) {
			where.name = {
				[Sequelize.Op.like]: '%'+req.query.name+'%'
			};
		}
		return db.Brand.findAll({
			order: [ 'name' ],
			where
		})
		.then((people) => res.json(people))
		.catch((err) => next(err));
	},
	
	get_by_id: (req, res, next) => {
		return req.person.getMailAddresses({
			where: {
				id: req.params.mail_address_id
			}
		})
		.then((mailAddresses) => {
			if (mailAddresses.length === 0) {
				throw { status: 404, message: 'Requested MailAddress not found' };
			}
			return res.json(mailAddresses[0]);
		})
		.catch((err) => next(err));
	},

	create: (req, res, next) => {
		const data = {
			id: req.body.address || '',
			name: req.body.name || '',
			image: req.body.image || ''
		};
		return db.Brand.create(data)
		.then((brand) => res.json(brand))
		.catch((err) => next(err));
	},

	update_by_id: (req, res, next) => {
		return req.person.getMailAddresses({
			where: {
				id: req.params.mail_address_id
			}
		})
		.then((mailAddresses) => {
			if (mailAddresses.length === 0) {
				throw { status: 404, message: 'Requested MailAddress not found' };
			}
			Object.assign(mailAddresses[0], req.body);
			return mailAddresses[0].save();
		})
		.then((mailAddress) => res.json(mailAddress))
		.catch((err) => next(err));
	},

	delete_by_id: (req, res, next) => {
		return req.person.getMailAddresses({
			where: {
				id: req.params.mail_address_id
			}
		})
		.then((mailAddresses) => {
			if (mailAddresses.length === 0) {
				throw { status: 404, message: 'Requested MailAddress not found' };
			}
			return mailAddresses[0].destroy();
		})
		.then(() => res.status(200).end())
		.catch((err) => next(err));
	}

};
