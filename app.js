
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
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

// https.createServer({
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('certificate.pem'),
//     passphrase : 'terminal2',
//   }, app)
//   .listen(8443, function () {
//     console.log('Example app listening on 8443! Go to localhost:8443/')
//   })
// http.createServer(app)
//     .listen(8000, function () {
//       console.log('Example app listening on 8443! Go to localhost:8443/')
//     })
  app.listen(port);
  console.log('API are working on port ' + port);
exports = module.exports = app;