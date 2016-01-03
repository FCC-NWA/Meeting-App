var express = require('express');
var router = express.Router();

/* GET fbook page */
router.get('/meetup', function(req, res) {
    res.render('meetup');
});

module.exports = router;
