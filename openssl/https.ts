
const fs = require('node:fs');


fs.readFile('./file.tsq', 'binary', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("File length: " + data.length);
  sendRequest(data);
});


function sendRequest(TSRequest) { 
	console.log("TSRequest Length: " + TSRequest.length); 
	console.log("TSRequest Buffer.byteLength: " + Buffer.byteLength(TSRequest));

	const https = require('node:https');

	// the following CLI request works:
	// curl -H "Content-Type: application/timestamp-query" --data-binary '@file.tsq' https://rfc3161.ai.moda > file.tsr
	const post_options = {
		//hostname: 'freetsa.org',
		//path: '/tsr',
		//hostname: 'tsp.iaik.tugraz.at',
		//path: '/tsp/TspRequest',
		//hostname: 'ca.signfiles.com',
		//path: 'tsa/get.aspx',
		hostname: 'rfc3161.ai.moda',
		port: 443,
		//method: 'POST',
		//auth: 'user:password',
		headers: {
          		'Content-Type': 'application/timestamp-query',
			//'Content-Length': TSRequest.length
			'Content-Length': Buffer.byteLength(TSRequest)
		},
	};
	console.log("Headers: " + JSON.stringify(post_options)); 

	// Set up the request
	var post_req = https.request(post_options, function(res) {
		//res.setEncoding('utf8');
		//res.setEncoding('binary');
	    	res.on('data', function (chunk) {
			console.log('Response: ' + chunk);
	    	});
	});

	// post the data
	post_req.write(TSRequest);
	post_req.end();

}
