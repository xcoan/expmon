// Declare global variables
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const app = express()

// EJS for views
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))

var db
// Connect to MLAB mongoDB instance
MongoClient.connect(`mongodb://dbuser:dbpass@ds131320.mlab.com:31320/learn-mongo-db`, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

// Front page, no API usage
app.get('/', (req,res) => {
  res.send('You might want to go to /quotes for the good stuff!')
})

// Returns EJS page of all quotes
app.get('/quotes', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('quotes.ejs', {quotes: result})
  })
})

// Returns JSON of all quotes from collection
app.get('/quotes/json', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.send(result)
  })
})

// Returns EJS page of single quote
app.get('/quotes/:q_id', (req, res) => {
  db.collection('quotes').find({'_id': new ObjectId(req.params.q_id)}).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('quote.ejs', {quote: result})
    console.log(result[0])
  })
})

// Returns name associated with quote given by q_id
app.get('/quotes/:q_id/name', (req, res) => {
  db.collection('quotes').find({'_id': new ObjectId(req.params.q_id)}).toArray((err, result) => {
    if (err) return console.log(err)
    res.send(result[0].name)
    console.log(result[0].name)
  })
})

// Retruns the quotation associated with a quote document given by q_id
app.get('/quotes/:q_id/quote', (req, res) => {
  db.collection('quotes').find({'_id': new ObjectId(req.params.q_id)}).toArray((err, result) => {
    if (err) return console.log(err)
    res.send(result[0].quote)
    console.log(result[0].quote)
  })
})

// Returns JSON of document with given q_id
app.get('/quotes/:q_id/json', (req, res) => {
  db.collection('quotes').find({'_id': new ObjectId(req.params.q_id)}).toArray((err, result) => {
    if (err) return console.log(err)
    res.json(result)
    console.log(result)
  })
})

// Creates new quote document with given name and quote
app.post('/quotes/:name/:quote', (req, res) => {
  var new_name = req.params.name
  var new_quote = req.params.quote
  db.collection('quotes').save({ name: new_name, quote: new_quote}, (err, result) => {
    if (err) return console.log(err)

    res.send(result)
    console.log(result)
  })
})

// Creates a quote from the UI found in views/quotes.ejs
app.post('/quotes', (req, res) => {
  console.log(req)
    db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log(req.body)
    res.send(result)
  })
})

// Deletes a quote document with given q_id
app.delete('/quotes/:q_id', (req, res) => {
  db.collection('quotes').remove({'_id': ObjectId(req.params.q_id)}, (err, result) => {
    if (err) return console.log(err)
    res.json(result)
    console.log(result)
  })
})

// Updates a quote document located at given q_id with new up_name and up_quote
app.put('/quotes/:q_id/:up_name/:up_quote', (req, res) => {
  var quote_id = req.params.q_id
  var update_name = req.params.up_name
  var update_quote = req.params.up_quote

  db.collection('quotes').update({'_id': ObjectId(req.params.q_id)}, {name: update_name, quote: update_quote}, {upsert: true}, (err, result) => {
    if (err) return console.log(err)
    res.json(result)
    console.log(result)
  })
})
