var express = require("express");
var app = express();
const cors = require('cors');
var configRoutes = require('./routes/index.js');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

configRoutes(app);

if (require.main === module) {
	app.listen(3000, () => {
		console.log("We've now got a server!");
		console.log('Your routes will be running on http://localhost:3000');
	});
}

module.exports = app;