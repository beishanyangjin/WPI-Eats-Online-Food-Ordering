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
app.use(express.static("img"));

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
app.get("/searchpage", (req, res) => {
    res.sendFile(__dirname + "/Views/searchpage.html")
})
app.get("/index", (req, res) => {
    res.sendFile(__dirname + "/Views/index.html")
})
app.get("/mainpage", (req, res) => {
    res.sendFile(__dirname + "/Views/mainpage.html")
})
app.get("/menu", (req, res) => {
    res.sendFile(__dirname + "/Views/menu.html")
})
app.get("/orderstatus", (req, res) => {
    res.sendFile(__dirname + "/Views/orderstatus.html")
})
app.get("/profile", (req, res) => {
    res.sendFile(__dirname + "/Views/profile.html")
})

app.post("/searchRestaurant", bodyParser.json(), (req, res) => {
    console.log("body: ", req.body)
    const query = req.body.query; //mysql.escape(req.body.query);
    let result = {'restaurants': [], 'foods': []};

    connection.connect();
    // find restaurants with names like the query text
    connection.query(
        `SELECT R.R_id as rid, R.R_name as rname, RT.type_Name as rtype, R.R_Image_Reference as img FROM restaurant R NATURAL JOIN restaurant_type RT WHERE R_name = '${query}';`,
        (err, rows, fields) => {
            // add each restaurant to the result array
            console.log("search rows", rows);
            if (err) throw err;
            rows.forEach(element => {
                result.restaurants.push({
                    'R_id': element.rid,
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
        `SELECT F.F_id as fid, F.F_name as fname, FT.type_Name as ftype, F.F_description as fdescription, F.F_Image_Reference as img FROM food F NATURAL JOIN food_type FT WHERE F_name LIKE '${query}';`,
        (err, rows, fields) => {
            // add each restaurant to the result array
            if (err) throw err;
            rows.forEach(element => {
                result.foods.push({
                    'F_id': element.fid,
                    'F_name': element.fname,
                    'F_type': element.ftype,
                    'F_description': element.fdescription,
                    'F_Image_Reference': element.img
                })
            });
            res.json(result);
        })
})

app.post("/cidCustomer", bodyParser.json(), (req, res) => {
    console.log("body: ", req.body)
    const query = req.body.query; //mysql.escape(req.body.query);
    let result = {'customer': []};

    connection.connect();
    // find restaurants with rid like the query text
    connection.query(
        `SELECT C.Customer_ID as cid, C.Customer_address as caddress, C.Customer_name as cname, C.Balance as balance FROM Customer C  WHERE Customer_ID = '${query}';`,
        (err, rows, fields) => {
            // add each restaurant to the result array
            console.log("search rows", rows);
            if (err) throw err;
            rows.forEach(element => {
                result.customer.push({
                    'Customer_ID': element.cid,
                    'Customer_address': element.caddress,
                    'Customer_name': element.cname,
                    'Balance': element.balance
                    })
            });
            console.log("result after restaurants: ", result)
            res.json(result);
    })
})

app.post("/ridRestaurant", bodyParser.json(), (req, res) => {
    console.log("body: ", req.body)
    const query = req.body.query; //mysql.escape(req.body.query);
    let result = {'restaurants': [], 'foods': []};

    connection.connect();
    // find restaurants with rid like the query text
    connection.query(
        `SELECT R.R_id as rid, R.R_name as rname, RT.type_Name as rtype, R.R_Image_Reference as img FROM restaurant R NATURAL JOIN restaurant_type RT WHERE R_id = '${query}';`,
        (err, rows, fields) => {
            // add each restaurant to the result array
            console.log("search rows", rows);
            if (err) throw err;
            rows.forEach(element => {
                result.restaurants.push({
                    'R_id': element.rid,
                    'R_name': element.rname,
                    'Category': element.rtype,
                    'R_Image_Reference': element.img
                    })
            });
            console.log("result after restaurants: ", result)
            res.json(result);
    })
})

app.post("/cidBalance", bodyParser.json(), (req, res) => {
    console.log("body: ", req.body)
    const query = req.body.query; //mysql.escape(req.body.query);
    let result = {'customer': []};

    connection.connect();
    // add balance
    connection.query(
        `UPDATE Customer SET Balance = Balance + 25 WHERE Customer_ID = '${query}';`,
        (err, fields) => {
            // add success
            console.log("add success");
            if (err) throw err;
            res.json({add:'success'});
    })
})





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Listener

const listener = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



