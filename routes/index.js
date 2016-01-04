var express = require('express');
var router = express.Router();
var request = require('request');

//Use request to get meetup event api. next step is to figure out the best way to parse the JSON response into a solution for views to use. 
request.get('https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=Free-Code-Camp-NWA&page=20', function(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body)
    var JSON = body;
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* GET fbook page */
router.get('/fbook', function(req, res) {
    res.render('fbook');
});

// /* GET fbook page */
 router.get('/meetup', function(req, res) {
   res.render('meetup', { title: JSON.description

   });
 });

module.exports = router;
