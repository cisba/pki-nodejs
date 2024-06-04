
const fs = require('node:fs');


fs.readFile('./file.tsq', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  sendRequest(data);
});


function sendRequest(TSRequest) { 

	const https = require('node:https');

	// the following CLI request works:
	// curl -H "Content-Type: application/timestamp-query" --data-binary '@file.tsq' http://rfc3161.ai.moda > file.tsr
	const post_options = {
		hostname: '127.0.01',
		port: 8080,
		method: 'POST',
		//path: 'https://rfc3161.ai.moda',
		path: 'https://freetsa.org/tsr',
		//auth: 'user:password',
		rejectUnauthorized: false,
		headers: {
			//'Host': 'freetsa.org',
			//'Host': 'rfc3161.ai.moda',
			//'User-Agent': 'curl/7.88.1',
			//'Accept': '*/*',
			//'Proxy-Connection': 'Keep-Alive',
          		'Content-Type': 'application/timestamp-query',
			'Content-Length': Buffer.byteLength(TSRequest),
		},
	};
	console.log("Headers: " + JSON.stringify(post_options)); 

	// Set up the request
	var post_req = https.request(post_options, function(res) {
	    	res.on('data', function (chunk) {
			console.log('Response: ' + chunk.length);
	    	});
	});

	// post the data
	post_req.write(TSRequest);
	post_req.end();

}
