/**
 * Created by vilas on 18/1/17.
 */
var cookieParser = require('cookie-parser')
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var url = "mongodb://localhost:27017/product_database";

var urlencodedParser = bodyParser.urlencoded({extended: false});

/* GET login page. */
router.get('/',function(req,res){
    res.render('login.ejs');
});

router.post('/res',urlencodedParser,function(req, res){
    var username1  = req.body.username;
    var pwd1 = req.body.password;
    var url = "mongodb://localhost:27017/product_database";
    console.log(username1);
    MongoClient.connect(url,function(err,db){
        db.collection('users').find({username : username1, password : pwd1}).toArray(function(error, results){
            // console.log(results); // output all records
            if(results.length == 0) {

                res.send('<html><h1>NOT FOUND</h1></html>');
            }
            else {
                res.cookie('login', username1, { name: username1 });
                res.send('<html><h1>LOG-IN WORKED ' + results[0].username +'!!</h1></html>');
            }
        });
    });
});


module.exports = router;
