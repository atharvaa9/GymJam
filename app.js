var express = require("express");
var app = express();
var configRoutes = require('./routes/index.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

configRoutes(app);

app.listen(3000, function () {
  console.log("Server is running on http://localhost:3000");
});

module.exports = app;
