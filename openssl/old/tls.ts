const fs = require('node:fs');


fs.readFile('openssl/file.tsq', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data.length);
  sendRequest(data);
});

function sendRequest(TSRequest) { 
	console.log(TSRequest.length); 

	'use strict';

	var tls = require('tls');
	var fs = require('fs');

	const PORT = 443;
	//const HOST = 'freetsa.org'
	const HOST = 'rfc3161.ai.moda'

	var options = {
//	    key: fs.readFileSync('private-key.pem'),
//	    cert: fs.readFileSync('public-cert.pem'),
//	    TBD: basic auth
	    rejectUnauthorized: false
	};

	var client = tls.connect(PORT, HOST, options, function() {

	    // Check if the authorization worked
	    if (client.authorized) {
		console.log("Connection authorized by a Certificate Authority.");
	    } else {
		console.log("Connection not authorized: " + client.authorizationError)
	    }

	    // Send a friendly message
	    //client.write("I am the client sending you a message.");
	    //client.write("POST /tsr HTTP/1.1");
	    client.write("Content-Type: application/timestamp-query");
	    client.write(TSRequest);
	});

	client.on("data", function(data) {

	    console.log('Received: %s [it is %d bytes long]',
		data.toString().replace(/(\n)/gm,""),
		data.length);

	    // Close the connection after receiving the message
	    client.end();

	});

	client.on('close', function() {

	    console.log("Connection closed");

	});

	// When an error ocoures, show it.
	client.on('error', function(error) {

	    console.error(error);

	    // Close the connection after the error occurred.
	    client.destroy();

	});


}

/* */
