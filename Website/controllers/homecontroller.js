var bodyParser = require('body-parser');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/product_database";
var products = [ ];
var count = 0;
var app = express();
var assert = require('assert');
module.exports = function(app){
	app.get('/data',function(req,res){
		MongoClient.connect(url,function(err,db){
			if(count==0)
			{	var cursor = db.collection('Products').find();
				cursor.each(function(err,doc){
					if(doc != null){
						if(err){
							throw err;
						}
						// console.log(doc);
						products.push(doc);
					}
				});
			count++;
			}
			// console.log(products);
			res.json(products);
		});
	});

	app.get('/',function(req,res){
					res.render('home.ejs');
	});

	app.get('/login',function(req,res){
		res.render('login.ejs');
	});

	var insertDocument = function(db,username,pwd, callback) {
		   db.collection('users').insertOne( {
		      "username" : username,
		      "password" : pwd
		   }, function(err, result) {
		    assert.equal(err, null);
		    console.log("Inserted a document into the users collection.");
		    callback();
  		});
	};
	var urlencodedParser = bodyParser.urlencoded({extended: false});

	app.post('/userlogin', urlencodedParser, function(req, res) {
    	var username  = req.body.username;
    	var pwd = req.body.password;
    	var url = "mongodb://localhost:27017/product_database";
		MongoClient.connect(url, function(err, db) {
		  assert.equal(null, err);
		  insertDocument(db, username, pwd, function() {
		      db.close();
		  });
		});
        var html = 'Hello: ' + username + '.<br>' +'<a href="/">Try again.</a>';
  		res.writeHead(301,{Location: '/'});
		res.end();

  	});


}
