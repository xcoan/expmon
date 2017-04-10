# Learning Mongo and Node
### A REST API built in Node with Mongo.


This is based on [Zellwk's Tutorial](https://zellwk.com/blog/crud-express-mongodb/).


## API Features
* Create
* Read
* Delete

GET `/quotes/json` returns json for quotes
GET `/quotes/:id/json` returns json of specific quote
GET `/quotes/:id/name` returns name of specified quote
GET `/quotes/:id/quote` returns the quote itself

POST `/quotes/:name/:quote` Posts a new quote to the DB

DELETE `/quotes/:id` removes the quote from the DB

## TODO
* Add Update functionality
* Make POST route less janky
* Add auth?
