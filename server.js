const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId

const app = express()

var mongoUser = process.env.mongoUser
var mongoPass = process.env.mongoPass

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))

var db

MongoClient.connect(`mongodb://dbuser:dbpass@ds131320.mlab.com:31320/learn-mongo-db`, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req,res) => {
  res.send('you in the wrong neighborhood, muthafucka!')
})

app.get('/quotes', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('quotes.ejs', {quotes: result})
  })
})

app.get('/quotes/json', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.send(result)
  })
})

app.get('/quotes/:q_id', (req, res) => {
  db.collection('quotes').find({'_id': new ObjectId(req.params.q_id)}).toArray((err, result) => {
    if (err) return console.log(err)
    res.render('quote.ejs', {quote: result})
    console.log(result[0])
  })
})

app.get('/quotes/:q_id/name', (req, res) => {
  db.collection('quotes').find({'_id': new ObjectId(req.params.q_id)}).toArray((err, result) => {
    if (err) return console.log(err)
    res.send(result[0].name)
    console.log(result[0].name)
  })
})

app.get('/quotes/:q_id/quote', (req, res) => {
  db.collection('quotes').find({'_id': new ObjectId(req.params.q_id)}).toArray((err, result) => {
    if (err) return console.log(err)
    res.send(result[0].quote)
    console.log(result[0].quote)
  })
})

app.get('/quotes/:q_id/json', (req, res) => {
  db.collection('quotes').find({'_id': new ObjectId(req.params.q_id)}).toArray((err, result) => {
    if (err) return console.log(err)
    res.json(result)
    console.log(result)
  })
})

app.post('/quotes/:name/:quote', (req, res) => {
  var new_name = req.params.name
  var new_quote = req.params.quote
  db.collection('quotes').save({ name: new_name, quote: new_quote}, (err, result) => {
    if (err) return console.log(err)

    res.send(result)
    console.log(result)
  })
})

app.post('/quotes', (req, res) => {
  console.log(req)
    db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log(req.body)
    res.send(result)
  })
})

app.delete('/quotes/:q_id', (req, res) => {
  db.collection('quotes').remove({'_id': ObjectId(req.params.q_id)}, (err, result) => {
    if (err) return console.log(err)
    res.json(result)
    console.log(result)
  })
})
