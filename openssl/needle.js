
const fs = require('node:fs');


fs.readFile('./file.tsq', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  sendRequest(data);
});


function sendRequest(TSRequest) { 
	console.log("TSRequest Buffer.byteLength: " + Buffer.byteLength(TSRequest));

	// $ npm install needle
	const needle = require('needle');

	var options = {
		headers: { 
			'Content-Type': 'application/timestamp-query',
			'Content-Length': Buffer.byteLength(TSRequest)
		},
	}
	console.log("Options: " + JSON.stringify(options)); 

	//const tsa = 'https://rfc3161.ai.moda'
	const tsa = 'https://freetsa.org/tsr'
	needle.post(tsa, TSRequest, options, function(err, resp) {
		if (err)
			console.log('Shoot! Something is wrong: ' + err.message)
		else
			console.log('Response Length: ' + resp.body.length);
			fs.writeFile('file.tsr', resp.body, err => {
				if (err) {
					console.error(err);
				} else {
					console.log('file.tsr written successfully');
				}
			});
	});

}
