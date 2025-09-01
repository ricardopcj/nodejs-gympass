npx prisma init

npx prisma generate

docker start/stop apisolid

npx prisma migrate dev

npx prisma studio

```sh
#!/bin/sh
openssl genpkey -algorithm RSA -out private-key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private-key.pem -out public-key.pem

echo "Done!"
```
