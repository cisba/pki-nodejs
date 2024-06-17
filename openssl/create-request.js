
/***************** 
 Read input file
******************/
const fs = require('node:fs');

var data = fs.readFileSync('example-files/example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data.length);
  //return data
});
console.log(data);

//var bufdata = Buffer.alloc(0);
bufdata = Buffer.from(data, "utf8");



/*
// Create openssl dir
var dir = './openssl';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
*/

/***************** 
 Create TS Request
******************/
const openssl = require('openssl-nodejs');

//openssl(['ts', '-query', '-data', 'example-files/example.txt', '-no_nonce', '-sha512', '-cert', '-out', 'file.tsq'], function (err, buffer) {
openssl(['ts', '-query', '-config', 'openssl.cnf', '-data', { name: 'file.dat', buffer: bufdata }, '-no_nonce', '-sha512', '-cert' ], function (err, buffer) {
	const { Buffer } = require('node:buffer');
	if (err) {
		console.error(err.toString());
	}
	//var body = Buffer.alloc(0);
	//body = Buffer.concat([body, buffer[0]], body.length + buffer[0].length);
	var body = Buffer.from(buffer[0]);
	console.log('Query length: ' + body.length);
	fs.writeFile('openssl/file.tsq', body, "binary", err => {
		if (err) {
			console.error(err);
		} else {
			console.log('file.tsq written successfully');
		}
	});

});


