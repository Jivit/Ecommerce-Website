
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cookieParser = require('cookie-parser')
var assert = require('assert');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

var insertDocument = function(db,user,_id,Image,Price,Orig_price,Name,callback) {
    db.createCollection(user, function(err, collection){
        //collection.insert({"test":"value"});
    });
    db.collection(user).insertOne( {
        "_id" : _id,
        "Image" : Image, 
        "Price" : Price, 
        "Orig_price" : Orig_price, 
        "Name" : Name
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Added item successfully");
        callback();
    });
};

router.post('/', urlencodedParser, function(req, res) {

    console.log("reached");
    var user = req.body.user;
    var _id = req.body._id;
    var Image = req.body.Image;
    var Price = req.body.Price;
    var Orig_price = req.body.Orig_price;
    var Name = req.body.Name;

    var a = {
        "_id" : _id,
        "Image" : Image, 
        "Price" : Price, 
        "Orig_price" : Orig_price, 
        "Name" : Name
    };
    console.log(a);

    var url = "mongodb://localhost:27017/product_database";
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocument(db,user,_id,Image,Price,Orig_price,Name, function() {
            db.close();
        });
    });
    res.end();
});

module.exports = router;