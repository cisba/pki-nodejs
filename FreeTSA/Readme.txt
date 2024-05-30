
https://freetsa.org/index_en.php

openssl ts -query -data TRACE4EU.png -no_nonce -sha512 -cert -out file.tsq
curl -H "Content-Type: application/timestamp-query" --data-binary '@file.tsq' https://freetsa.org/tsr > file.tsr
openssl ts -verify -in file.tsr -queryfile file.tsq -CAfile cacert.pem -untrusted tsa.crt


https://weisser-zwerg.dev/posts/trusted_timestamping/

openssl ts -reply -in file.tsr -text
openssl ts -reply -in ts_req.tsr -token_out -out token.tk
openssl pkcs7 -inform DER -in token.tk -print_certs -outform PEM -out certificatechain.pem
