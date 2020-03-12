var db = require('../../config/database'); //reference of dbconnection.js  
const moment = require('moment')
const date = moment.utc().format()
var todo = {  
    insertTodo: (body, userId,callback) => {
        let query = `Insert into todo
        (
            userId,
            title,
            description
        ) values (?,?,?)`;

        let data = [
            userId,
            body.title,
            body.description
        ];
        return db.query(query, data, callback);
    },
    getAllTodo: (callback) => {
        let query = `SELECT * FROM todo`;
        return db.query(query, callback);
    },

    getTodoByUserId: (userId, callback) => {
        let query = `SELECT * FROM todo WHERE userId = ${userId}`;
        return db.query(query, callback);
    },
    updateTodo: (body, userId, callback) => {
        let query = `UPDATE todo 
        SET 
        title=?,
        description=?
        WHERE Id =${body.Id} AND userId=${userId}`

        let data = [
            body.title,
            body.description
        ];
        return db.query(query, data, callback);
    },

    deletetodo: function(id, callback) {  
        return db.query("delete from todo where Id=?", [id], callback);  
    },  
   
};  
module.exports = todo; 