# start project
```sh
npm install
npm run dev
```
> http://127.0.0.1:3080/api 

## signup

> http://127.0.0.1:3080/api/user/signup


```
curl --location --request POST 'http://127.0.0.1:3080/api/user/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "Security_id": "u2",
    "Password_id": "11",
    "user_name": "user_name",
    "user_phone": "user_phone",
    "address":"address2"
}'
```

## signin

> http://127.0.0.1:3080/api/user/signin


```
curl --location --request POST 'http://127.0.0.1:3080/api/user/signin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "Security_id": "u1",
    "Password_id": "11" 
}'
```