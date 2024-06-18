
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

	setupQuery(data) {
		return new Promise((resolve, reject) => {
			setTimeout(function () {
			      console.log('Fast function done')
			      resolve("risultato")
			}, 100)
		})
	}

	getTimestamp ( data, callback ) {
		console.log("This is your data: " + data);

		this.query = this.setupQuery(data).then((result) => {
		    	console.log(result)
		      	return result
		}).catch(console.log.bind(console))
		console.log("Fine:" + JSON.stringify(this.query))
			

/*		return this.setupQuery(data)
		    //.then(postHttps)
		    //.then(getString)
		    //.then(getToken)
		    .then((result) => {
		      console.log(result)
		      return result
		    })
		    .catch(console.log.bind(console))
*/
	}
}
