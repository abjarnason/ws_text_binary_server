process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var WebSocket = require('ws');
var ws = new WebSocket('wss://172.17.0.9');
var crypto = require('crypto');

var timeout = 0;

ws.on('open', function open() {
  console.log('connection established\n');
  console.log('timeout:', timeout);
  var randomBytes = crypto.randomBytes(Math.floor((Math.random() * 1024)) + 1);
  ws.send(randomBytes, {
    binary: true,
    mask: true
  }, function() {
    console.log('sent %d bytes of random binary data', randomBytes.length);
  });
});

ws.on('message', function incomming(message) {
  console.log('received: %s', message);
  console.log('\n');
  timeout += 1000;
  setTimeout(function() {
    console.log('timeout:', timeout);
    var randomBytes = crypto.randomBytes(Math.floor((Math.random() * 256)) + 1);
    ws.send(randomBytes, {
      binary: true,
      mask: true
    }, function() {
      console.log('sent %d bytes of random binary data', randomBytes.length);
    });
  }, timeout);
});
