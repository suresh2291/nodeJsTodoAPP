var db = require('../../config/database'); //reference of dbconnection.js
const moment = require('moment')
date = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
let UserMaster = {
    createTodoUser: (body,password, callback) => {
        let query = `Insert into todouser
            (  
            FirstName,  
            LastName,
            Email,  
            Password,
            CreatedDate
        )
        values(?,?,?,?,?)`
        let data = [
            body.FirstName,  
            body.LastName,
            body.Email,  
            password, 
            date
        ];
        return db.query(query, data, callback);
    },
    getUserData: (callback) => {
        let query = `SELECT Id,FirstName,LastName,Email FROM todouser`;
        return db.query(query, callback);
    },

    getUserDataEmail: (email,callback) => {
        let query = `SELECT Id,Password,Email FROM todouser WHERE Email = ${email}`;
        return db.query(query, callback);
    },

    getUserDataById: (userId, callback) => {
        let query = `SELECT  Id,FirstName,LastName,Email FROM todouser WHERE Id = ${userId}`;
        return db.query(query, callback);
    },
    updateUserData: (data, Id, callback) => {
        let query = `update todouser set
        FirstName=?,  
        LastName=?
        Where Id=${Id}`;
        db.query(query, [
            data.FirstName,  
            data.LastName
            ],
            callback);
    },

    deleteUserDataSoft: (userId, callback) => {
        let query = `update todouser set
        isDeleted=1
        Where Id=` + userId;
        db.query(query,callback);
    },
    deleteUser: (id, callback) => {
        let query = `delete from todouser where Id=` + id;
        db.query(query, callback);
    }
};
module.exports = UserMaster;