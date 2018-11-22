var express = require('express');
var router = express.Router();
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var api_key = require('./keys').tmdb;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

router.get('/discover', function(req, res, next) {
  var browse = 'https://api.themoviedb.org/3/discover/movie?api_key='+api_key+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
  console.log(browse);
  console.log(api_key);
  httpGetAsync(browse, (json) => {
    data = JSON.parse(json);
    res.render('browse', { list: data });
  })
});

module.exports = router;
