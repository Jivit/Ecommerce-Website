var bodyParser = require('body-parser');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/product_database";
var products = new Array();
var app = express();
var assert = require('assert');
module.exports = function(app){
	app.get('/',function(req,res){

				MongoClient.connect(url,function(err,db){
					var cursor = db.collection('Products').find();
					cursor.each(function(err,doc){
						if(doc != null){
							if(err){
								throw err;
							}
							// console.log(doc);
							products.push(doc);
						}
					});
					res.render('home.ejs',{products : products});
				});
	});
	app.get('/login',function(req,res){
		res.render('login.ejs');
	});

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
	var urlencodedParser = bodyParser.urlencoded({extended: false});

	app.post('/register', urlencodedParser, function(req, res) {
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
  	app.post('/loginres',urlencodedParser,function(req, res){
  		var username  = req.body.username;
    	var pwd = req.body.password;
    	var url = "mongodb://localhost:27017/product_database";
    	MongoClient.connect(url,function(err,db){
					var cursor = db.collection('users').find();
					var flag = 0;
					cursor.each(function(err,doc){
						if(doc != null){
							console.log(doc.username);
							if(doc.username == username && doc.password == pwd){
								flag = 1;
								res.send('<html><h1>LOG-IN WORKED</h1></html>');
							}
						}
						
					});
					
						
				});
  	});


}