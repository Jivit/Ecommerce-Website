var express = require('express');

var homecontroller = require("./controllers/homecontroller");

var app = express();
app.set('view engine','ejs');
app.use(express.static('./public'));
homecontroller(app);
app.listen(3000);
console.log('listening to port 3k');