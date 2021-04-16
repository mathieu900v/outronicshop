const
fs = require('fs'),
Sequelize = require('sequelize');

// create Sequelize instance
const sequelize = new Sequelize('devdb', 'postgres', 'jadoreoui', {
	host: '192.168.0.20',
	port: '5432',
	dialect: 'postgres',
	dialectOptions: { decimalNumbers: true }
	// logging: false
});

const db = {};

fs.readdirSync(__dirname)
.filter((filename) => filename !== 'index.js')
.forEach((filename) => {
	const model = require('./' + filename)(sequelize);
	db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
	db[modelName].associate(db);
});

sequelize.sync();

module.exports = db;
