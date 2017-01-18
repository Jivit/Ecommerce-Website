var bodyParser = require('body-parser');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/product_database";
var products = [ ];
var app = express();
var assert = require('assert');
var search = [ ];
var cookieParser = require('cookie-parser')
module.exports = function(app){
	var urlencodedParser = bodyParser.urlencoded({extended: false});

  	app.get('/search_data', function(req, res){
		res.json(search);
		search = [ ];
	});

	app.post('/search', urlencodedParser, function(req, res){
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

MongoClient.connect(url,function(err,db){
				var cursor = db.collection('Products').find();
				cursor.each(function(err,doc){
					if(doc != null){
						if(err){
							throw err;
						}
						products.push(doc);
					}
				});
			
			products = [ ];
		});

	app.get('/data',function(req,res){
		res.json(products);
	});

	app.get('/',function(req,res){
					res.render('home.ejs');
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
								res.cookie('login', 'cookievalue', { name: username1});
								res.send('<html><h1>LOG-IN WORKED ' + results[0].username +'!!</h1></html>');
							}
						});
			});
	  	});

}
