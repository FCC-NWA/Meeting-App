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
    
    // use Step to synchronize the API call
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
                            
                // need to parse the JSON to de-serialize it 
                // from a string to an object we can work with
                // Thank you, Blake. -- Roy :-)
                dataJSON = JSON.parse(meetupDataJSON);
                
                // meetup time is in format of milliseconds since epoch
                // convert to local date time
                var msUTC = dataJSON.results[0].time;
                // create a new date time object and set it to the epoch
                var localDateTime = new Date(0);
                // add the number of milliseconds to it to get the local date time
                localDateTime.setMilliseconds(msUTC);
                
                // meetup event duration is in the format of milliseconds
                // convert to hours
                
                var duration = ((dataJSON.results[0].duration / 1000) / 60) / 60;
                
                // send the raw JSON data to the browser
                // res.status(200);
                // res.type('json');
                // res.send(meetupDataJSON);
                // res.end();
                
                console.log(dataJSON.results[0].description);
                
                // send the data to the view with variables                
                res.render('meetup', {name: dataJSON.results[0].name,
                                      description: dataJSON.results[0].description,
                                      eventURL: dataJSON.results[0].event_url,
                                      venueName: dataJSON.results[0].venue.name,
                                      venueAddress: dataJSON.results[0].venue.address_1,
                                      venueCity: dataJSON.results[0].venue.city,
                                      venueState: dataJSON.results[0].venue.state.toUpperCase(),
                                      venueZip: dataJSON.results[0].venue.zip,
                                      venueLatitude: dataJSON.results[0].venue.lat,
                                      venueLongitude: dataJSON.results[0].venue.lon,
                                      groupName: dataJSON.results[0].group.name,
                                      groupUrlName: dataJSON.results[0].group.urlname,
                                      eventDuration: duration,
                                      eventTime: localDateTime
                                     });
            }       
        }
    );
    
    
 });

module.exports = router;
