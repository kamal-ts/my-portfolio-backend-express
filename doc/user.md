# User API Spec

## Register User

Endpoint : POST /api/users

Requet Body : 

```json
{
    "username": "kamal",
    "password": "rahasia",
    "name": "kamaluddin"
}
```

Response Body (Success):
```json
{
  "data": {
    "username": "kamal",
    "name": "kamaluddin"
  }
}
```
Response Body (Failed):
```json
{
  "errors": "Username already registered"
}
```


## Login User

Endpoint : POST /api/users/login

Requet Body : 

```json
{
    "username": "kamal",
    "password": "rahasia"
}
```

Response Body (Success):
```json
{
  "data": {
    "username": "kamal",
    "name": "kamaluddin",
    "token": "session_id_generated"
  }
}
```
Response Body (Failed):
```json
{
  "errors": "Username or password is wrong"
}
```


## Get User

Endpoint : GET /api/users/current

Eeaders :
- authorization: token

Response Body (Success):
```json
{
  "data": {
    "username": "kamal",
    "name": "kamaluddin"
  }
}
```
Response Body (Failed):
```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users/current

Headers :
- Authorization: token

Requet Body : 

```json
{
    "password": "rahasia", //optional
    "name": "kamaluddin" //optional
}
```

Response Body (Success):
```json
{
  "data": {
    "username": "kamal",
    "name": "kamaluddin"
  }
}
```
Response Body (Failed):
```json
{
  "errors": "Username alredy registered"
}
```

## Logout User

Endpoint : DELETE /api/users/current

Headers :
- Authorization: token

Response Body (Success):
```json
{
  "data": true
}
```