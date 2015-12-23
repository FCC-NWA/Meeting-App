var express = require('express');
var router = express.Router();

/* GET fbook page */
router.get('/fbook', function(req, res) {
    res.render('fbook');
});

module.exports = router;
