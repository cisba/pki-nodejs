
/***************** 
 Extract Time Stamp token and string
******************/
const openssl = require('openssl-nodejs');

// CLI
//Extract the Time Stamp Token from the reply
//    $ openssl ts -reply -in file.tsr -token_out -out file.tst
//Extract the time stamp string from the token
//    $ openssl ts -reply -in file.tsr -text

openssl(['ts', '-reply', '-in', 'file.tsr', '-token_out', '-out', 'file.tst'], function (err, buffer) {
    console.log(err.toString(), buffer.toString());
});


openssl(['ts', '-reply', '-in', 'file.tsr', '-text'], function (err, buffer) {
    console.log(err.toString(), buffer.toString());
});
