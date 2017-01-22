var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/product_database";

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

router.get('/data',function(req,res){
  res.json(products);
});

/* GET home page. */
router.get('/',function(req,res){
  res.render('home.ejs');
});

module.exports = router;
