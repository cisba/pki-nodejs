//const HttpClient = require('..').HttpClient;
const HttpClient = require('urllib').HttpClient;

tryHttpclient(HttpClient, 'urllib');

//function tryHttpclient(HttpClient, name) {
function tryHttpclient(HttpClient, TSRequest) {
	const options = {
		timeout: 10000,
		timing: true,
		method: 'POST',
		data: TSRequest,
		//auth: 
		headers: { 
			'Content-Type': 'application/timestamp-query',
			'Content-Length': Buffer.byteLength(TSRequest)
		},
  };
  const urllib = new HttpClient();
  urllib.on('response', function(info) {
    // console.log(name, httpAgent, httpAgent.getCurrentStatus());
    // console.log(name, httpsAgent, httpsAgent.getCurrentStatus());
    //console.log('response', name, info.res);
    console.log('response length: ', Buffer.byteLength(info.res));
  });
  urllib.request('https://rfc3161.ai.moda', options)
    .then(function() {
      return urllib.request('https://rfc3161.ai.mod', options);
    })
    .catch(function(err) {
      console.error('catch', err);
    });
}
