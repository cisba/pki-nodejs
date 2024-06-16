
/***************** 
 Read input file
******************/
const fs = require('node:fs');

var data = fs.readFile('example-files/example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data.length);
  return data
});
console.log(data);

// Create openssl dir
var dir = './openssl';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}


/***************** 
 Create TS Request
******************/
const openssl = require('openssl-nodejs');

// CLI
// openssl rand 512 | openssl ts -query -data - -cert -sha512 | curl -s -S --data-binary @- https://rfc3161.ai.moda -o - -v | xxd | head -20

// example
//openssl('openssl ts -query -data file.png -no_nonce -sha512 -cert -out file.tsq')

//openssl(['ts', '-query', '-data', { name:'file.dat', buffer: data }, '-no_nonce', '-sha512', '-cert', '-out', 'file.tsq']);
//openssl(['ts', '-query', '-data', 'example-files/example.txt', '-no_nonce', '-sha512', '-cert', '-out', 'file.tsq'], function (err, buffer) {
openssl(['ts', '-query', '-data', 'example-files/example.txt', '-no_nonce', '-sha512', '-cert' ], function (err, buffer) {
	const { Buffer } = require('node:buffer');
	if (err) {
		console.error(err.toString());
	} else {
		var body = Buffer.alloc(0);
		body = Buffer.concat([body, buffer[0]], body.length + buffer[0].length);
		console.log('Query length: ' + body.length);
	}

/*			fs.writeFile('openssl/file.tsq', buffer, "binary", err => {
				if (err) {
					console.error(err);
				} else {
					console.log('file.tsq written successfully');
				}
			});
*/			
//	    	});


});


