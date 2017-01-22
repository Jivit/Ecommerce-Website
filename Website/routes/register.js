/**
 * Created by vilas on 18/1/17.
 */
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var cookieParser = require('cookie-parser')
var assert = require('assert');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

var insertDocument = function(db,username, pwd, mail, phno, callback) {
    db.collection('users').insertOne( {
        "username" : username,
        "password" : pwd,
        "mail" : mail,
        "phno" : phno
    }, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the users collection.");
        callback();
    });
};

router.post('/', urlencodedParser, function(req, res) {
    var username  = req.body.username;
    var pwd = req.body.password;
    var mail = req.body.mail;
    var phno = req.body.phno;
    var url = "mongodb://localhost:27017/product_database";
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocument(db, username, pwd, mail, phno, function() {
            db.close();
        });
    });
    // alert('Registered!! Please login with the details!');
    res.writeHead(301,{Location: '/login'});
    res.end();
});

module.exports = router;