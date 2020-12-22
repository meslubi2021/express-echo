var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 60301,
    ip   = process.env.IP   || '0.0.0.0';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var server = app.listen(port, ip, function () {
  console.log('Echo API is listening on port ' + port );
});

server.timeout = 180000; //very low value, to induce timeouts.


var reqData = function(req) {
  const params = ['method', 'hostname', 'path', 'query', 'headers', 'body']
  return params.reduce(
    (accumulator, currentValue) => { accumulator[currentValue] = req[currentValue]; return accumulator},
    {}
  );
};



//app.use((req, res, next) => setTimeout(next, 99));
var timeSleep = 100
app.get('/sleep', function(req, res){
   timeSleep = req.query.time
   res.set('Content-Type', 'application/json');
   res.set('Location', 'http://www.example.org');
   var response = reqData(req);
   console.log("sleeping for: " + timeSleep + " ms")
   setTimeout((function(){res.send(JSON.stringify(response,null,2))}),timeSleep);
   console.log("done all")   
});

app.get('/explode', function(req, res){
   return value;
});


app.get('/', function(req, res){
   res.set('Content-Type', 'application/json');
   var response = reqData(req);
   res.send(JSON.stringify(response,null,2));
   console.log(response)
});

app.post('/', function(req, res){
   res.set('Content-Type', 'application/json');
   var response = reqData(req);
   res.send(JSON.stringify(response,null,2));
   console.log(response)
});

app.get('/text', function(req, res){
   res.set('Content-Type', 'text/plain;charset=UTF-8');
   var response = reqData(req);
   res.send(JSON.stringify(response,null,2));
   console.log(response)
});

module.exports = app;
