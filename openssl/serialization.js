function parameterValidation () {
	var res = { opts: { url: "https://tsa.my-qtsp.com", auth: "base64_user_pass" } , data: "myData"} 
	console.log("parameterValidation :", res)
	return ( res )
}

function createQuery (prev) {
	prev.ts_query = "buffer_ts_query"
	console.log("createQuery: ", prev)
	return (prev)
}

function httpsPostCall (prev) {
	prev.ts_reply = "buffer_ts_reply"
	console.log("httpsPostCall: ", prev)
	return (prev)
}

function getToken (prev) {
	prev.ts_token = "buffer_ts_token"
	console.log("getToken: ", prev)
	return (prev)
}

function getString (prev) {
	prev.ts_string="ts_string"
	console.log("getString: ", prev)
	return (prev)
}



function serial(asyncFunctions) {
    return asyncFunctions.reduce(function(functionChain, nextFunction) {
        return functionChain.then(
            (previousResult) => nextFunction(previousResult)
        );
    }, Promise.resolve());
}

serial([parameterValidation, createQuery, httpsPostCall, getToken, getString ])
   .then((result) => console.log(`Operation result: ` + JSON.stringify(result)))
   .catch((error) => console.log(`There has been an error: ${error}`))
