var base64 = require('base-64');
var utf8 = require('utf8');
var encoded = 'zW7xYQMdX3yy+VhhPuOlrg==';
var bytes = base64.decode(encoded);
var text = utf8.decode(bytes);
console.log(text)