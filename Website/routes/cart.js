var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/product_database";

  	
 


router.post('/data',function(req,res){
	var user = req.body.user;
	console.log("hi" + user);
	products = [ ];
	var result = function(){
		res.json(products);
	}
	MongoClient.connect(url,function(err,db){
		  var cursor = db.collection(user).find();
		  

		  cursor.each(function(err,doc){
		    if(doc != null){
		      if(err){
		        throw err;
		      }
		      products.push(doc);
		    }
		  });
  	});

	setTimeout(result, 1000);
  	
  	
});

/* GET home page. */
router.get('/',function(req,res){
  res.render('cart.ejs');
});

module.exports = router;