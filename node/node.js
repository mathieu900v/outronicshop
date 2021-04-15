const
	express = require('express');

const app = express();

const { Client } = require("pg");

const client = new Client({
    user: 'postgres',
    host: '192.168.0.20',
    database: 'devDB',
    password: 'jadoreoui',
    port: 5432,
});
console.log("Connexion réussie à la base de données");

// register routes
//require('./routes')(app);

// register error handling middleware
app.use((err, req, res, next) => {
	if (err.status === undefined) {
		return res.status(500).send(err.message);
	} else {
		return res.status(err.status).send(err.message);
	}
});

// launch server
const server = app.listen(3000, () => {
	const host = server.address().address;
	const port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});
