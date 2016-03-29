/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

var Twitter = require('twitter');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));


var client = new Twitter({
    consumer_key: 'NNTSegTlWZGS33fEttaIeS7s8',
    consumer_secret: 'q0wG2H9m9aGTLhGn8iDAwT3NGjKoKoOwPQKG84zpRwKItc9brL',
    access_token_key: '432360004-G6N6HtwsmDsodSRcpZ8u2fFs2afbrp5Bb5iXkcYu',
    access_token_secret: '4NKRnC2URRWTVLD9J4lDanrgEHiQ0uFEvyooJBnmjH8iD'
});

//Route to retrive tweets
app.get('/tweet/:user', function (req, res) {
    var params = {screen_name: req.params.user};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            res.json(tweets);
        }
    });
});

app.get('/tone/:tweet', function (req, res) {
    console.log(req.params.tweet);
});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function () {

    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});
