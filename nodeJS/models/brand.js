const Sequelize = require('sequelize');

module.exports = (sequelize) => {

	class Brand extends Sequelize.Model {
		static associate(db) {
			Brand.belongsTo(db.Product, { onDelete: 'cascade' });
		};
	}

	Brand.init({
		name: Sequelize.STRING,
		image: Sequelize.TEXT,
	}, {
		sequelize,
		modelName: 'Brand'
	});
	
	return Brand;
};
