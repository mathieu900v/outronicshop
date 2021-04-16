const Sequelize = require('sequelize');

module.exports = (sequelize) => {

	class Category extends Sequelize.Model {
		static associate(db) {
			Category.belongsTo(db.Product, { onDelete: 'cascade' });
		};
	}

	Category.init({
		title: Sequelize.STRING,
		description: Sequelize.TEXT,
		idparent: Sequelize.STRING
	}, {
		sequelize,
		modelName: 'Category'
	});
	
	return Category;
};
