process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var WebSocket = require('ws');
var ws = new WebSocket('wss://172.17.0.9');
var crypto = require('crypto');

var timeout = 0;

ws.on('open', function open() {
  console.log('connected established\n');
  console.log('timeout:', timeout);
  var randomString = crypto.randomBytes(Math.floor((Math.random() * 100)) + 1).toString('hex');
  ws.send(randomString, function() {
    console.log('sent a random string of length %s', randomString.length);
  });
});

ws.on('message', function incomming(message) {
  console.log('received: %s', message);
  console.log('\n');
  timeout += 1000;
  setTimeout(function() {
    console.log('timeout:', timeout);
    var randomString = crypto.randomBytes(Math.floor((Math.random() * 100)) + 1).toString('hex');
    ws.send(randomString, function() {
      console.log('sent a random string of length %s', randomString.length);
    });
  }, timeout);
});
