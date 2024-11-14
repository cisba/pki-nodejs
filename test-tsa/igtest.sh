#!/bin/bash

#openssl ts -query -data igtest.sh -no_nonce -sha256 -cert -out igtest.tsq

#curl -H "Content-Type: application/timestamp-query" --data-binary '@igtest.tsq' https://tsa.test4mind.com/tsa/user -u 'user:password' > igtest.tsr

#openssl ts -reply -in igtest.tsr -text

#openssl ts -reply -in igtest.tsr -token_out -out token.tk

#openssl pkcs7 -inform DER -in token.tk -print_certs -outform PEM -out certificatechain.pem

# ***NOTE*** you have to manually extract rootCA.pem and untrusted.pem from certificatechain.pem

#openssl ts -verify -in igtest.tsr -queryfile igtest.tsq -CAfile rootCA.pem -untrusted untrusted.pem
