
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

install typescript

    npm install -g typescript

### Test with Hello World example

[info](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs)

    node helloworld.js

### Install openssl-nodejs wrapper

[info](https://www.npmjs.com/package/openssl-nodejs)

    npm install openssl-nodejs

### Example workflow using CLI openssl to request a Time Stamp to FreeTSA

[info](https://freetsa.org/)

Create a tsq (TimeStampRequest) file, which contains a hash of the file you want to sign.

    $ openssl ts -query -data TRACE4EU.png -no_nonce -sha512 -cert -out file.tsq

Send the TimeStampRequest to freeTSA.org and receive a tsr (TimeStampResponse) file.

    $ curl -H "Content-Type: application/timestamp-query" --data-binary '@file.tsq' https://freetsa.org/tsr > file.tsr

With the public Certificates you can verify the TimeStampRequest.

    $ openssl ts -verify -in file.tsr -queryfile file.tsq -CAfile cacert.pem -untrusted tsa.crt

Extract the Time Stamp Token from the reply
    $ openssl ts -reply -in file.tsr -token_out -out file.tst

Extract the time stamp string from the token
    $ openssl ts -reply -in file.tsr -text

### Verify

[info](https://weisser-zwerg.dev/posts/trusted_timestamping/)

    openssl dgst -sha3-256 state.txt
    openssl ts -verify -digest e22171694fd8e4240550f995c558bcc967b3df0e928b51a746b2cba26f6d9ea4 -in ts_req.tsr -CAfile AppleTimestampCA.cer -partial_chain

### Other Free TSA

[info](https://gist.github.com/Manouchehri/fd754e402d98430243455713efada710)



### END
