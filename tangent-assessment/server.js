//define express
var express = require('express');
var app = express();
//serve project pages
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(express.static('www'));
//open listening port
app.listen(3000);
console.log('Server is listening on port 3000');
