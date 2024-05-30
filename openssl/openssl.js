
/***************** 
 Read input file
******************/
const fs = require('node:fs');

data = fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
  return data
});
 

/***************** 
 Create TS Request
******************/
const openssl = require('openssl-nodejs');

// CLI
// openssl rand 512 | openssl ts -query -data - -cert -sha512 | curl -s -S --data-binary @- https://rfc3161.ai.moda -o - -v | xxd | head -20

// example
//openssl('openssl ts -query -data file.png -no_nonce -sha512 -cert -out file.tsq')

//openssl(['ts', '-query', '-data', { name:'file.dat', buffer: data }, '-no_nonce', '-sha512', '-cert', '-out', 'file.tsq']);
openssl(['ts', '-query', '-data', 'example.txt', '-no_nonce', '-sha512', '-cert', '-out', 'file.tsq'], function (err, buffer) {
	console.log(err.toString(), buffer.toString());
	});

/***************** 
 Send TS Request
******************/
// $ curl -H "Content-Type: application/timestamp-query" --data-binary '@file.tsq' https://freetsa.org/tsr > file.tsr

var tls = require('tls');

// Include Nodejs' net module.
const Net = require('net');
// The port number and hostname of the server.
const port = 8080;
const host = 'localhost';

// Create a new TCP client.
const client = new Net.Socket();
// Send a connection request to the server.
client.connect({ port: port, host: host }), function() {
    // If there is no error, the server has accepted the request and created a new 
    // socket dedicated to us.
    console.log('TCP connection established with the server.');

    // The client can now send data to the server by writing to its socket.
    client.write('Hello, server.');
});

// The client can also receive data from the server by reading from its socket.
client.on('data', function(chunk) {
    console.log(`Data received from the server: ${chunk.toString()}.`);
    
    // Request an end to the connection after the data has been received.
    client.end();
});

client.on('end', function() {
    console.log('Requested an end to the TCP connection');
});


/*******************
 Verify TS Response
********************/
//openssl('openssl ts -verify -in file.tsr -queryfile file.tsq -CAfile cacert.pem -untrusted tsa.crt')

/*
const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
*/

