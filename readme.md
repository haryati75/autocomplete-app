# Autocomplete service using Github Search API

A web app to perform autocomplete search on Github repositories:
  1. frontend web page:
    - Search input page (must enter keypass first)
  2. server:
    - Provide REST API services to frontend
      - to generate jwt access token
      - to call Search with filter
    - API calls to Github Search API via octokit library

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
- Technology: React
- use Axios library (with AJAX technologies) to call REST APIs to Server
- Autocomplete - using debounce and throttle
- JWT Access Token 
- Navigation between getting keypass and enable search 
- port: 3000

## Server feature
- Technology: NodeJS / Express
- Define API services
- setup Github Personal Token 
- Github Search API query (limit rate)
- JWT token for session
- Environment variables: Port, JWT_Token_Secret, keypass
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

# Github Authentication - web application flow (future enhancement)
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


