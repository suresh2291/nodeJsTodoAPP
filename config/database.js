/**
 * Install the mysql npm package using the command "npm i mysql"
 * lets connect the local db from workbench
 * 
 */
var mysql = require('mysql'); //import the mysql after installing
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'amrutham',
  database: 'todoschema',
  multipleStatements: true
})//connecting to mysql db
connection.connect(function(err,result) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });//checking the connection or error

module.exports = connection;  