/* eslint-disable no-unused-expressions */
/* eslint-disable indent */
/* eslint-disable camelcase */
/* eslint-disable max-len */
// eslint-disable-next-line strict
require('dotenv').config();
const express = require('express');

const serverless = require('serverless-http');
const cors = require('cors');

const app = express();
const router = express.Router();

const config = require('./config');
//const client = require('twilio')(config.accountSID, config.authToken);
const client = require('twilio')(process.env.accountSID, process.env.authToken);
//const client = require('twilio')('AC78c2cc58be4765d163992bc345472675', 'e31b9ff8f6da2c001ef5d39002bd4cf7');


app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

router.get('/', cors(), (req, res) => {
 // res.sendFile(path.join(__dirname + '/index.html'));
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');

  //sendTextMessage();
  console.log('accountSID = ',process.env.accountSID);
console.log('serviceID = ',process.env.serviceID);
console.log('token = ',process.env.authToken);

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html><head><title>GU phone auth page</title></head><body><center><h1>Welcome to GU phone Auth Page!!!...</h1></center></body></html>');
  res.end();
});

// Login Endpoint
router.get('/login', (req,res) => {
   // const client = require('twilio')(process.env.accountSID, process.env.authToken);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
  if (req.query.phonenumber) {
     client
     .verify
     .services(config.serviceID)
     .verifications
     .create({
         to: `+${req.query.phonenumber}`,
         channel: req.query.channel==='call' ? 'call' : 'sms' 
     })
     .then(data => {
         res.status(200).send({
             message: "Verification is sent!!",
             phonenumber: req.query.phonenumber,
             data
         })
     }) 
  } else {
     res.status(400).send({
         message: "Wrong phone number :(",
         phonenumber: req.query.phonenumber,
         data
     })
  }
})

// Verify Endpoint
router.get('/verify', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
 if (req.query.phonenumber && req.query.code.length === 6) {
     client
         .verify
         .services(config.serviceID)
         .verificationChecks
         .create({
             to: `+${req.query.phonenumber}`,
             code: req.query.code
         })
         .then(data => {
             if (data.status === "approved") {
                 res.status(200).send({
                     message: "User is Verified!!",
                     data
                 })
             }
         })
 } else {
     res.status(400).send({
         message: "Wrong phone number or code :(",
         phonenumber: req.query.phonenumber,
         data
     })
 }
})

// router.post('/', cors(), function(req, res) {
//   // do something w/ req.body or req
//   // res.sendFile(path.join(__dirname + '/index.html'));
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader('Access-Control-Max-Age', '1800');
//   res.setHeader('Access-Control-Allow-Headers', 'content-type');
//   res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
//   var receiver = req.body.receiver;
//   var sms = req.body.message;
//   console.log('POOOST_DATA=', receiver , sms);
//   // ADd PAYMENT_AMOOOOOOOOUNT t fireobase

//   sendTextMessage(receiver , sms);

//   res.send('Message sent successfully');
// });

// function sendTextMessage(rec , sms) {
//   client.messages.create({
//     body: rec,
//     to: sms,
//     from: '+13392203202'
//  }).then(message => console.log(message))
//    // here you can implement your fallback code
//    .catch(error => console.log(error))
 
// }

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);


// ENDPOINT
// http://localhost:9000/.netlify/functions/api

// http://localhost:9000/.netlify/functions/api/login?phonenumber=+22898840319