
### Node.js setup

[info](https://nodejs.org/en/download/package-manager)

installs fnm (Fast Node Manager)

    winget install Schniz.fnm

download and install Node.js

    fnm use --install-if-missing 20

verifies the right Node.js version is in the environment

    node -v # should print `v20.13.1`

verifies the right NPM version is in the environment

    npm -v # should print `10.5.2`


### Test with Hello World example

[info](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)

    node helloworld.js


### Example workflow using CLI openssl to request a Time Stamp to FreeTSA

[info](https://freetsa.org/)

Create a tsq (TimeStampRequest) file, which contains a hash of the file you want to sign.

    $ openssl ts -query -data TRACE4EU.png -no_nonce -sha512 -cert -out file.tsq

Send the TimeStampRequest to freeTSA.org and receive a tsr (TimeStampResponse) file.

    $ curl -H "Content-Type: application/timestamp-query" --data-binary '@file.tsq' https://freetsa.org/tsr > file.tsr

With the public Certificates you can verify the TimeStampRequest.

    $ openssl ts -verify -in file.tsr -queryfile file.tsq -CAfile cacert.pem -untrusted tsa.crt

### Other Free TSA

[info](https://gist.github.com/Manouchehri/fd754e402d98430243455713efada710)


### Install openssl-nodejs wrapper

[info](https://www.npmjs.com/package/openssl-nodejs)

    npm install openssl-nodejs


### Send TSRequest using https

    npm install urllib

    ***WIP***


### Extract TST from TSR?

[info](https://github.com/PeculiarVentures/PKI.js)

    npm install pkijs

[info](https://github.com/PeculiarVentures/PKI.js/tree/master/examples/TSPRequestComplexExample)

    ***TBD***

### END
