
const fs = require('node:fs');


fs.readFile('./file.tsq', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("File length: " + data.length);
  sendRequest(data);
});


function sendRequest(TSRequest) { 
	console.log("TSRequest Length: " + TSRequest.length); 

	const http = require('node:http');

	const post_options = {
		hostname: 'rfc3161.ai.moda',
		port: 80,
		method: 'POST',
		path: '/',
		//auth: 'user:password',
		headers: {
			//'Host': 'rfc3161.ai.moda',
			//'User-Agent': 'curl/7.88.1',
			//'Accept': '*/*',
			//'Proxy-Connection': 'Keep-Alive',
          		'Content-Type': 'application/timestamp-query',
			'Content-Length': TSRequest.length,
		},
	};
	console.log("Headers: " + JSON.stringify(post_options)); 

	// Set up the request
	var post_req = http.request(post_options, function(res) {
	    	res.on('data', function (chunk) {
			console.log('Response: ' + chunk.length);
			// TODO: write to a file
	    	});
	});

	// post the TSRequest
	post_req.write(TSRequest);
	post_req.end();

}
