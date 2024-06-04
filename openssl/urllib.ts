
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

	// $ npm install urllibe
	const request = require('urllib');

	var options = {
		method: 'POST',
		data: TSRequest,
		//auth: 
		headers: { 
			'Content-Type': 'application/timestamp-query',
			'Content-Length': Buffer.byteLength(TSRequest)
		},
	}
	console.log("Options: " + JSON.stringify(options)); 

	const tsa = 'https://rfc3161.ai.moda'
	//const tsa = 'https://freetsa.org/tsr'
	console.log("TSA: " + tsa); 
	const { data, res } = await request{ tsa, options };

	// result: { data: Buffer, res: Response }
	console.log('status: %s, body size: %d, headers: %j', res.status, data.length, res.headers);

	fs.writeFile('file.tsr', data, err => {
		if (err) {
			console.error(err);
		} else {
			console.log('file.tsr written successfully');
		}
	});

}
