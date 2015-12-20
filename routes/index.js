var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // Matt's original code
//  res.render('index', { title: 'FCC-NWA Express App' });
    
    res.render('placeholder');
});

module.exports = router;
