// require things
const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))
args["port"]
const port = args.port || 5000

const coin = require('./modules/coin')

// start app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace("%PORT%", port))
})

// define endpoints
app.get('/app/', (req, res) => {
    res.statusCode = 200
    res.statusMessage = 'OK'
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'})
    res.end(res.statusCode + ' ' + res.statusMessage)
})

app.get('/app/flip/', (req, res) => {
    res.status(200).json({flip: coin.coinFlip()})
})

app.get('/app/flips/:number', (req, res) => {
    const flips = coin.coinFlips(req.params.number)
    res.status(200).json({raw: flips, summary: coin.countFlips(flips)})
})

app.get('/app/flip/call/heads', (req, res) => {
    const result = coin.flipACoin("heads")
    res.status(200).json({call: result.call, flip: result.flip, result: result.result})
})

app.get('/app/flip/call/tails', (req, res) => {
    const result = coin.flipACoin("tails")
    res.status(200).json({call: result.call, flip: result.flip, result: result.result})
})

// default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
    res.type('text/plain')
})