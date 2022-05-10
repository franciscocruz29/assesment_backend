# Favs-Api
## Description
Favs is a new company that aims to provide a better way to organize your favorite things: music, clothes, courses, etc., all in one place.

## Installation
Create a .env file with the following properties:
```
MONGODB_URI=[Add DB connection here]
MONGODB_TEST_URI=[Add DB test connection here]
TOKEN_KEY=[Add token key]
PORT=[Add port]
```

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install
```

and

```console
$ npm start
```

## Testing
In order to run test cases:

```console
$ npm run test
```

## Endpoints

| Route	| HTTP Verb | Description |
| :--- | :--- | :--- |
| /api/favs | GET	|	Get all list of favorites |
| /api/favs | POST | Creates a new list of favorites |
| /api/favs/:id | GET | Get a single list of favorites |
| /api/favs/:id | DELETE |	Deletes a list of favorites |
| /auth/local/login | POST |	Login user by email/password |

## Documentation
[API DOCS](https://documenter.getpostman.com/view/20215269/Uyxepohf)

## Authorization

To authenticate an API request, you should provide your API key in the `Authorization` header.

## Request bodies

### Create user
**Request:**
```json
{
    "email": "testEmail@mail.com",
    "password": "1234567" 
}
```

### Login
**Request:**
```json
{
    "email": "testEmail@gmail.com",
    "password": "1234567" 
}
```
### Create a new list of favorites

**Request:**
```json
{
    "name": "Fav List 1",
    "favs": [
        {
            "title": "Fav 1",
            "description": "Description fav 1",
            "link": "https://url.com"
        }
    ]
}
```