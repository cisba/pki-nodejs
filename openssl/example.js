
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

let tsa = new TSA("Questo è un url", "Questa è un'auth");

tsa.getTimestamp("Questi sono i miei dati", function(err, token, timestring) {
	console.log("Questo è l'errore ricevuto: " + err)
	console.log("Questo è il token ricevuto: " + token)
	console.log("Questa è la stringa ricevuta: " + timestring)
});
