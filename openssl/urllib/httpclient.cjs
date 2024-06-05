//const HttpClient = require('..').HttpClient;

//tryHttpclient(HttpClient, 'urllib');

//function tryHttpclient(HttpClient, name) {

module.exports = class Post {
	constructor(name) {
		this.name = name;
	    	console.log('name', this.name);
	}
	tryHttpclient() {
	  const options = {
	    method: 'GET',
	    timeout: 10000,
	    timing: true,
	  };
	  const HttpClient = require('urllib').HttpClient;
	  const urllib = new HttpClient();
	  urllib.on('response', function(info) {
	    // console.log(name, httpAgent, httpAgent.getCurrentStatus());
	    // console.log(name, httpsAgent, httpsAgent.getCurrentStatus());
	    //console.log('response', name, info.res);
	    console.log('response', this.name);
	  });
	  urllib.request('https://nodejs.org', options)
	//    .then(function() {
	//      return urllib.request('https://nodejs.org', options);
	//    })
	    .catch(function(err) {
	      console.error('catch', err);
	    });
	}
}
