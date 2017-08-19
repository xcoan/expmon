# Learning Mongo and Node
### A RESTful API built in Node with Mongo.


This is loosely based on [Zellwk's Tutorial](https://zellwk.com/blog/crud-express-mongodb/).

The API has been tested using [Postman](https://www.getpostman.com/)


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
  * `/quotes` with a body hash { 'name': 'YOUR NAME HERE', 'quote': 'YOUR QUOTE HERE' }

* PUT
  * `/quotes/:id/:up_name/:up_quote` Updates existing quote with given id with new name and new quote

* DELETE
  * `/quotes/:id` removes the quote from the DB

## TODO
* Add auth?
