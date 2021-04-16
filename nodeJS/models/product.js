const Sequelize = require('sequelize');

module.exports = (sequelize) => {

	class Product extends Sequelize.Model {
		static associate(db) {
			Product.hasOne(db.Brand, { onDelete: 'cascade' });
		};
	}

	Product.init({
		title: Sequelize.STRING,
		images: Sequelize.TEXT,
		description: Sequelize.TEXT,
		features: Sequelize.TEXT,
		price: Sequelize.DECIMAL(5,2),
		weightGrams: Sequelize.INTEGER,
		additionnalFees: Sequelize.DECIMAL(5,2),
		isPhare: Sequelize.BOOLEAN,
		
	}, {
		sequelize,
		modelName: 'Product'
	});
	
	return Product;
};
