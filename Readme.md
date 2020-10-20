Timestamp Formatter
===================

### An API for converting timestamps between UTC and UNIX

#### Dependencies
- node ^4.4.5
- express ^4.17.1
- cors ^2.8.5
- dotenv ^8.2.0

#### Install

Clone this repo to a system running node ^4.4.5, then run
```npm i```
to install dependencies.

#### Run

```npm start```

Will run on port 3000 by default, but that can be changed by adding a .env file and setting
```PORT=YOUR_PORT```

#### Logic

For ```...URI.../api/timestamp```
current date is returned as JSON object in both unix & utc forms:
```{"unix":1603191424752,"utc":"Tue, 20 Oct 2020 10:57:04 GMT"}```

For ```...URI.../api/timestamp/CUSTOM_TIMESTAMP```
server.js validates the given timestamp and returns a JSON object of the unix and utc formatted dates (as above).

If the given timestamp is not valid, it will return an error:
```{"error": "Invalid Date"}```
