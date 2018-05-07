var express = require('express');
var router = express.Router();
var session= require('express-session');

var Event = require('../models/event');
var News = require('../models/news');

/* GET home page. */
router.get('/', function(req, res, next) {
    Event.find(function (err, docs) {
        var eventChunks = [];
        var chunkSize = 2;
        for (var i = 0; i < 4; i += chunkSize) {
            eventChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('index', {events: eventChunks});
    });

});

router.get('/newsFeed/:id/:event', function(req, res, next) {
    var str = req.params.id;
    var eventId = str.toString();
    var event = req.params.event;
    News.find({eventId: eventId})
        .exec(function (err, docs) {
        console.log(docs);
        var newsChunks = [];
        var chunkSize = 2;
        for (var i = 0; i < docs.length; i += chunkSize) {
            newsChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('newsFeed', {news: newsChunks, event: event, eventId: eventId, layout: 'main'});
    });
});


router.get('/event', function(req, res, next) {
    res.render('event');
});

router.get('/event2', function(req, res, next) {
    res.render('newsFeed', {layout: 'normal2'});
});



module.exports = router;
