const db = require('../models');

module.exports = {

	get_all: (req, res, next) => {
		return req.person.getMailAddresses({
			order: ['label']
		})
			.then(mailAddresses => res.json(mailAddresses))
			.catch(next);
	},

	get_by_id: (req, res, next) => {
		return req.person.getMailAddresses({
			where: {
				id: req.params.mail_address_id
			}
		})
			.then(mailAddresses => {
				if (mailAddresses.length === 0) {
					throw { status: 404, message: 'Requested MailAddress not found' };
				}
				return res.json(mailAddresses[0]);
			})
			.catch(next);
	},

	create: (req, res, next) => {
		return req.person.createMailAddress(req.body)
			.then(mailAddress => res.json(mailAddress))
			.catch(next);
	},

	update_by_id: (req, res, next) => {
		return req.person.getMailAddresses({
			where: {
				id: req.params.mail_address_id
			}
		})
			.then(mailAddresses => {
				if (mailAddresses.length === 0) {
					throw { status: 404, message: 'Requested MailAddress not found' };
				}
				Object.assign(mailAddresses[0], req.body);
				return mailAddresses[0].save();
			})
			.then(mailAddress => res.json(mailAddress))
			.catch(next);
	},

	delete_by_id: (req, res, next) => {
		return req.person.getMailAddresses({
			where: {
				id: req.params.mail_address_id
			}
		})
			.then(mailAddresses => {
				if (mailAddresses.length === 0) {
					throw { status: 404, message: 'Requested MailAddress not found' };
				}
				return mailAddresses[0].destroy();
			})
			.then(() => res.status(200).end())
			.catch(next);
	}

};
