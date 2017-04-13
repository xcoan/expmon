# Learning Mongo and Node
### A REST API built in Node with Mongo.


This is based on [Zellwk's Tutorial](https://zellwk.com/blog/crud-express-mongodb/).


## API Features
* CRUD
  * Create
  * Read
  * Update
  * Delete

* GET
  * `/quotes/json` returns json for quotes
  * `/quotes/:id/json` returns json of specific quote
  * `/quotes/:id/name` returns name of specified quote
  * `/quotes/:id/quote` returns the quote itself

* POST
  * `/quotes/:name/:quote` Posts a new quote to the DB

* PUT
  * `/quotes/:id/:new_name/:new_quote` Updates existing quote with given id with new name and new quote

* DELETE
  * `/quotes/:id` removes the quote from the DB

## TODO
* Make POST route less janky
* Add auth?
