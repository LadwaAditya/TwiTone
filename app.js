/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var Twitter = require('twitter');
var watson = require('watson-developer-cloud');


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

var tone_analyzer = watson.tone_analyzer({
    username: '4dad1e26-422f-45d2-91b0-1518895e916e',
    password: 'VCGx0VnwfcRG',
    version: 'v3-beta',
    version_date: '2016-02-11'
});

var relationship_extraction = watson.relationship_extraction({
    username: 'c5755456-3dc4-42a0-80c3-40ad5c5e3024',
    password: 'sHBLGYfVfB4l',
    version: 'v1-beta'
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
    var tweet = req.params.tweet;
    tone_analyzer.tone({text: tweet}, function (err, tone) {
        res.json(tone);
    });
});

app.get('/relationship/:text', function (req, res) {
    var text = req.params.text;
    relationship_extraction.extract({
            text: text,
            dataset: 'ie-en-news'
        },
        function (err, response) {
            if (err)
                console.log('error:', err);
            else
                res.json(response);
        });
});

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function () {

    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});
