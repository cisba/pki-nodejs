module.exports = class TSA {
	//pippo: string;
	constructor(config){
		this.pippo = config;
	console.log("contructor executed")
	console.log("This is your config: " + this.pippo);
	}
	getTimestamp(data, callback) {
		console.log("This is your data: " + data);
		var err = "This is an error!";
		var token = "This is your time stamp token.";
		callback(err, token);
	}
}

//var tsa = new TSA();

//ts = tsa.getTimestamp("zxcvzxcvzxcvzxcv");

/***************** 
 Create TS Request
******************
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

*/
