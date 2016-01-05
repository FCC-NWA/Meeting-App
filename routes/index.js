var express = require('express');
var router = express.Router();
var request = require('request');
var Step = require('step');

var OUR_GROUP_URL_NAME = 'Free-Code-Camp-NWA';


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

// /* GET meetup page */
 router.get('/meetup', function(req, res) {
    
    // use Step to serialize the API call
    // so we don't try to process data until
    // we've received it
    Step(        
        function getMeetupData() {
                        
            var self = this;
            
            var meetupApiUrl = 'https://api.meetup.com/2/events?group_urlname='
            + OUR_GROUP_URL_NAME 
            + '&status=upcoming&page=1';
            
            // uses the request Node library to send the get request
            request.get(meetupApiUrl, function(error, response, jsonData) {
         
                // if successful, pass along the jsonData
                // else, pass along an error
                if (!error && response.statusCode == 200) {            
                    self(null, jsonData);
                } else {
                    self(error, jsonData);
                }
            }); 
        },
        function processMeetupData(err, meetupDataJSON) {
            
            // Uh oh, there's an error. 
            // Render the error template.
            if (err !== null) {
                
                res.render('error', {
                    message: 'Error getting data from Meetup.',
                    error: err
                });
            // No error.
            // Render the meetup template.
            } else {
                                
                // throws error on 
                // meetupDAtaJSON.results[0].name
                // Why can't I access this???
                console.log('+++++++++++++++++++++');
                console.log(' ');                
                console.log("meetupDataJSON: ");
                console.log(meetupDataJSON);
                console.log(' ');
                
                // this statement returns undefined
                // console.log(meetupDataJSON['results'] );
                
                // this statement throws an error 
                // console.log(meetupDataJSON.results[0].name);
                console.log('+++++++++++++++++++++');
            
                // send the raw JSON data to the browser
                res.status(200);
                res.type('json');
                res.send(meetupDataJSON);
                res.end();
                
                // Just need to grab data out of meetupDataJSON
                // and get it into the view.
            }       
        }
    );
    
    
 });

module.exports = router;
