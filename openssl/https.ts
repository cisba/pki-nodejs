
const fs = require('node:fs');


fs.readFile('./openssl/file.tsq', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  sendRequest(data);
});


function sendRequest(TSRequest) { 

	const https = require('node:https');

	const post_options = {
		hostname: 'freetsa.org',
		path: '/tsr',
		//hostname: 'tsp.iaik.tugraz.at',
		//path: '/tsp/TspRequest',
		//hostname: 'ca.signfiles.com',
		//path: 'tsa/get.aspx',
		//hostname: 'rfc3161.ai.moda',
		port: 443,
		method: 'POST',
		//auth: 'user:password',
		headers: {
          		'Content-Type': 'application/timestamp-query',
			'Content-Length': TSRequest.length,
		},
	};
	console.log("Headers: " + JSON.stringify(post_options)); 

	// Set up the request
	var post_req = https.request(post_options, function(res) {
	    	res.on('data', function (chunk) {
			console.log('Response: ' + chunk.length);

			fs.writeFile('openssl/file.tsr', chunk, err => {
				if (err) {
					console.error(err);
				} else {
					console.log('file.tsr written successfully');
				}
			});
	    	});
	});

	// post the TSRequest
	post_req.write(TSRequest);
	post_req.end();

}
