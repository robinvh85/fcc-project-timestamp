// server.js
// where your node app starts

// init project
require('dotenv').config()
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", function(req, res){
  var dateParam = req.params.date_string;
  var date = new Date();
  var dateUnix = null;

  if(dateParam != undefined){
    var dateFormatRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    if(dateFormatRegex.test(dateParam)){
      date = new Date(dateParam);
    } else {
      date = new Date(parseInt(dateParam));
    }

    if(date.toUTCString() != "Invalid Date"){
      dateUnix = date.getTime();
    }
  }

  res.json({
    "unix": dateUnix,
    "utc" : date.toUTCString()
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});