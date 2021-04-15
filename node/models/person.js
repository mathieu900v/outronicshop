const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize => {

	class Person extends Sequelize.Model {
		static associate(db) {
			Person.hasMany(db.MailAddress, { onDelete: 'cascade' });
		}
	}

	Person.init({
		lastname: DataTypes.STRING,
		firstname: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'Person'
	});

	return Person;

};
