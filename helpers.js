var ObjectId = require('mongodb').ObjectId;
var re_for_specialcharacter = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
var re_for_specialcharacter_and_number = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;

function checkStr(string) {
  if (!string) {
    throw "Input you have entered is not valid";
  }
  if (typeof string !== "string") {
    throw "Input you have entered is not a String!!!";
  }
  if (string.trim().length <= 0) {
    throw "Input is Empty!";
  }
}

function checkId(id) {
  if (!id) throw 'You must provide an ID';
  if (typeof id !== 'string') throw 'ID must be a string';
  id = id.trim();
  if (id.length === 0)
    throw 'ID cannot be an empty string or just spaces';
  id = parseInt(id);
  return id;
}

function generateMemberID() {
  var min = 10000000;
  var max = 99999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.checkStr = checkStr;
exports.checkId = checkId;
exports.generateMemberID = generateMemberID;
