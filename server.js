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
/*const connection = mysql.createConnection({
    host: 'localhost',
    user: 'dev',
    password: 'dev1',
    database: 'Restaurants'
})*/

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: '542'
})


function testMySQL2() {
    connection.connect()

    console.log("Starting connection basic test:")
    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
        if (err) throw err
        console.log('The solution is: ', rows[0].solution)
    })

    console.log("Starting connection schema test:")
    connection.query('SHOW TABLES', (err, rows, fields) => {
        if (err) throw err
        console.log(rows);
        let tables = []
        //rows.forEach(element => tables.push(element.Tables_in_restaurants))
        rows.forEach(element => tables.push(element.Tables_in_542))
        console.log('Tables: ', tables)
    })

    connection.end()
}
//testMySQL2()

// enable strict routing and use slash:
app.enable("strict routing");
app.use(slash());

// serving static files
app.use(express.static("Public"));
app.use(express.static("Views"));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Routes

// just send the basic index html. this is used because both / and /index can go to index.
function getIndex(req, res) {
    res.sendFile(__dirname + "index.html");
}

app.get("/", (req, res)      => {getIndex(req, res); });
app.get("/index", (req, res) => {getIndex(req, res); });
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/Views/login.html") 
})

app.post("/searchRestaurant", bodyParser.json(), (req, res) => {
    console.log("body: ", req.body)
    const query = req.body.query; //mysql.escape(req.body.query);
    let result = {'restaurants': [], 'foods': []};

    connection.connect();
    // find restaurants with names like the query text
    connection.query(
        `SELECT R.R_name as rname, RT.type_Name as rtype, R.R_Image_Reference as img FROM restaurant R NATURAL JOIN restaurant_type RT WHERE R_name = '${query}';`,
        (err, rows, fields) => {
            // add each restaurant to the result array
            console.log("search rows", rows);
            if (err) throw err;
            rows.forEach(element => {
                result.restaurants.push({
                    'R_name': element.rname,
                    'Category': element.rtype,
                    'R_Image_Reference': element.img
                    })
            });
            console.log("result after restaurants: ", result)
            res.json(result);
    })
})

app.post("/searchFood", bodyParser.json(), (req, res) => {
    console.log("body: ", req.body)
    const query = req.body.query; //mysql.escape(req.body.query);
    let result = {'restaurants': [], 'foods': []};

    connection.connect();
    // find foods the same way
    connection.query(
        `SELECT F.F_name as fname, FT.type_Name as ftype, F.F_description as fdescription, F.F_Image_Reference as img FROM food F NATURAL JOIN food_type FT WHERE F_name LIKE '${query}';`,
        (err, rows, fields) => {
            // add each restaurant to the result array
            if (err) throw err;
            rows.forEach(element => {
                result.foods.push({
                    'F_name': element.fname,
                    'F_type': element.ftype,
                    'F_description': element.fdescription,
                    'F_Image_Reference': element.img
                })
            });
            res.json(result);
        })
})

app.post("/ridRestaurant", bodyParser.json(), (req, res) => {
    console.log("body: ", req.body)
    const query = req.body.query; //mysql.escape(req.body.query);
    let result = {'restaurants': [], 'foods': []};

    connection.connect();
    // find restaurants with rid like the query text
    //test
    connection.query(
        `SELECT R.R_name as rname, RT.type_Name as rtype, R.R_Image_Reference as img FROM restaurant R NATURAL JOIN restaurant_type RT WHERE R_id = '${query}';`,
        (err, rows, fields) => {
            // add each restaurant to the result array
            console.log("search rows", rows);
            if (err) throw err;
            rows.forEach(element => {
                result.restaurants.push({
                    'R_name': element.rname,
                    'Category': element.rtype,
                    'R_Image_Reference': element.img
                    })
            });
            console.log("result after restaurants: ", result)
            res.json(result);
    })
})
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Listener

const listener = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



