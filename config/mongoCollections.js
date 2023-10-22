var _require = require('./mongoConnection.js'),
    dbConnection = _require.dbConnection;

var getCollectionFn = function getCollectionFn(collection) {
  var _col = undefined;

  return function () {
    return _col || dbConnection().then(function (db) {
      _col = db.collection(collection);
      return _col;
    });
  };
};

exports.members = getCollectionFn('members');