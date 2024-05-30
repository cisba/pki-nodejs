
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

	// $ npm install needle
	const needle = require('needle');

	var options = {
		headers: { 'Content-Type': 'application/timestamp-query' },
		//output: 'file.tsr'
	}
	console.log("Options: " + JSON.stringify(options)); 

	needle.post('https://rfc3161.ai.moda', TSRequest, options, function(err, resp) {
	  // you can pass params as a string or as an object.
		if (err)
			console.log('Shoot! Something is wrong: ' + err.message)
		else
			console.log('Yup, still alive.')
			console.log('Response: ' + resp.body);
			fs.writeFile('file.tsr', resp.body, err => {
				if (err) {
					console.error(err);
				} else {
					console.log('file written successfully');
				}
			});
	});

}
