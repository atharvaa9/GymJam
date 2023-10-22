var MongoClient = require('mongodb').MongoClient;
var settings = require('./settings.js');

var _connection = undefined;
var _db = undefined;

var dbConnection = function dbConnection() {
  if (!_connection) {
    return MongoClient.connect(settings.mongoConfig.serverUrl).then(function (connection) {
      _connection = connection;
      _db = _connection.db(settings.mongoConfig.database);
      return _db;
    });
  }

  return Promise.resolve(_db);
};

var closeConnection = function closeConnection() {
  return _connection.close();
};

exports.dbConnection = dbConnection;
exports.closeConnection = closeConnection;
