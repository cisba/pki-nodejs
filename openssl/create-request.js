
/***************** 
 Read input file
******************/
const fs = require('node:fs');

data = fs.readFile('example-files/example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
//  console.log(data);
  return data
});
 
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
openssl(['ts', '-query', '-data', 'example-files/example.txt', '-no_nonce', '-sha512', '-cert', '-out', 'file.tsq'], function (err, buffer) {
    console.log(err.toString(), buffer.toString());
});


