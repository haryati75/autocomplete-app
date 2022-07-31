# Autocomplete service using Github Search API

A web app to perform autocomplete search on Github popular users:
  1. frontend web page:
    - Search input page (must enter keypass first for authorisation)
    - Key in name of users that have at least N repositories and at least M followers
  2. server:
    - Provide REST API services to frontend
    - API calls to Github Search API via octokit library

## Installation

### Pre-installed:
* NodeJS v14
* yarn or npm

### GitHub Account - Developer Settings
Before server and client installation, create personal access token from GitHub:
1. Login to GitHub
2. Go to Account -> Developer Settings
3. Go to Personal Access Token
4. Create Personal Access Token
5. Generate Token and copy it immediately and save (one-time display only at GitHub)
6. Paste token to .env file as GH_PERSONAL_ACCESS_TOKEN


### Token Secret for JWT
1. https://randomkeygen.com/ => generate and copy keygen from here or other alternative password generator website
2. Paste keygen to .env file as TOKEN_SECRET

### Server Installation

#### Server Environment variables 
Create .env with the following variables filled:
```
PORT=
GH_PERSONAL_ACCESS_TOKEN=
MYAPP_KEYPASS=
TOKEN_SECRET=
```

Note: MYAPP_KEYPASS is the password to access server from client's Authorise Page.

To run locally, follow these steps in terminal:
```
$git clone {path_to_repository}
$yarn 
$yarn start
$open localhost:4000
```
### Client Installation
To run locally, follow these steps in terminal:
```
$git clone {path_to_repository}
$yarn 
$yarn start
$open localhost:3000
```

### Keypass prompt at client:
When prompted for Keypass at Client webpage http://localhost:3000,
key in the same MYAPP_KEYPASS from the .env file.


## GitHub Search API : users
```
GET /search/users
```
https://docs.github.com/en/rest/search#search-users

Query search on the following:
* User Name
* At least N repos
* At least M followers


## Frontend feature
- Technology: React v18
- use Axios library (with AJAX technologies) to call REST APIs to Server
- Autocomplete - using debounce and throttle to limit API calls during typing of input text
- JWT Access Token 
- Navigation between getting keypass and enable search 
- port: 3000

## Server feature
- Technology: NodeJS / Express
- Define API services
- setup Github Personal Token 
- Github Search API query (limit rate)
- JWT token for session -> re-key keypass if token expired
- Environment variables (dotenv)
- port: 4000


## autocomplete - client
Created using:
```
  npx create-react-app
```

## autocomplete - server
Created using:
```
  npm init
```

## Dependencies:

For server:
```
  yarn add express dotenv jsonwebtoken cors
  yarn add octokit
```

For client:
```
  yarn add react-router-dom@5
  yarn add axios
```


## Github Authentication via OAuth - web application flow (future enhancement)
https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps
### Steps:
1. Create New OAuth App in Github -> Settings -> Developer Settings -> OAuth Apps
2. Copy Client ID and Client Secret (one-time copy)

3. Request a user's GitHub identity
```
GET https://github.com/login/oauth/authorize
```
4. Users are redirected back to our site by Github with a code
5. Exchange code for an access_token
```
POST https://github.com/login/oauth/access_token
```
6. Your app accesses API with the user's access token


