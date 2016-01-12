var express = require('express');
var router = express.Router();
var request = require('request');
var Step = require('step');

var OUR_GROUP_URL_NAME = 'Free-Code-Camp-NWA';

// converts military time to standard time
// accepts a string in these formats:
//   HH:mm:ss
//   HH:mm
// returns an object in this format:
//   hour: HH
//   min:  mm
//   period: am | pm
function convertMilitaryTime(time) {

    // splits the time into an array using the colon as separator
    var splitTime = time.split(':');

    // converts the strings to integers
    var hour = parseInt(splitTime[0]);
    var min = splitTime[1];
    var period = '';

    // converts the hour from military time to standard time
    if (hour === 0) {
        hour = 12;
        period = 'am';
    } else if (hour <= 11) {
        period = 'am';
    } else if (hour === 12) {
        period = 'pm';
    } else if (hour > 12) {
        hour = hour - 12;
        period = 'pm';
    }

    // creates the converted time object and returns it
    var convertedTime = {
        hour: hour.toString(),
        min: min,
        period: period
    };

    return convertedTime;
}


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
console.log(dataJSON);
                // meetup time is in format of milliseconds since epoch
                // convert to local date time
                var msUTC = dataJSON.results[0].time;
                // create a new date time object and set it to the epoch
                var localDateTime = new Date(0);
                // add the number of milliseconds to it to get the local date time
                localDateTime.setMilliseconds(msUTC);

                // break the localDateTime down into separate variables
                localDateTime = localDateTime.toString();
                var splitDateTime = localDateTime.split(' ');
                var eventWeekDay = splitDateTime[0];
                var eventMonth = splitDateTime[1];
                var eventDay = splitDateTime[2];
                var eventYear = splitDateTime[3];

                // time is in military time
                // break the event time down into hours, minutes, and period
                var eventTime = convertMilitaryTime(splitDateTime[4]);

                // meetup event duration is in the format of milliseconds
                // convert to hours
                var duration = ((dataJSON.results[0].duration / 1000) / 60) / 60;

                // send the raw JSON data to the browser
                // res.status(200);
                // res.type('json');
                // res.send(meetupDataJSON);
                // res.end();


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
                                      eventWeekDay: eventWeekDay,
                                      eventMonth: eventMonth,
                                      eventDay: eventDay,
                                      eventYear: eventYear,
                                      eventStartHour: eventTime.hour,
                                      eventStartMin: eventTime.min,
                                      eventStartPeriod: eventTime.period
                                     });
            }
        }
    );


 });

module.exports = router;
