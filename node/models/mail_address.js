const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class MailAddress extends Sequelize.Model {
		static associate(db) {
			MailAddress.belongsTo(db.Person, { onDelete: 'cascade' });
		};
	}

	MailAddress.init({
		address: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true
			}
		},
		label: DataTypes.ENUM('home', 'work')
	}, {
		sequelize,
		modelName: 'MailAddress'
	});

	return MailAddress;
};
