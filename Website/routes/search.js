/**
 * Created by vilas on 18/1/17.
 */
var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var search = [ ];

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/data', function(req, res){
    res.json(search);
    search = [ ];
});

/* GET search page. */
router.post('/', urlencodedParser, function(req, res){
    var item = req.body.item;
    console.log(item);
    var url = "mongodb://localhost:27017/product_database";
    MongoClient.connect(url,function(err,db){
        var query = { Name : new RegExp('^' + item) };
        db.collection('Products').find(query).toArray(function(error, results){
            search = results;
            // console.log(search);
            res.render('search.ejs');
        });
    });
});

module.exports = router;