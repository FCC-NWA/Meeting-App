var express = require('express');
var router = express.Router();
var request = require('request');

function getUpcomingMeetups(groupUrlName) {
        
    var reqString = 'https://api.meetup.com/2/events?group_urlname=';
    reqString += groupUrlName;
    reqString += '&status=upcoming&page=1';
    
    // uses the request Node library to send the get request
    request.get(reqString, function(error, response, jsonData) {
                
        // if successful, return the jsonData
        // else, return an an object with error info
        if (!error && response.statusCode == 200) {            
            return jsonData;
        } else {
            var uhOh = {
                errorMessage: error,
                statusCode: response.statusCode
            };
            
            return uhOh;
        }
    });     
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

// /* GET meetup page */
 router.get('/meetup', function(req, res) {
    console.log(getUpcomingMeetups('Free-Code-Camp-NWA'));
    
    res.render('meetup');
 });

module.exports = router;
