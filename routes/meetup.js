var express = require('express');
var https = require('https');

var router = express.Router();


/* GET fbook page */
router.get('/meetup', function(req, res) {

  // res.https.get('https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=Free-Code-Camp-NWA&page=20', function(response) {
  //   console.log("statusCode: ", response.statusCode);
  //   console.log("headers: ", response.headers);
  //
  //   response.on('data', function(d) {
  //     process.stdout.write(d);
  //   });
  // }).on('error', function(e) {
  //   console.error(e);
  // });
  //
  //
  //
  //
  res.render('meetup');
console.log(body);
});
module.exports = router;
