var express = require('express');
var uuid = require('uuid');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Roomie' });
});

router.get('/create', function(req, res, next) {
    var id = uuid.v4();
    res.redirect('/chat/'+id);
});

module.exports = router;
