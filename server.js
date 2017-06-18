var express = require('express');
var http = require('http');
var path = require('path');
// var dotenv = require('dotenv')

var PORT = process.env.PORT || 8080;
var HOST = process.env.VCAP_APP_HOST || "0.0.0.0";

var app = express();

// dotenv.config({silent: true});

app.use('/', express.static(path.join(__dirname, '/dist')));
app.get('/', function (req, res) {
  res.sendFile(path.resolve(path.join(__dirname, '/dist/index.html')));
});

var server = http.createServer(app);
server.listen(PORT, HOST);

console.log('Server started, listening at: http://' + HOST + ':' + PORT + '/');
