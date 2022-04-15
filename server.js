// express setup
const express = require('express')
const app = express()
const port = 3000
// slash
const slash = require("express-slash");
// body parser for json
const bodyParser = require("body-parser");
// mysql connection
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dev',
    password: 'dev1',
    database: 'Restaurants'
})

function testMySQL2() {
    connection.connect()

    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
        if (err) throw err
        console.log('The solution is: ', rows[0].solution)
    })

    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
        if (err) throw err
        console.log('The solution is: ', rows[0].solution)
    })

    connection.end()
}

// enable strict routing and use slash:
app.enable("strict routing");
app.use(slash());

// serving static files
app.use(express.static("Public"));
app.use(express.static("Views"));

// just send the basic index html. this is used because both / and /index can go to index.
function getIndex(req, res) {
    res.sendFile(__dirname + "index.html");
}

app.get("/", (req, res)      => {getIndex(req, res); });
app.get("/index", (req, res) => {getIndex(req, res); });


const listener = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



