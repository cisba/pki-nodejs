
const fs = require('node:fs');


fs.readFile('openssl/file.tsq', 'binary', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("File length: " + data.length);
  sendRequest(data);
});


function sendRequest(TSRequest) { 
	console.log("TSRequest Length: " + TSRequest.length); 

	const https = require('node:https');

	const post_options = {
		//hostname: 'freetsa.org',
		//path: '/tsr',
		//hostname: 'tsp.iaik.tugraz.at',
		//path: '/tsp/TspRequest',
		//hostname: 'ca.signfiles.com',
		//path: 'tsa/get.aspx',
		hostname: 'rfc3161.ai.moda',
		port: 443,
		method: 'POST',
		//auth: 'user:password',
		headers: {
          		'Content-Type': 'application/timestamp-query',
			//'Content-Length': TSRequest.length
			//'Content-Length': Buffer.byteLength(TSRequest)
		},
	};
	console.log("Headers: " + JSON.stringify(post_options)); 

	// Set up the request
	var post_req = https.request(post_options, function(res) {
		//res.setEncoding('utf8');
		res.setEncoding('binary');
	    	res.on('data', function (chunk) {
			console.log('Response: ' + chunk);
	    	});
	});

	// post the data
	post_req.write(TSRequest);
	post_req.end();

}
