## Description

BTCUSDT price synchronizer.

A server app which periodically fetch the BTCUSDT price into database and exposes api with exchange rate history and current rate.

## Installation

```bash
$ npm install
```

## Running the app

* Run PostgreSQL with Docker
```bash
docker compose up
```

* Run NodeJS app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## GraphQL API with JWT

Playground: http://localhost:3000/graphql

### Login
```
mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    access_token
  }
}
```

QUERY VARIABLES
```
{
  "username": "guest",
  "password": "guest"
}
```

Use `access_token` (Bearer token) for API requests with "Authorization" HTTP header.

### Exchange rate history
```
query($currency: String!, $skip: Int!, $take: Int!) {
  currencies(currency: $currency, skip: $skip, take: $take) {
    currency
    price
    createdAt
  }
}
```

QUERY VARIABLES
```
{
  "currency": "BTCUSDT",
  "skip": 0,
  "take": 3
}
```

HTTP HEADERS
```
{
  "Authorization": "Bearer [access_token]"
}
```

### Current rate    
```
query($currency: String!) {
  currencyPrice(currency: $currency)
}
```

QUERY VARIABLES
```
{
  "currency": "BTCUSDT"
}
```

HTTP HEADERS
```
{
  "Authorization": "Bearer [access_token]"
}
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
