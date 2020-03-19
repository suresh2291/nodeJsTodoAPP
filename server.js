const express = require('express');
const app = express();

const cors = require('cors')
const bodyParser = require('body-parser');
const helmet = require('helmet')
app.use(cors())//enable all apis req and res
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(helmet())
app.use(bodyParser()); 

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// routes ======================================================================
require('./config/routes.js')(app); // load our routes and pass in our app and fully configured passport
app.use((error, req, res, next)=>{
  console.log('app.js error ',error)
res.status(400||500).json({"error":error.message || error.sqlMessage})
})

module.exports = app