//you can include all your controllers
const todo = require('../app/controllers/todo');
const user = require('../app/controllers/users');
module.exports = function(app) {
    app.get('/', function(req, res, nex) {
        res.json("Welcome to Todo APP...!");
    });
    app.use('/api/user', user)
    app.use('/api/todo', todo)
   
}