const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    request = require('request');
var cors = require('cors');
 
const app = express();
   app.set('view engine', 'ejs');
   app.use(express.static('public'));
   app.use(cors());
   app.use(bodyParser.urlencoded({extended: true}));
   app.use(bodyParser.json());
   var port = 3000;

   app.get('/', function (req, res) {
});
 
app.post('/faucet', function(req, res) {
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
  {
    return res.json({"responseError" : "something goes to wrong"});
  }
  const secretKey = "6LdCNlwkAAAAAA7PSqAUQeKv2tj_sZCk3P1MRNqF";
 
  const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
 
  request(verificationURL,function(error,response,body) {
    body = JSON.parse(body);
 
    if(body.success !== undefined && !body.success) {
      return res.json({"responseError" : "Failed captcha verification"});
    }
    res.json({"responseSuccess" : "Sucess"});
  });
});
 
app.listen(port, function(){
    console.log('Server is running at port: ',port);
});