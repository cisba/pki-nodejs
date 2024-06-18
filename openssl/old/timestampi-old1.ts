
module.exports = class TSA {

	constructor( tsaurl, auth=undefined, tsacert=undefined, 
		    timeout=10000, hashtype="sha512", 
		    trustchain=true, nonce=true, clockoffset=60, 
		    opensslconf="openssl.cnf" ){
		if (tsaurl) { 
			this.tsaurl = tsaurl; 
			this.hostname = undefined;
			this.path = undefined;
		} else { 
			console.error("url missed"); 
			trow()
		}
		if (auth) { this.auth = auth; }
		if (tsacert) { this.tsacert = tsacert; }
		if (timeout) { this.timeout = timeout; }
		if (hashtype) { this.hashtype = hashtype; }
		if (trustchain) { this.trustchain = trustchain; }
		if (nonce) { this.nonce = nonce; }
		if (clockoffset) { this.clockoffset = clockoffset; }
		if (opensslconf) { this.opensslconf = opensslconf; }
		const { Buffer } = require('node:buffer');
		this.query = Buffer.alloc(0);
		this.reply = Buffer.alloc(0);
		this.token = Buffer.alloc(0);
		this.string = Buffer.alloc(0);
		console.log("This is your config: " + JSON.stringify(this));
	}

	getTimestamp ( data, callback ) {
		const { Buffer } = require('node:buffer');
		//const fs = require('node:fs');
		const openssl = require('openssl-nodejs');

		console.log("This is your data: " + data);


		function getQuery ( buffer, callback ) {
			const { Buffer } = require('node:buffer');
			var body = Buffer.from(buffer[0]);
			console.log('Query length: ' + body.length);
			this.query = body;

			callback(undefined, "TOKEN", "TIMESTRING");
		}


		// create query from data
		var bufdata = Buffer.from(data);
		openssl(['ts', '-query', '-config', 'openssl.cnf', '-data', 
			{ name: 'file.dat', buffer: bufdata }, '-no_nonce', 
			'-sha512', '-cert' ], function(err,buffer){
				if (err) console.error(err.toString());
				getQuery(buffer,callback);
			});
	}
/*
		// setup https post options and headers
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
			//auth: 'user:password'.base64(),
			headers: {
				'Content-Type': 'application/timestamp-query',
//				'Content-Length': Buffer.byteLength(this.query),
			},
			timeout: 10000,
		};
		console.log("Post Options: " + JSON.stringify(post_options)); 

		// setup request to TSA
		var post_req = https.request(post_options, function(res) {
			const { Buffer } = require('node:buffer');
			var body = Buffer.alloc(0);
			res.on('data', function (chunk) {
				body = Buffer.concat([body, chunk], body.length + chunk.length);
			});
			res.on('error', function(err) {
				// Handle error
				console.log(err)
			});
			res.on('uncaughtException', function(err) {
				// Handle error
				console.log(err)
			});
			res.on('end', function () {
				console.log('Response: ' + body.length);

				fs.writeFile('openssl/file.tsr', body, "binary", err => {
					if (err) {
						console.error(err);
					} else {
						console.log('file.tsr written successfully');
					}
				});
			});
		});

		// post the query
		console.log(Date());
		post_req.write(this.query);
		post_req.end();
		console.log(Date());

*/

		// END
	
}
