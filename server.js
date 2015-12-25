var http = require('http');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {};
try {
    config = require('./config/config');
}
catch (err) {}

var app = express();
var server = http.createServer(app);
app.server = server;

var pipeline = {
    cookieParser: cookieParser(),
    bodyParserUrlEncoded: bodyParser.urlencoded({extended: true}),
    session: session({
        secret: process.env.SESSION_SECRET || config.sessionSecret || "randomCharacters",
        saveUninitialized: true,
        resave: true
    })
};
app.use(pipeline.cookieParser);
app.use(pipeline.bodyParserUrlEncoded);
app.use(pipeline.session);

var authorization = require('./startup/authorization')(app, config);
require('./startup/distributor')(server, pipeline, authorization, config);

app.use("/bower_components", express.static(__dirname + "/bower_components"));
app.use("/public", express.static(__dirname + "/public"));
app.use("/private", authorization.require, express.static(__dirname + "/private"));
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + "/public/index.html");
});
app.get("/config.js", function(req, res, next) {
    var host = process.env.HOST || config.host || "localhost";
    var port = process.env.PORT || config.port || 8080;
    res.send(
        "var distributorUrl = \"ws://" + host + ":" + port + "/\";\n" +
        "var loginUrl = \"http://" + host + ":" + port + "/public/login.html\";\n");
    res.end();
});

server.listen(process.env.PORT || config.port || 8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('ImprovingU listening at http://%s:%s', host, port);
});
