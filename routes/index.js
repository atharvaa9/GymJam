var memberRoutes = require("./members.js");

var constructorMethod = function (app) {
  app.use("/members", memberRoutes);
  app.use("*", function (req, res) {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
