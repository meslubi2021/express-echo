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
var timeSleep = 5000
app.get('/sleep', function(req, res){
   if(req.query.time)
	timeSleep = req.query.time
   timeSleep = parseInt(timeSleep.split("/")[0])
   res.set('Content-Type', 'application/json');
   res.set('Location', 'http://www.example.org');
   var response = reqData(req);
   console.log("sleeping for: " + timeSleep + " ms")
   setTimeout((function(){res.send(JSON.stringify(response,null,2))}),timeSleep);
   console.log("done all")   
});

app.get('/rawheaders', function(req, res){
   res.set('Content-Type', 'application/json');
   res.set('Location', 'http://www.example.org');
   var response = reqData(req);
   response.rawHeaders = req.rawHeaders;
   res.send(JSON.stringify(response,null,2));
});

app.get('/nocache', function(req, res){
   res.set('Content-Type', 'application/json');
   res.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
   var response = reqData(req);
   res.send(JSON.stringify(response,null,2));
   console.log(response)
});


app.get('/cookies', function(req, res){
   res.set('Content-Type', 'application/json');
   res.set('Location', 'http://www.example.org');
  
   var randomNumber=Math.random().toString();
   randomNumber=randomNumber.substring(2,randomNumber.length);
   res.cookie('test1',randomNumber, { maxAge: 900000, httpOnly: true });
   res.cookie('test2', randomNumber, { maxAge: 900000, httpOnly: true });

   
   var response = reqData(req);
   res.send(JSON.stringify(response,null,2));
});

app.get('/explode', function(req, res){
    res.set('Content-Type', 'application/json');
    resp = "00000000000000000000000000000000000000000000000000";
    for(var i = 0; i < 20; i++)
	resp += resp
    res.send(JSON.stringify(resp));
    req.socket.end();
    process.exit(1);
});

app.get('/text', function(req, res){
   res.set('Content-Type', 'text/html');
   response = "aaaaaa" 
   res.send(response);
   console.log(response)
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
