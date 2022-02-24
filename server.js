// require things
const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))
args["port"]
const port = args.port || 5000

const coin = require('./modules/coin.js')

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
    const flip = coin.flip()
    res.writeHead(flip, {'Content-Type' : 'text/plain'})
    res.end(flip)
})

// default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
    res.type('text/plain')
})