
/***************** 
 Read input file
******************/
const fs = require('node:fs');

var data = fs.readFileSync('example-files/example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
});

//var bufdata = Buffer.alloc(0);
bufdata = Buffer.from(data, "utf8");
console.log(bufdata.length);


/***************** 
 Get Qtimestamp
******************/
const TSA = require('./timestamp.ts');

let tsa = new TSA("Questa è la mia configurazione");

tsa.getTimestamp("Questi sono i miei dati", function(err, token) {
	console.log("Questo è il token ricevuto: " + token)
});
