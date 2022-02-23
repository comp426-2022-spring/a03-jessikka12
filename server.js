// require things
const express = require('express')
const app = express()

const args = require('minimist')(process.argv.slice(2))
args["port"]
const port = args.port || 200

// start app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace("%PORT%", port))
})